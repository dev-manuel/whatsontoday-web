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
import whatson.model._
import whatson.db.Util._
import whatson.model.Rating
import whatson.service._
import com.mohiva.play.silhouette.api._
import whatson.auth._

class RatingController @Inject()(cc: ControllerComponents,
                                 protected val dbConfigProvider: DatabaseConfigProvider,
                                 val silhouette: Silhouette[AuthEnv],
                                 val organizerService: OrganizerService,
                                 val userService: UserService,
                                 val roleService: RoleService)
    (implicit context: ExecutionContext)
    extends AbstractController(cc)
    with HasDatabaseConfigProvider[JdbcProfile] with Util {

  val log = Logger("api.rating")

  def rateEntity(id: Int, entityType: String, rate: Float) = withRights()(parse.default) { case (request,login,role) =>
    log.debug("Rest request to rate entity")

    val r = Rating(None,rate,login.id.getOrElse(-1), id, EntityType.withName(entityType))
    val inserted = db.run(insertAndReturn[Rating,RatingTable](rating,r))

    inserted.map(x => Ok(Json.toJson(x)))
  }
}
