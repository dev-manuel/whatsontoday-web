package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model._
import whatson.model.EntityType._

class RoleRightsTable(tag: Tag) extends Table[(Int,Int)](tag, "rolerights") {
  def roleId = column[Int]("role_fk")

  def rightId = column[Int]("right_fk")

  def * = (roleId,rightId)

  def role = foreignKey("role",roleId,RoleTable.role)(_.id)
  def right = foreignKey("right",rightId,RightTable.right)(_.id)
}

object RoleRightsTable {
  val roleRights = TableQuery[RoleRightsTable]
}
