package whatson.model.detail

import java.sql.Timestamp
import play.api.libs.json._
import whatson.model._
import whatson.util.DateTime._
import whatson.db.EventTable
import slick.jdbc.PostgresProfile.api._

case class EventDetail(id: Option[Int],name: String, from: Timestamp, 
    to: Timestamp, creator: User, categories: List[Category], avgRating: Option[Float]) extends Rateable {
  
}

object EventDetail {
  implicit val eventDetailReads = Json.reads[EventDetail]
  implicit val eventDetailWrites = Json.writes[EventDetail]
  
  val tupled = (this.apply _).tupled
}

