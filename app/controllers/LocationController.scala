package controllers

import scala.concurrent.{ExecutionContext, Future}

import javax.inject._
import play.api._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import whatson.model.detail.LocationDetail._
import whatson.db.LocationTable._
import whatson.db.Util._
import whatson.model._
import whatson.model.Location._
import com.mohiva.play.silhouette.api._
import whatson.auth._
import whatson.model.forms._
import whatson.util.FormErrorJson._
import whatson.service.geocoder.Geocoder


class LocationController @Inject()(cc: ControllerComponents,
                                   protected val dbConfigProvider: DatabaseConfigProvider,
                                   silhouette: Silhouette[AuthEnv],
                                   geocoder: Geocoder)
    (implicit context: ExecutionContext)
    extends AbstractController(cc)
    with HasDatabaseConfigProvider[JdbcProfile] {

  val log = Logger("api.location")

  def searchLocations(search: Option[String]) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to search locations")

    val q = for {
      l <- location if similar(l.name,search.getOrElse("").bind) || search.getOrElse("").bind === ""
    } yield l

    val s = q.queryPaged.detailed
    returnPaged(s,q,db)
  }

  def getLocation(id: Int) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get location")

    val q = for(l <- location if l.id === id.bind) yield l;

    db.run(q.detailed).map(x => x.headOption match {
      case Some(r) => Ok(Json.toJson(r))
      case _ => NotFound
    })
  }

  def getNearby(id: Int) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get location close to another location")

    val q = for(l <- location if l.id === id.bind) yield l;

    db.run(q.detailed).map(_.headOption).flatMap {
      case Some(r) => {
        val q = location.sortBy(y => geoDistance(r.latitude, r.longitude, y.latitude, y.longitude))
        val s = q.queryPaged.detailed
        returnPaged(s,q,db)
      }
      case None => Future(NotFound)
    }
  }

  def createLocation() = silhouette.SecuredAction.async(parse.json) { implicit request =>
    LocationForm.form.bindFromRequest()(request).fold(
      form => {
        Future.successful(BadRequest(Json.toJson(form.errors)))
      },
      data => {
        log.debug("Rest request to create location")

        val inserted = db.run(insertAndReturn[Location,LocationTable](location,data.toLocation))

        inserted.map(x => Ok(Json.toJson(x)))
      })
  }
}
