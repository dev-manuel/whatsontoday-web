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
import whatson.model.CategoryH._

/**
 * This Controller handles API Requests concerning categories
 */
class CategoryController @Inject()(cc: ControllerComponents, protected val dbConfigProvider: DatabaseConfigProvider)
    (implicit context: ExecutionContext)
    extends AbstractController(cc) 
    with HasDatabaseConfigProvider[JdbcProfile]{
  
  val log = Logger("api.categories")
  
  def categories() = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request for categories")
    
    val q = for(e <- CategoryTable.category) yield e;
    
    db.run(q.result).map(x => Ok(Json.toJson(x)))
  }
}