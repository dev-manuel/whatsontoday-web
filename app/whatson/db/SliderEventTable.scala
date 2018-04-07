package whatson.db

import java.sql.Timestamp

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import whatson.db.EventCategoryTable._
import whatson.db.ParticipantTable._
import whatson.db.Util._
import whatson.model._

class SliderEventTable(tag: Tag) extends Table[(Int,Int)](tag, "slider_events") {
  def eventId = column[Int]("event_fk")
  def number = column[Int]("number")

  def * = (eventId,number)

  def event = foreignKey("event",eventId,EventTable.event)(_.id)
}

object SliderEventTable {
  val sliderEvent = TableQuery[SliderEventTable]
}
