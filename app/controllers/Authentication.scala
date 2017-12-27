package controllers

import scala.concurrent.Future
import scala.concurrent.duration._

import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.Authenticator.Implicits._
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.util.{Clock, Credentials}
import com.mohiva.play.silhouette.impl.exceptions.IdentityNotFoundException
import com.mohiva.play.silhouette.impl.providers._
import javax.inject.Inject
import play.api.{Configuration, Logger}
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json._
import play.api.mvc._
import play.api.cache.AsyncCacheApi
import whatson.auth._
import whatson.service._
import com.mohiva.play.silhouette.api.util.PasswordHasher
import whatson.model._
import whatson.model.SignInForm._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import javax.inject._
import slick.jdbc.JdbcProfile
import whatson.db.UserTable
import slick.jdbc.PostgresProfile.api._

class Authentication@Inject() (
  silhouette: Silhouette[AuthEnv],
  userService: UserService,
  authInfoRepository: AuthInfoRepository,
  credentialsProvider: CredentialsProvider,
  socialProviderRegistry: SocialProviderRegistry,
  configuration: Configuration,
  clock: Clock,
  cc: ControllerComponents,
  cache: AsyncCacheApi,
  passwordHasher: PasswordHasher,
  protected val dbConfigProvider: DatabaseConfigProvider)
    extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {
  
  

  val log = Logger("api.events")
  
  /**
    * Handles the submitted JSON data.
    *
    * @return The result to display.
    */
  def login = Action.async(parse.json) { implicit request =>
    request.body.validate[SignInForm].map { data =>
      credentialsProvider.authenticate(Credentials(data.email, data.password)).flatMap { loginInfo =>
        userService.retrieve(loginInfo).flatMap {
          case Some(user) => silhouette.env.authenticatorService.create(loginInfo).map {
            case authenticator if data.rememberMe =>
              val c = configuration.underlying
              authenticator.copy(
                expirationDateTime = clock.now + FiniteDuration(c.getLong("silhouette.authenticator.rememberMe.authenticatorExpiry"),"ms"),
                idleTimeout = Some(FiniteDuration(c.getLong("silhouette.authenticator.rememberMe.authenticatorIdleTimeout"),"ms"))
              )
            case authenticator => authenticator
          }.flatMap { authenticator =>
            silhouette.env.eventBus.publish(LoginEvent(user, request))
            silhouette.env.authenticatorService.init(authenticator).map { token =>
              Ok(Json.obj("token" -> token))
            }
          }
          case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
        }
      }.recover {
        case e: ProviderException =>
          Unauthorized(Json.obj("message" -> "unauthorized"))
      }
    }.recoverTotal {
      case error =>
        Future.successful(Unauthorized(Json.obj("message" -> "invalid credentials")))
    }
  }

  /**
   * Handles the submitted JSON data.
   *
   * @return The result to display.
   */
  def signUp = Action.async(parse.json) { implicit request =>
    request.body.validate[SignUpForm.Data].map { data =>
      val loginInfo = LoginInfo(CredentialsProvider.ID, data.email)
      userService.retrieve(loginInfo).flatMap {
        case Some(user) =>
          Future.successful(BadRequest(Json.obj("message" -> "user.exists")))
        case None =>
          val authInfo = passwordHasher.hash(data.password)
          val user = User(None, data.firstName + " " + data.lastName, data.email, None, None, None, loginInfo.providerID, loginInfo.providerKey)
          for {
            i <- db.run(UserTable.user += user)
            authInfo <- authInfoRepository.add(loginInfo, authInfo)
            authenticator <- silhouette.env.authenticatorService.create(loginInfo)
            token <- silhouette.env.authenticatorService.init(authenticator)
          } yield {
            silhouette.env.eventBus.publish(SignUpEvent(user, request))
            silhouette.env.eventBus.publish(LoginEvent(user, request))
            Ok(Json.obj("token" -> token))
          }
      }
    }.recoverTotal {
      case error =>
        Future.successful(Unauthorized(Json.obj("message" -> "invalid.data")))
    }
}

  /**
    * Returns the user.
    *
    * @return The result to display.
    */
  def user = silhouette.SecuredAction.async { implicit request =>
    Future.successful(Ok(Json.toJson(request.identity)))
  }

  /**
    * Manages the sign out action.
    */
  def signOut = silhouette.SecuredAction.async { implicit request =>
    silhouette.env.eventBus.publish(LogoutEvent(request.identity, request))
    silhouette.env.authenticatorService.discard(request.authenticator, Ok)
  }


  /**
    * Authenticates a user against a social provider.
    *
    * @param provider The ID of the provider to authenticate against.
    * @return The result to display.
    */
  def authenticate(provider: String) = Action.async { r =>
    cacheAuthTokenForOauth1(r) { implicit request =>
      (socialProviderRegistry.get[SocialProvider](provider) match {
         case Some(p: SocialProvider with CommonSocialProfileBuilder) =>
           p.authenticate().flatMap {
             case Left(result) => Future.successful(result)
             case Right(authInfo) => for {
               profile <- p.retrieveProfile(authInfo)
               user <- userService.save(profile)
               authInfo <- authInfoRepository.save(profile.loginInfo, authInfo)
               authenticator <- silhouette.env.authenticatorService.create(profile.loginInfo)
               token <- silhouette.env.authenticatorService.init(authenticator)
             } yield {
               silhouette.env.eventBus.publish(LoginEvent(user, request))
               //Ok(Json.obj("token" -> token))
               Redirect("http://" + request.host + "?token=" + token)
             }
           }
         case _ => Future.failed(new ProviderException(s"Cannot authenticate with unexpected social provider $provider"))
       }).recover {
        case e: ProviderException =>
          log.error("Unexpected provider error", e)
          Unauthorized(Json.obj("message" -> "could.not.authenticate"))
      }
    }
  }


  /**
    * Satellizer executes multiple requests to the same application endpoints for OAuth1.
    *
    * So this function caches the response from the OAuth provider and returns it on the second
    * request. Not nice, but it works as a temporary workaround until the bug is fixed.
    *
    * @param request The current request.
    * @param f The action to execute.
    * @return A result.
    * @see https://github.com/sahat/satellizer/issues/287
    */
  private def cacheAuthTokenForOauth1(request: Request[AnyContent])(f: Request[AnyContent] => Future[Result]): Future[Result] = {
    request.getQueryString("oauth_token") -> request.getQueryString("oauth_verifier") match {
      case (Some(token), Some(verifier)) => cache.get[Result](token + "-" + verifier).flatMap {
        case Some(r) => Future(r)
        case None => f(request).map { result =>
          cache.set(token + "-" + verifier, result, 1 minute)
          result
        }
      }
      case _ => f(request)
    }
  }
}
