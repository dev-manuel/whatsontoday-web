package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import whatson.model._

class OrganizerTable(tag: Tag) extends Table[Organizer](tag, "organizer") with HasRatings[Organizer] with HasImages[Organizer] {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)

  def name = column[String]("name")

  def avatar = column[Option[String]]("avatar")

  def * = (id.?,name,avatar) <> (Organizer.tupled, Organizer.unapply)

  
  val entityType = EntityType.Organizer
}

object OrganizerTable {
  val organizer = TableQuery[OrganizerTable]
}
