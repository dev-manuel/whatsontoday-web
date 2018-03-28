package whatson.util

import scala.concurrent.{ExecutionContext, Future}

import javax.inject._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import whatson.db.LoginTable._
import whatson.db.Util._
import whatson.util._
import whatson.service.geocoder._
import whatson.service.geocoder.Result._

class MockGeocoder ()(implicit context: ExecutionContext)
    extends Geocoder {

  def geocode(address: Geocoder.Address): Future[Result] =
    Future.successful(Result(List(Address(List(),address.toString,
                                          Geometry(Location(0.0f,0.0f),"ROOFTOP",
                                                   Viewport(Location(0.0f,0.0f),Location(0.0f,0.0f))),"",List())),
                             "OK",None))

  def getPosition(address: Geocoder.Address): Future[Option[Location]] = geocode(address)
    .map {
      case Result(loc :: _, "OK", _) => Some(loc.geometry.location)
      case _ => None
    }
}
