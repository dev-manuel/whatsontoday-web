package whatson.service.geocoder

import scala.concurrent.{ExecutionContext, Future}

import javax.inject._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import whatson.db.LoginTable._
import whatson.db.Util._
import whatson.model._
import whatson.util._
import play.api.libs.ws._
import whatson.service.geocoder.Result
import whatson.service.geocoder.Result._
import play.api.libs.json.Json
import play.api._

class GeocoderImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider,
                             applicationConfig: ApplicationConfig,
                             ws: WSClient,
                             geoConfig: GeocoderConfig)
                          (implicit context: ExecutionContext)
    extends Geocoder {

  val log = Logger("service.geocoder")
  
  def geocode(address: Geocoder.Address): Future[Result] = {
    val result = ws.url(geoConfig.url)
      .addQueryStringParameters("address" -> address.toString, "key" -> geoConfig.apiKey)
      .get()


    result.map { case x => 
      log.debug("Got response from geocoding api: " + x.body)
      x.json.validate[Result].get
    }
  }

  def getPosition(address: Geocoder.Address): Future[Option[Location]] = geocode(address)
    .map {
      case Result(loc :: _, "OK", _) => Some(loc.geometry.location)
      case _ => None
    }
}
