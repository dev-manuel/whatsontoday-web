package controllers

import scala.concurrent.ExecutionContext

import javax.inject._
import play.api._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.JdbcProfile
import whatson.db._
import whatson.db.RatingTable._
import whatson.db.Util._
import whatson.model.Rating

class RatingController @Inject()(cc: ControllerComponents, protected val dbConfigProvider: DatabaseConfigProvider)
    (implicit context: ExecutionContext)
    extends AbstractController(cc) 
    with HasDatabaseConfigProvider[JdbcProfile]{
  
  val log = Logger("api.categories")
  
  def rateEntity(id: Int, entityType: Int, rate: Float) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to rate entity")
    
    val r = Rating(None,rate,1/*TODO: Update as soon as authorization is implemented*/, id, entityType)
    val inserted = db.run(insertAndReturn[Rating,RatingTable](rating,r))
    
    inserted.map(x => Ok(Json.toJson(x)))
  }
}
