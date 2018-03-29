package whatson.modules

import scala.collection.immutable._

import com.google.inject.{AbstractModule, Provides}
import com.mohiva.play.silhouette.api.{Environment, EventBus, Silhouette, SilhouetteProvider}
import com.mohiva.play.silhouette.api.crypto._
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services._
import com.mohiva.play.silhouette.api.util._
import com.mohiva.play.silhouette.crypto._
import com.mohiva.play.silhouette.impl.authenticators._
import com.mohiva.play.silhouette.impl.providers._
import com.mohiva.play.silhouette.impl.providers.oauth2._
import com.mohiva.play.silhouette.impl.providers.state._
import com.mohiva.play.silhouette.impl.util._
import com.mohiva.play.silhouette.impl.services._
import com.mohiva.play.silhouette.password.BCryptPasswordHasher
import net.ceedubs.ficus.Ficus._
import net.ceedubs.ficus.readers.ArbitraryTypeReader._
import net.codingwell.scalaguice.ScalaModule
import play.api.Configuration
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.ws.WSClient
import play.api.mvc.DefaultCookieHeaderEncoding
import whatson.service._
import whatson.service.geocoder._
import whatson.auth._
import whatson.util._
import com.google.inject._
import com.mohiva.play.silhouette.api.Env

class ServiceModule extends AbstractModule with ScalaModule {
  override def configure() = {
    bind[UserService].to[UserServiceImpl]
    bind[OrganizerService].to[OrganizerServiceImpl]
    bind[MailService].to[MailServiceImpl]
    bind[EventService].to[EventServiceImpl]
    bind[Geocoder].to[GeocoderImpl]
    bind[LocationService].to[LocationServiceImpl]
  }
  
  /**
    * Provides the ApplicationConfig.
    */
  @Provides
  def provideApplicationConfig(
    configuration: Configuration): ApplicationConfig = {
    configuration.underlying.as[ApplicationConfig]("application")
  }

  /**
    * Provides the GeocoderConfig.
    */
  @Provides
  def provideGeocoderConfig(
    configuration: Configuration): GeocoderConfig = {
    configuration.underlying.as[GeocoderConfig]("geocoder")
  }
}