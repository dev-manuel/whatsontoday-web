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
import akka.util._
import java.io._
import org.apache.commons.io._
import scala.util._
import scala.concurrent.Future
import whatson.service._
import com.mohiva.play.silhouette.api._
import whatson.auth._
import whatson.model.forms._


class ImageController @Inject()(cc: ControllerComponents,
                                protected val dbConfigProvider: DatabaseConfigProvider,
                                val silhouette: Silhouette[AuthEnv],
                                val organizerService: OrganizerService,
                                val userService: UserService)
    (implicit context: ExecutionContext)
    extends AbstractController(cc)
    with HasDatabaseConfigProvider[JdbcProfile] with Util {

  val log = Logger("api.image")

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
      case Some(r) => Ok(r.data).as(r.contentType)
      case _ => NotFound
    })
  }

  def createImage = Action(parse.multipartFormData).async { request =>
    log.debug("Rest request to create image")

    request.body.file("image").zip(request.body.dataParts("data")).flatMap { case (x,data) =>
      x.contentType.map { contentType =>
        val file = x.ref.path.toFile()
        val str = new FileInputStream(file)
        val bytes = IOUtils.toByteArray(str)

        val img = Image(None,bytes,contentType)

        db.run(insertAndReturn[Image,ImageTable](image,img))
      }
    }.map(_.map(x => Ok(Json.toJson(x)))).headOption.getOrElse(Future.successful(BadRequest))
  }

  def attachImage(id: Int, entityType: String, entityId: Int, tag: Option[String]) = userOrganizerRequest(parse.default) { case (request,login) =>
    log.debug("Rest request to attach image")

    val authorized = (EntityType.withName(entityType), login) match {
      case (EntityType.Event,Right(Organizer(idOrg,_,_,_))) => {
        val q = for(e <- EventTable.event if e.id === id.bind && e.creatorId === idOrg) yield e;
        db.run(q.result).map(_.headOption).map {
          case Some(e) => true
          case None => false
        }
      }
      case (EntityType.Organizer,Right(Organizer(idOrg,_,_,_))) => Future.successful(entityId == idOrg.getOrElse(-1))
      case (EntityType.Location,_) => Future.successful(true)
      case _ => Future.successful(false)
    }

    authorized.flatMap {
      case true => {
        val imgEnt = ImageEntity(id, entityId, EntityType.withName(entityType), tag)
        val inserted = db.run(ImageEntityTable.imageEntity += imgEnt)

        inserted.map {
          case 0 => NotFound
          case _ => Ok(Json.toJson(imgEnt))
        }
      }
      case false => Future.successful(Unauthorized)
    }
  }
}
