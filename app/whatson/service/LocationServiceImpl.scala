package whatson.service

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import whatson.db._
import whatson.db.Util._
import whatson.model._
import javax.inject._
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.{ ExecutionContext, Future }
import play.api._
import scala.collection.Map._
import whatson.util.ListUtil._
import whatson.model.detail._
import whatson.service.geocoder.Geocoder
import whatson.model.forms._

class LocationServiceImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider,
                                    geocoder: Geocoder)
                                 (implicit context: ExecutionContext)
    extends LocationService with HasDatabaseConfigProvider[JdbcProfile] {

  def insertOrGet(form: LocationForm.Data): Future[Option[Location]] = {
    form.id match {
      case None => {
        geocoder.getPosition(Geocoder.Address(form.country,form.city,form.street)).flatMap {
          case x => db.run(insertAndReturn[Location,LocationTable]
                                    (LocationTable.location,form.toLocation(x.map(_.lat),x.map(_.lng)))).map(Some(_))
        }
      }
      case Some(id) => db.run(LocationTable.location.filter(_.id === id).result).map(_.headOption)
    }
  }
}
