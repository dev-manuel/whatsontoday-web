package whatson.db


import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import whatson.db.Util._
import whatson.model._

class RoleTable(tag: Tag) extends Table[Role](tag, "roles") {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)

  def * = (id.?,name) <> (Role.tupled, Role.unapply)

  /*def creator = foreignKey("creator",creatorId,OrganizerTable.organizer)(_.id.?)
   def location = foreignKey("location",locationId,LocationTable.location)(_.id)
   def participants = participant.filter(_.eventID === id).flatMap(_.participant)
   def categories = eventCategory.filter(_.eventID === id).flatMap(_.categoryFK)*/
}

object RoleTable {
  val role = TableQuery[RoleTable]
}
