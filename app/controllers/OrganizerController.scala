package controllers

import scala.concurrent.Future
import scala.concurrent.duration._

import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services._
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
import slick.jdbc.PostgresProfile.api._
import whatson.auth._
import whatson.db._
import whatson.model._
import whatson.model.forms._
import whatson.model.detail.OrganizerPublic._
import whatson.service._
import whatson.util.FormErrorJson._
import whatson.db.Util._
import whatson.model.detail.EventDetail._


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
  mailService: MailService,
  avatarService: AvatarService,
  val roleService: RoleService)
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

  def getEvents(id: Int, sort: Option[String], sortDir: Boolean) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get events of organizer")

    val q = for {
      e <- EventTable.event if e.creatorId === id
    } yield e

    val s = q.sortColumn(sort,sortDir).queryPaged.detailed
    returnPaged(s,q,db)
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
      loginService.retrieveAll(loginInfo).flatMap {
        case Some(login) =>
          Future.successful(BadRequest(Json.obj("message" -> "user.exists")))
        case None =>
          val authInfo = passwordHasher.hash(data.password)
          for {
            defaultRole <- roleService.getByName("DEFAULT")
            login <- loginService.save(
              Login(None, data.email, None, None, None, loginInfo.providerID, loginInfo.providerKey, false, "organizer", defaultRole.flatMap(_.id).getOrElse(-1)))
            authInfo <- authInfoRepository.add(loginInfo, authInfo)
            authenticator <- silhouette.env.authenticatorService.create(loginInfo)
            token <- silhouette.env.authenticatorService.init(authenticator)
            avatar <- avatarService.retrieveURL(data.email)
          } yield {
            silhouette.env.eventBus.publish(SignUpEvent(login, request))
            silhouette.env.eventBus.publish(LoginEvent(login, request))
            organizerService.save(login,data.name,avatar)
            mailService.sendOrganizerConfirmation(data.email,data.name,token)
            Ok(Json.obj("message" -> "mail.sent"))
          }
      }
    })
  }
}
