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
import whatson.model.Image._
import whatson.model._
import play.api.mvc.Results
import whatson.db.Util._
import whatson.db._
import whatson.db.ImageTable._
import scala.concurrent.Future

class ImageController @Inject()(cc: ControllerComponents, protected val dbConfigProvider: DatabaseConfigProvider)
    (implicit context: ExecutionContext)
    extends AbstractController(cc)
    with HasDatabaseConfigProvider[JdbcProfile] {

  val log = Logger("api.location")

  def get(id: Int) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get image")

    val q = for(l <- image if l.id === id.bind) yield l;

    db.run(q.result).map(x => x.headOption match {
      case Some(r) => Ok(Json.toJson(r))
      case _ => NotFound
    })
  }

  def getBytes(id: Int) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get image bytes")

    val q = for(l <- image if l.id === id.bind) yield l;

    db.run(q.result).map(x => x.headOption match {
      case Some(r) => Ok(r.data)
      case _ => NotFound
    })
  }

  def createImage() = Action.async(parse.json(imageReads)) { implicit request: Request[Image] =>
    log.debug("Rest request to create image") //TODO: Test

    val inserted = db.run(insertAndReturn[Image,ImageTable](image,request.body))

    inserted.map(x => Ok(Json.toJson(x)))
  }
}
