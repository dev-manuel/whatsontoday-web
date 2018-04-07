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
import whatson.db._


class OrganizerController@Inject() (val silhouette: Silhouette[AuthEnv],
                                    val loginService: LoginService,
                                    authInfoRepository: AuthInfoRepository,
                                    credentialsProvider: CredentialsProvider,
                                    socialProviderRegistry: SocialProviderRegistry,
                                    configuration: Configuration,
                                    clock: Clock,
                                    cc: ControllerComponents,
                                    cache: AsyncCacheApi,
                                    passwordHasher: PasswordHasher,
                                    protected val dbConfigProvider: DatabaseConfigProvider,
                                    val organizerService: OrganizerService,
                                    mailService: MailService,
                                    avatarService: AvatarService,
                                    val roleService: RoleService)
    extends AbstractController(cc) with HasDatabaseConfigProvider[JdbcProfile]
    with Util{

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
      e <- EventTable.event if e.organizerId === id
    } yield e

    val s = q.sortColumn(sort,sortDir).queryPaged.detailed
    returnPaged(s,q,db)
  }


  def createOrganizer = withRights(Right.CreateOrganizer)(parse.json) { case (request,login,role) =>
    OrganizerForm.form.bindFromRequest()(request).fold(
      form => {
        Future.successful(BadRequest(Json.toJson(form.errors)))
      },
      data => {
        log.debug("Rest request to create organizer")

        for{
          org <- db.run(insertAndReturn[Organizer,OrganizerTable](OrganizerTable.organizer,Organizer(None,data.name,None)))
          adminRole <- roleService.getByName(Role.OrganizerAdmin)
        } yield {
          db.run(UserRolesTable.userRoles += UserRole(adminRole.get.id.get,login.id.get,
                                                      UserRole.OrganizerScope(org.id.getOrElse(-1))))
          Ok(Json.toJson(org))
        }

      })
  }
}
