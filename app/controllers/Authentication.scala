package controllers

import javax.inject.Inject

import com.mohiva.play.silhouette.api.Authenticator.Implicits._
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.util.{ Clock, Credentials }
import com.mohiva.play.silhouette.impl.exceptions.IdentityNotFoundException
import com.mohiva.play.silhouette.impl.providers._
import whatson.service._
import play.api.Configuration
import play.api.i18n.{ I18nSupport, Messages, MessagesApi }
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.mvc.{ Action, Controller }
import whatson.auth._

import scala.concurrent.Future
import scala.concurrent.duration._
import play.api.mvc._

class Authentication@Inject() (
  silhouette: Silhouette[AuthEnv], //TODO
  userService: UserService, //TODO
  authInfoRepository: AuthInfoRepository, //TODO
  credentialsProvider: CredentialsProvider, //TODO
  socialProviderRegistry: SocialProviderRegistry, //TODO
  configuration: Configuration,
  clock: Clock, //TODO
  cc: ControllerComponents)
extends AbstractController(cc) {
  
  case class SignInForm(email: String, password: String, rememberMe: Boolean)
  
  /**
   * Converts the JSON into a `SignInForm.Data` object.
   */
  implicit val dataReads = (
    (__ \ 'email).read[String] and
    (__ \ 'password).read[String] and
    (__ \ 'rememberMe).read[Boolean]
  )(SignInForm.apply _)
  
   /**
   * Handles the submitted JSON data.
   *
   * @return The result to display.
   */
  def submit = Action.async(parse.json) { implicit request =>
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
}