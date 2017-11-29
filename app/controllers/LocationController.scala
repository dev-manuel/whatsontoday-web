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
import whatson.model.LocationH._
import whatson.model._
import play.api.mvc.Results
import whatson.db.Util._
import whatson.db._
import whatson.db.LocationTable._


class LocationController @Inject()(cc: ControllerComponents, protected val dbConfigProvider: DatabaseConfigProvider)
    (implicit context: ExecutionContext)
    extends AbstractController(cc) 
    with HasDatabaseConfigProvider[JdbcProfile] {
  
  val log = Logger("api.location")
  
  def searchLocations(search: String) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to search locations")
    
    val q = for {
      l <- location if l.name like ("%"++search++"%").bind
    } yield l
    
    returnPaged(q,db)
  }
  
  def getLocation(id: Int) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get location")
    
    val q = for(l <- location if l.id === id.bind) yield l;
    
    db.run(q.result).map(x => x.headOption match {
      case Some(r) => Ok(Json.toJson(r))
      case _ => NotFound
    })
  }
  
  def createLocation() = Action.async(parse.json(locationReads)) { implicit request: Request[Location] =>
    log.debug("Rest request to create user")
    
    val inserted = db.run(insertAndReturn[Location,LocationTable](location,request.body))
    
    inserted.map(x => Ok(Json.toJson(x)))
  }
}