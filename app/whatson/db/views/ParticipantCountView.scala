package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model._
import slick.lifted.ProvenShape.proveShapeOf
import java.sql.Timestamp
import whatson.db.ParticipantTable._

class ParticipantCountView(tag: Tag) extends Table[ParticipantCount](tag, "participant_counts") with HasID[ParticipantCount] {
  def id = column[Int]("id")

  def event_fk = column[Int]("event_fk")

  def count = column[Int]("count")

  def * = (id.?,event_fk,count) <> (ParticipantCount.tupled, ParticipantCount.unapply)
}

object ParticipantCountView {
  val participantCount = TableQuery[ParticipantCountView]
}
