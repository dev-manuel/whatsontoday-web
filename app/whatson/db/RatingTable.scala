package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model._
import whatson.model.EntityType._

class RatingTable(tag: Tag) extends Table[Rating](tag, "rating") with HasID[Rating] {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def rating = column[Float]("rating")

  def userId = column[Int]("user_fk")

  def entityId = column[Int]("entity_fk")

  def entityType = column[EntityType.Value]("entity_type")

  def * = (id.?,rating,userId,entityId,entityType) <> (Rating.tupled, Rating.unapply)

  def user = foreignKey("user",userId,UserTable.user)(_.id)
}

object RatingTable {
  val rating = TableQuery[RatingTable]

  val eventType = EntityType.Event
  val locationType = EntityType.Location
}
