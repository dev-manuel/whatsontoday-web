package controllers

import scala.concurrent.{ExecutionContext, Future}

import com.mohiva.play.silhouette.api._
import javax.inject._
import play.api._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import whatson.auth._
import whatson.db.LoginTable._
import whatson.db._
import whatson.model.Login._
import com.mohiva.play.silhouette.api.services._
import com.mohiva.play.silhouette.impl.authenticators._
import com.mohiva.play.silhouette.api.crypto._
import scala.util._
import whatson.service._

import scala.concurrent.duration._
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.services._
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.util.{Clock, PasswordHasher}
import com.mohiva.play.silhouette.impl.providers._
import com.mohiva.play.silhouette.impl.providers.state._
import javax.inject._
import play.api.{Configuration, Logger}
import play.api.cache.AsyncCacheApi
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.JdbcProfile
import whatson.auth._
import whatson.model.{Login}
import whatson.model.forms._
import whatson.service._
import whatson.util.FormErrorJson._
import whatson.db.Util._
import whatson.model.detail.EventDetail._
import whatson.util._

class LoginController @Inject()(cc: ControllerComponents,
                               protected val dbConfigProvider: DatabaseConfigProvider,
                                val silhouette: Silhouette[AuthEnv],
                                encoder: AuthenticatorEncoder,
                                settings: JWTAuthenticatorSettings,
                                loginService: LoginService,
                                authInfoRepository: AuthInfoRepository,
                                credentialsProvider: CredentialsProvider,
                                socialProviderRegistry: SocialProviderRegistry,
                                configuration: Configuration,
                                clock: Clock,
                                cache: AsyncCacheApi,
                                passwordHasher: PasswordHasher,
                                val organizerService: OrganizerService,
                                mailService: MailService,
                                avatarService: AvatarService,
                                val roleService: RoleService,
                                applicationConfig: ApplicationConfig)
    (implicit context: ExecutionContext)
    extends AbstractController(cc)
    with HasDatabaseConfigProvider[JdbcProfile]
    with Util {

  val log = Logger("api.login")

  /**
    * Returns the user.
    *
    * @return The result to display.
    */
  def getUser = silhouette.SecuredAction.async { implicit request =>
    Future.successful(Ok(Json.toJson(request.identity)))
  }

  def deleteUser = silhouette.SecuredAction.async { implicit request =>
    log.debug("Rest request to get user")

    val q = login.filter(_.id === request.identity.id).delete

    db.run(q).map {
      case 0 => NotFound
      case x => Ok(Json.toJson(x))
    }
  }

  def updateUser = silhouette.SecuredAction.async(parse.json) { implicit request =>
    LoginUpdateForm.form.bindFromRequest().fold(
      form => {
        Future.successful(BadRequest(Json.toJson(form.errors)))
      },
      data => {
        log.debug("Rest request to update users password")

        val authInfo = passwordHasher.hash(data.password)
        val q = login.filter(_.id === request.identity.id).result.map(_.headOption)

        db.run(q).flatMap {
          case None => Future.successful(NotFound)
          case Some(login) => {
            for {
              authInfo <- authInfoRepository.update(login.loginInfo,authInfo)
              authenticator <- silhouette.env.authenticatorService.create(login.loginInfo)
              token <- silhouette.env.authenticatorService.init(authenticator)
            } yield {
              mailService.sendPasswordChangeNotification(login.email,token)
              Ok(Json.obj("token" -> token))
            }
          }
        }
      })
  }

  def confirm(token: String) = Action.async { implicit request =>
    log.debug("Rest request to confirm account")

    JWTAuthenticator.unserialize(token, encoder, settings) match {
      case Success(auth) => {
        loginService.confirm(auth.loginInfo).map {
          case Some(l) => Redirect(applicationConfig.url ++ "web/mailConfirmed")
          case None => NotFound
        }
      }
      case _ => Future(Unauthorized)
    }
  }

  def requestPasswordReset = Action.async(parse.json) { implicit request =>
    PasswordResetForm.form.bindFromRequest().fold(
      form => {
        Future.successful(BadRequest(Json.toJson(form.errors)))
      },
      data => {
        log.debug("Rest request to send password reset mail")

        loginService.retrieve(LoginInfo("credentials", data.email)).flatMap {
          case Some(login) => {
            for {
              authenticator <- silhouette.env.authenticatorService.create(login.loginInfo)
              token <- silhouette.env.authenticatorService.init(authenticator)
            } yield {
              mailService.sendPasswordResetMail(login.email,token)
              Ok(Json.obj("message" -> "mail.sent"))
            }
          }
          case None => Future.successful(BadRequest)
        }
      })
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
         case Some(p: OAuth2Provider with CommonSocialProfileBuilder) =>
           p.authenticate().flatMap {
             case Left(result) => Future.successful(result)
             case Right(authInfo) => for {
               profile <- p.retrieveProfile(authInfo)
               login <- loginService.save(profile)
               authInfo <- authInfoRepository.save(profile.loginInfo, authInfo)
               authenticator <- silhouette.env.authenticatorService.create(profile.loginInfo)
               token <- silhouette.env.authenticatorService.init(authenticator)
               avatar <- avatarService.retrieveURL(profile.email.getOrElse(""))
             } yield {
               silhouette.env.eventBus.publish(LoginEvent(login, request))
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

  def getParticipatingEvents = withRights(whatson.model.Right.Participate)(parse.default) { case (request,login,role) =>
    log.debug("Rest request to get events participating in")

    implicit val r = request
    val q = LoginTable.login.filter(_.id === login.id.getOrElse(-1)).flatMap(_.events)
    val s = q.queryPaged(request).detailed

    returnPaged(s,q,db)
  }

  /**
   * Handles the submitted JSON data.
   *
   * @return The result to display.
   */
  def signUp = Action.async(parse.json) { implicit request =>
    SignUpForm.form.bindFromRequest.fold(
      form => {
        Future.successful(BadRequest(Json.toJson(form.errors)))
      },
      data => {
        val loginInfo = LoginInfo(CredentialsProvider.ID, data.email)
        loginService.retrieveAll(loginInfo).flatMap {
          case Some(login) =>
            Future.successful(BadRequest(Json.obj("message" -> "user.exists")))
          case None =>
            val authInfo = passwordHasher.hash(data.password)
            for {
              defaultRole <- roleService.getByName("DEFAULT")
              login <- loginService.save(
                Login(None, data.email, None, None, None, loginInfo.providerID, loginInfo.providerKey, false, "user", defaultRole.flatMap(_.id).getOrElse(-1)))
              authInfo <- authInfoRepository.add(loginInfo, authInfo)
              authenticator <- silhouette.env.authenticatorService.create(loginInfo)
              token <- silhouette.env.authenticatorService.init(authenticator)
              avatar <- avatarService.retrieveURL(data.email)
            } yield {
              silhouette.env.eventBus.publish(SignUpEvent(login, request))
              silhouette.env.eventBus.publish(LoginEvent(login, request))
              mailService.sendConfirmation(data.email,token)
              Ok(Json.obj("message" -> "mail.sent"))
            }
        }
      })
  }
}
