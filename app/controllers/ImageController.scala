package controllers

import scala.concurrent.ExecutionContext

import javax.inject._
import play.api._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import whatson.db.ImageTable._
import whatson.db.Util._
import whatson.model._
import whatson.model.Image._


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

  def attachImage(id: Int, entityType: String, entityId: Int) = Action.async { implicit request =>
    log.debug("Rest request to attach image")

    val imgEnt = ImageEntity(id, entityId, EntityType.withName(entityType))
    val inserted = db.run(ImageEntityTable.imageEntity += imgEnt)

    inserted.map {
      case 0 => NotFound
      case _ => Ok(Json.toJson(imgEnt))
    }
  }
}
