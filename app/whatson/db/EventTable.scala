package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import java.sql.Timestamp
import whatson.db.ParticipantTable._
import whatson.db.UserTable._

class EventTable(tag: Tag) extends Table[(Option[Int],String,Timestamp,Timestamp,Option[Int],Int)](tag, "event") {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)
  
  def from = column[Timestamp]("fromtime")
  def to = column[Timestamp]("totime")
  
  def creatorID = column[Option[Int]]("creator_fk")
  def categoryID = column[Int]("category_fk")
  
  def * = (id.?,name,from,to,creatorID,categoryID)
  
  def creator = foreignKey("creator",creatorID,user)(_.id)
  def category = foreignKey("category",categoryID,CategoryTable.category)(_.id)
  def participants = participant.filter(_.eventID === id).flatMap(_.participant)
}

object EventTable {
  val event = TableQuery[EventTable]
}