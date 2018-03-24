package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import whatson.db.LoginTable._
import whatson.db.EventTable._

class ParticipantTable(tag: Tag) extends Table[(Int,Int)](tag, "participant") {
  def userID = column[Int]("user_fk")
  def eventID = column[Int]("event_fk")

  def * = (userID,eventID)

  def eventFK = foreignKey("event", eventID,event)(_.id)
  def participant = foreignKey("participant", userID,UserTable.user)(_.id)
}

object ParticipantTable {
  val participant = TableQuery[ParticipantTable]
}
