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
import whatson.db._
import whatson.db.RatingTable._
import whatson.model._
import whatson.db.Util._

class RatingController @Inject()(cc: ControllerComponents, protected val dbConfigProvider: DatabaseConfigProvider)
    (implicit context: ExecutionContext)
    extends AbstractController(cc) 
    with HasDatabaseConfigProvider[JdbcProfile]{
  
  val log = Logger("api.categories")
  
  def rateEntity(id: Int, entityType: String, rate: Float) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to rate entity")
    
    val r = Rating(None,rate,1, id, EntityType.withName(entityType))
    val inserted = db.run(insertAndReturn[Rating,RatingTable](rating,r))
    
    inserted.map(x => Ok(Json.toJson(x)))
  }
}
