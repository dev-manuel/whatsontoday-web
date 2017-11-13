package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import scala.concurrent.ExecutionContext
import slick.jdbc.PostgresProfile.api._
import whatson.db.EventTable
import play.api.db.slick.HasDatabaseConfigProvider
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.Await
import scala.concurrent.duration.Duration
import slick.dbio.Effect.Transactional
import play.api.libs.json._
import java.util.Locale.Category
import whatson.db.CategoryTable
import whatson.model.EventH._
import whatson.model.Event
import whatson.db.EventTable._
import play.api.mvc.Results
import play.api.libs.typedmap.TypedKey
import whatson.db.Util._

/**
 * This Controller handles API Requests concerning events
 */
class EventController @Inject()(cc: ControllerComponents, protected val dbConfigProvider: DatabaseConfigProvider)
    (implicit context: ExecutionContext)
    extends AbstractController(cc) 
    with HasDatabaseConfigProvider[JdbcProfile] {
  
  val log = Logger("api.events")
  
  def events() = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request for events")
    
    val q = for(e <- EventTable.event) yield e;
    
    db.run(q.result).map(x => Ok(Json.toJson(x)))
  }
  
  def getEvent(id: Long) = Action { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get event")
    
    Status(501)
  }
  
  def searchEvents(search: Option[String], location: Option[Int], category: Option[Int]) = Action { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get event")
    
    Status(501)
  }
  
  def deleteEvent(id: Long) = Action { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get event")
    
    Status(501)
  }
  
  def createEvent() = Action.async(parse.json(eventReads)) { implicit request: Request[Event] =>
    log.debug("Rest request to create event")
    
    val inserted = db.run(insertAndReturn[Event,EventTable](event,request.body))
    
    inserted.map(x => Ok(Json.toJson(x)))
  }
  
  def updateEvent(id: Long) = Action(parse.json(eventReads)) { implicit request: Request[Event] =>
    log.debug("Rest request to update event")
    
    Status(501)
  }
}