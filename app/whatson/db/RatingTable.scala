package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model._

class RatingTable(tag: Tag) extends Table[Rating](tag, "rating") with HasID[Rating] {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def rating = column[Float]("rating")
  
  def userId = column[Int]("user_fk")
  
  def entityId = column[Int]("entity_fk")

  def * = (id.?,rating,userId,entityId) <> (Rating.tupled, Rating.unapply)
  
  def user = foreignKey("user",userId,UserTable.user)(_.id)
}

object RatingTable {
  val rating = TableQuery[RatingTable]
}