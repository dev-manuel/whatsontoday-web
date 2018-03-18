package whatson.db


import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import whatson.db.Util._
import whatson.model._

class RightTable(tag: Tag) extends Table[Right](tag, "right") {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[Right.Rights.Value]("name",O.Unique)

  def * = (id.?,name) <> (Right.tupled, Right.unapply)

  /*def creator = foreignKey("creator",creatorId,OrganizerTable.organizer)(_.id.?)
  def location = foreignKey("location",locationId,LocationTable.location)(_.id)
  def participants = participant.filter(_.eventID === id).flatMap(_.participant)
  def categories = eventCategory.filter(_.eventID === id).flatMap(_.categoryFK)*/
}

object RightTable {
  val right = TableQuery[RightTable]
}
