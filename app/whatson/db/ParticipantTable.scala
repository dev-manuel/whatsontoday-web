package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import whatson.db.LoginTable._
import whatson.db.EventTable._

class ParticipantTable(tag: Tag) extends Table[(Int,Int)](tag, "participant") {
  def loginID = column[Int]("login_fk")
  def eventID = column[Int]("event_fk")

  def * = (loginID,eventID)

  def eventFK = foreignKey("event", eventID,event)(_.id)
  def participant = foreignKey("participant", loginID,LoginTable.login)(_.id)
}

object ParticipantTable {
  val participant = TableQuery[ParticipantTable]
}
