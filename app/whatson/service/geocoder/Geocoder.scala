package whatson.service.geocoder

import com.mohiva.play.silhouette.api.services.IdentityService
import com.mohiva.play.silhouette.impl.providers.CommonSocialProfile
import whatson.model._
import com.mohiva.play.silhouette.api.LoginInfo
import scala.concurrent.Future
import whatson.service.geocoder.{Result, Location}

trait Geocoder {
  def geocode(address: Geocoder.Address): Future[Result]

  def getPosition(address: Geocoder.Address): Future[Option[Location]]
}

object Geocoder {
  case class Address(country: String, city: String, street: String) {
    override def toString = street ++ ", " ++ city ++ ", " ++ country
  }
}
