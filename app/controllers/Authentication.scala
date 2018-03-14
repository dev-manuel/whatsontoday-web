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
import whatson.model.forms._
import whatson.model.forms.SignInForm._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import javax.inject._
import slick.jdbc.JdbcProfile
import whatson.db.LoginTable
import slick.jdbc.PostgresProfile.api._

class Authentication@Inject() (
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
  protected val dbConfigProvider: DatabaseConfigProvider)
    extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {


  val log = Logger("api.authentication")

  /**
    * Handles a login request with the login data in the request body.
    *
    * @return The answer: 200 on success, 401 on wrong credentials
    */
  def login = Action.async(parse.json) { implicit request =>
    request.body.validate[SignInForm].map { data =>
      credentialsProvider.authenticate(Credentials(data.email, data.password)).flatMap { loginInfo =>
        loginService.retrieve(loginInfo).flatMap {
          case Some(login) => silhouette.env.authenticatorService.create(loginInfo).map {
            case authenticator if data.rememberMe =>
              val c = configuration.underlying
              authenticator.copy(
                expirationDateTime = clock.now + FiniteDuration(c.getLong("silhouette.authenticator.rememberMe.authenticatorExpiry"),"ms"),
                idleTimeout = Some(FiniteDuration(c.getLong("silhouette.authenticator.rememberMe.authenticatorIdleTimeout"),"ms"))
              )
            case authenticator => authenticator
          }.flatMap { authenticator =>
            silhouette.env.eventBus.publish(LoginEvent(login, request))
            silhouette.env.authenticatorService.init(authenticator).map { token =>
              Ok(Json.obj("token" -> token, "userType" -> login.userType))
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
    * Manages the sign out action.
    * Since we are using JWT wich are stateless this has no effect.
    */
  def signOut = silhouette.SecuredAction.async { implicit request =>
    silhouette.env.eventBus.publish(LogoutEvent(request.identity, request))
    silhouette.env.authenticatorService.discard(request.authenticator, Ok)
  }
}
