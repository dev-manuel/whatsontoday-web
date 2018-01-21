package controllers

import scala.concurrent.Future

import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.util.{Clock, PasswordHasher}
import com.mohiva.play.silhouette.impl.providers._
import javax.inject._
import play.api.{Configuration, Logger}
import play.api.cache.AsyncCacheApi
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.JdbcProfile
import whatson.auth._
import whatson.db._
import whatson.model.detail.OrganizerPublic._
import whatson.model._
import whatson.service._
import slick.jdbc.PostgresProfile.api._
import whatson.util.FormErrorJson._
import scala.concurrent.Future
import scala.concurrent.duration._
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.util.{Clock, PasswordHasher}
import com.mohiva.play.silhouette.impl.providers._
import javax.inject._
import play.api.{Configuration, Logger}
import play.api.cache.AsyncCacheApi
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.JdbcProfile
import whatson.auth._
import whatson.model._
import whatson.service._
import whatson.util.FormErrorJson._

class OrganizerController@Inject() (
  silhouette: Silhouette[AuthEnv],
  loginService: LoginService,
  authInfoRepository: AuthInfoRepository,
  credentialsProvider: CredentialsProvider,
  socialProviderRegistry: SocialProviderRegistry,
  configuration: Configuration,
  clock: Clock,
  cc: ControllerComponents,
  cache: AsyncCacheApi,
  passwordHasher: PasswordHasher,
  protected val dbConfigProvider: DatabaseConfigProvider,
  organizerService: OrganizerService,
  mailService: MailService)
    extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {

  val log = Logger("api.organizer")

  def get(id: Int) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get organizer")

    val q = for(o <- OrganizerTable.organizer  if o.id === id.bind) yield o;

    db.run(q.public).map(x => x.headOption match {
                             case Some(r) => Ok(Json.toJson(r))
                             case _ => NotFound
                           })
  }

  /**
   * Handles the submitted JSON data.
   *
   * @return The result to display.
   */
  def signUp = Action.async(parse.json) { implicit request =>
    OrganizerSignUpForm.form.bindFromRequest.fold(
      form => {
        Future.successful(BadRequest(Json.toJson(form.errors)))
      }, { data =>
      val loginInfo = LoginInfo(CredentialsProvider.ID, data.email)
      loginService.retrieve(loginInfo).flatMap {
        case Some(login) =>
          Future.successful(BadRequest(Json.obj("message" -> "user.exists")))
        case None =>
          val authInfo = passwordHasher.hash(data.password)
          val login = Login(None, data.email, None, None, None, loginInfo.providerID, loginInfo.providerKey, false)
          for {
            login <- loginService.save(login)
            authInfo <- authInfoRepository.add(loginInfo, authInfo)
            authenticator <- silhouette.env.authenticatorService.create(loginInfo)
            token <- silhouette.env.authenticatorService.init(authenticator)
          } yield {
            silhouette.env.eventBus.publish(SignUpEvent(login, request))
            silhouette.env.eventBus.publish(LoginEvent(login, request))
            organizerService.save(login,data.name)
            mailService.sendOrganizerConfirmation(data.email,data.name,token)
            Ok(Json.obj("message" -> "mail.sent"))
          }
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
         case Some(p: SocialProvider with CommonSocialProfileBuilder) =>
           p.authenticate().flatMap {
             case Left(result) => Future.successful(result)
             case Right(authInfo) => for {
               profile <- p.retrieveProfile(authInfo)
               login <- loginService.save(profile)
               authInfo <- authInfoRepository.save(profile.loginInfo, authInfo)
               authenticator <- silhouette.env.authenticatorService.create(profile.loginInfo)
               token <- silhouette.env.authenticatorService.init(authenticator)
             } yield {
               organizerService.save(login,profile.firstName.getOrElse("") + profile.lastName.getOrElse(""))
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
}
