package controllers

import scala.concurrent.ExecutionContext

import javax.inject._
import play.api._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.JdbcProfile
import whatson.db._
import whatson.model.detail.CategoryDetail._
import whatson.service._
import whatson.model._
import com.mohiva.play.silhouette.api._
import whatson.auth._
import whatson.db.Util._

/**
 * This Controller handles API Requests concerning categories
 */
class CategoryController @Inject()(cc: ControllerComponents,
                                   protected val dbConfigProvider: DatabaseConfigProvider,
                                   val silhouette: Silhouette[AuthEnv],
                                   val organizerService: OrganizerService,
                                   val userService: UserService)
    (implicit context: ExecutionContext)
    extends AbstractController(cc)
    with HasDatabaseConfigProvider[JdbcProfile] with Util {

  val log = Logger("api.categories")

  def categories() = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request for categories")

    val q = for(e <- CategoryTable.category) yield e;

    db.run(q.detailed).map(x => Ok(Json.toJson(x)))
  }

  def createCategory() = organizerRequest(parse.json(Category.categoryReads)) { case (request,organizer) =>
    log.debug("Rest request to create category")

    val inserted = db.run(insertAndReturn[Category,CategoryTable](CategoryTable.category,request.body))

    inserted.map(x => Ok(Json.toJson(x)))
  }
}
