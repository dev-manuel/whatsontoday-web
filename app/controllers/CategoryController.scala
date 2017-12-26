package controllers

import scala.concurrent.ExecutionContext

import javax.inject._
import play.api._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import whatson.db.CategoryTable
import whatson.model.Category._

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
