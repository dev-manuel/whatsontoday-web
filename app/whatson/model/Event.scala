package whatson.model

import java.sql.Timestamp
import play.api.libs.json._
import whatson.util.DateTime._
import slick.jdbc._
import scala.math.BigDecimal

case class Event(id: Option[Int], name: String, from: Timestamp, to: Option[Timestamp],
                 description: String, shortDescription: String, creatorId: Option[Int],
                 locationId: Int, organizerId: Option[Int], priceMin: Option[BigDecimal], 
                 priceMax: Option[BigDecimal]) extends HasCopy[Event] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}

object Event {
  implicit val eventReads = Json.reads[Event]
  implicit val eventWrites = Json.writes[Event]

  val tupled = (this.apply _).tupled
}
