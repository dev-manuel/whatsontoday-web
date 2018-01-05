package controllers

import scala.concurrent.ExecutionContext

import javax.inject._
import play.api._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import whatson.db.EventTable._
import whatson.db.Util._
import whatson.model.Event
import whatson.model.Event._
import whatson.model.detail.EventDetail._
import com.mohiva.play.silhouette.api._
import whatson.auth._
import whatson.service._

/**
 * This Controller handles API Requests concerning events
 */
class EventController @Inject()(cc: ControllerComponents,
                                protected val dbConfigProvider: DatabaseConfigProvider,
                                val silhouette: Silhouette[AuthEnv],
                                val organizerService: OrganizerService)
    (implicit context: ExecutionContext)
    extends AbstractController(cc)
    with HasDatabaseConfigProvider[JdbcProfile]
    with Util {

  val log = Logger("api.events")

  def getEvent(id: Int) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get event")

    val q = for(e <- EventTable.event if e.id === id.bind) yield e;

    db.run(q.detailed).map(x => x.headOption match {
      case Some(r) => Ok(Json.toJson(r))
      case _ => NotFound
    })
  }

  def searchEvents(search: Option[String], location: Option[Int], category: Option[Int], sort: Option[String], sortDir: Boolean) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to search events")

    val q = for {
      e <- event if e.name like search.map(y => "%"++y++"%").getOrElse("%%").bind
                 if e.categories.filter(_.id === category.getOrElse(-1)).exists || category.getOrElse(-1).bind === -1
                 if e.locationId - location.getOrElse(-1).bind === 0 || location.getOrElse(-1).bind === -1
    } yield e

    val s = q.sortColumn(sort,sortDir).queryPaged.detailed
    returnPaged(s,q,db)
  }

  def deleteEvent(id: Int) = silhouette.SecuredAction.async { implicit request =>
    log.debug("Rest request to get event")

    val q = event.filter(x => x.id === id.bind && x.creatorId === request.identity.id).delete

    db.run(q).map {
      case 0 => NotFound
      case x => Ok(Json.toJson(x))
    }
  }

  def createEvent() = organizerRequest(parse.json(eventReads)) { case (request,organizer) =>
    log.debug("Rest request to create event")

    val e = request.body.copy(creatorId = organizer.id)

    val inserted = db.run(insertAndReturn[Event,EventTable](event,e))

    inserted.map(x => Ok(Json.toJson(x)))
  }

  def updateEvent(id: Int) = silhouette.SecuredAction(parse.json(eventReads)).async { implicit request =>
    log.debug("Rest request to update event")

    val q = event.filter(x => x.id === id.bind && x.creatorId === request.identity.id).update(request.body)

    db.run(q).map {
      case 0 => NotFound
      case x => Ok(Json.toJson(x))
    }
  }
}
