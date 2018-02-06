package controllers

import scala.concurrent.Future
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
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.JdbcProfile
import whatson.auth._
import whatson.model._
import whatson.model.forms._
import whatson.service._
import whatson.util.FormErrorJson._

class UserController@Inject() (
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
  userService: UserService,
  mailService: MailService,
  avatarService: AvatarService)
    extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile] {

  val log = Logger("api.user")

  /**
   * Handles the submitted JSON data.
   *
   * @return The result to display.
   */
  def signUp = Action.async(parse.json) { implicit request =>
    UserSignUpForm.form.bindFromRequest.fold(
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
            val login = Login(None, data.email, None, None, None, loginInfo.providerID, loginInfo.providerKey, false)
            for {
              login <- loginService.save(login)
              authInfo <- authInfoRepository.add(loginInfo, authInfo)
              authenticator <- silhouette.env.authenticatorService.create(loginInfo)
              token <- silhouette.env.authenticatorService.init(authenticator)
              avatar <- avatarService.retrieveURL(data.email)
            } yield {
              silhouette.env.eventBus.publish(SignUpEvent(login, request))
              silhouette.env.eventBus.publish(LoginEvent(login, request))
              userService.save(login,avatar)
              mailService.sendUserConfirmation(data.email,token)
              Ok(Json.obj("message" -> "mail.sent"))
            }
        }
      })
  }
}
