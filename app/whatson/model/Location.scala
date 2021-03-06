package whatson.model

import play.api.libs.json._
import whatson.model.forms._

case class Location(id: Option[Int], name: String, latitude: Option[Float], longitude: Option[Float],
                    country: String, city: String, street: String, website: Option[String],
                    phone: Option[String], comment: Option[String], link: Option[String], zip: Option[String]) extends HasCopy[Location] {
  def cpy(i: Option[Int]) = this.copy(id = i)

  def distance(b: Location) = {
    //TODO: This is the haversine formula, currently the law of cosines is used. Test wich one is faster (especially for DB)
    /*val a = scala.math.pow(Math.sin(fromAngle(this.latitude-b.latitude)/2),2)+
      Math.cos(latitude)+Math.cos(b.latitude)+
      scala.math.pow(fromAngle(longitude-b.longitude)/2, 2)

    val c = 2*Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

    c*LocationH.earthRadius*/

    Math.acos( Math.sin(fromAngle(latitude.getOrElse(0.0f))) * Math.sin(fromAngle(b.latitude.getOrElse(0.0f)))
        + Math.cos(fromAngle(latitude.getOrElse(0.0f))) * Math.cos(fromAngle(b.latitude.getOrElse(0.0f)))
        + Math.cos(fromAngle(longitude.getOrElse(0.0f)-b.longitude.getOrElse(0.0f)))) * Location.earthRadius
  }

  private def fromAngle(a: Float) = a/180*Math.PI;

  def toForm = LocationForm.Data(id,name,country,city,street,website,phone,comment,link)
}

object Location {
  implicit val locationReads = Json.reads[Location]
  implicit val locationWrites = Json.writes[Location]

  val earthRadius = 6371

  val tupled = (this.apply _).tupled
}
