package whatson.model

import play.api.libs.json._

case class Location(id: Option[Int], name: String, latitude: Float, longitude: Float) extends HasCopy[Location] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}

object LocationH {
  implicit val locationReads = Json.reads[Location]
  implicit val locationWrites = Json.writes[Location]
}