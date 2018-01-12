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
  organizerService: OrganizerService)
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
    request.body.validate[OrganizerSignUpForm.Data].map { data =>
      val loginInfo = LoginInfo(CredentialsProvider.ID, data.email)
      loginService.retrieve(loginInfo).flatMap {
        case Some(login) =>
          Future.successful(BadRequest(Json.obj("message" -> "user.exists")))
        case None =>
          val authInfo = passwordHasher.hash(data.password)
          val login = Login(None, data.email, None, None, None, loginInfo.providerID, loginInfo.providerKey)
          for {
            login <- loginService.save(login)
            authInfo <- authInfoRepository.add(loginInfo, authInfo)
            authenticator <- silhouette.env.authenticatorService.create(loginInfo)
            token <- silhouette.env.authenticatorService.init(authenticator)
          } yield {
            silhouette.env.eventBus.publish(SignUpEvent(login, request))
            silhouette.env.eventBus.publish(LoginEvent(login, request))
            organizerService.save(login,data.name)
            Ok(Json.obj("token" -> token))
          }
      }
    }.recoverTotal {
      case error =>
        Future.successful(Unauthorized(Json.obj("message" -> "invalid.data")))
    }
  }
}
