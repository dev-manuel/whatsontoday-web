package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import whatson.model._

class OrganizerTable(tag: Tag) extends Table[Organizer](tag, "organizer") with HasID[Organizer] {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)

  def loginFk = column[Int]("login_fk")

  def name = column[String]("name")

  def * = (id.?,name,loginFk) <> (Organizer.tupled, Organizer.unapply)

  def login = foreignKey("login", loginFk,LoginTable.login)(_.id)
}

object OrganizerTable {
  val organizer = TableQuery[OrganizerTable]
}
