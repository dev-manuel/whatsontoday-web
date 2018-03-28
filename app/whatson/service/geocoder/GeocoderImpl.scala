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

class GeocoderImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider,
                             applicationConfig: ApplicationConfig,
                             wsClient: WSClient,
                             geoConfig: GeocoderConfig)
                          (implicit context: ExecutionContext)
    extends Geocoder {
  
}
