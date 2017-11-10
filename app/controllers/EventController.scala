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
import play.api.mvc.Results

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
  
  def deleteEvent(id: Long) = Action { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get event")
    
    Status(501)
  }
  
  def createEvent() = Action { implicit request: Request[AnyContent] =>
    log.debug("Rest request to create event")
    
    Status(501)
  }
  
  def updateEvent(id: Long) = Action { implicit request: Request[AnyContent] =>
    log.debug("Rest request to update event")
    
    Status(501)
  }
}