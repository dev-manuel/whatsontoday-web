package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import java.sql.Timestamp
import whatson.db.ParticipantTable._
import whatson.db.UserTable._
import whatson.model.Event
import whatson.model.HasID

class EventTable(tag: Tag) extends Table[Event](tag, "event") with HasID[Event]  {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)
  
  def from = column[Timestamp]("fromtime")
  def to = column[Timestamp]("totime")
  
  def creatorId = column[Option[Int]]("creator_fk")
  def categoryId = column[Int]("category_fk")
  
  def locationId = column[Int]("location_fk")
  
  def * = (id.?,name,from,to,creatorId,categoryId, locationId) <> (Event.tupled, Event.unapply)
  
  def creator = foreignKey("creator",creatorId,user)(_.id.?)
  def category = foreignKey("category",categoryId,CategoryTable.category)(_.id)
  def location = foreignKey("location",locationId,LocationTable.location)(_.id)
  def participants = participant.filter(_.eventID === id).flatMap(_.participant)
  
  def ratings = RatingTable.rating.filter(_.entityId === id)
}

object EventTable {
  val event = TableQuery[EventTable]
}