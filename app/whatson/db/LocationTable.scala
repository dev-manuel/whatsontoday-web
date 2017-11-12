package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model.Location

class LocationTable(tag: Tag) extends Table[Location](tag, "location"){
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)
  
  def latitude = column[Float]("latitude")
  
  def longitude = column[Float]("longitude")

  def * = (id.?,name,latitude,longitude) <> (Location.tupled, Location.unapply)
  
  def ratings = RatingTable.rating.filter(_.entityId === id)
}

object LocationTable {
  val location = TableQuery[LocationTable]
}