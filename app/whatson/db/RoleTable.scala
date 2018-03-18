package whatson.db


import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import whatson.db.Util._
import whatson.model._
import whatson.db._

class RoleTable(tag: Tag) extends Table[Role](tag, "roles") {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)

  def * = (id.?,name) <> (Role.tupled, Role.unapply)

  def rights = RoleRightsTable.roleRights.filter(_.roleId === id).flatMap(_.right)
}

object RoleTable {
  val role = TableQuery[RoleTable]
}
