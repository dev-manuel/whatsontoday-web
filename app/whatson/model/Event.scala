package whatson.model

import java.sql.Timestamp
import play.api.libs.json._
import whatson.util.DateTime._

case class Event(id: Option[Int],name: String, from: Timestamp, to: Timestamp, creatorId: Option[Int], categoryId: Int, locationId: Int) {
  
}

object EventH {
  implicit val eventReads = Json.reads[Event]
  implicit val eventWrites = Json.writes[Event]
}