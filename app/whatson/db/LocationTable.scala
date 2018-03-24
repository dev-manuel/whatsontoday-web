package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model._

class LocationTable(tag: Tag) extends Table[Location](tag, "location") with HasRatings[Location]  with HasImages[Location] {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)
  
  def latitude = column[Float]("latitude")
  
  def longitude = column[Float]("longitude")

  def country = column[String]("country")

  def city = column[String]("city")

  def street = column[String]("street")

  def * = (id.?,name,latitude,longitude,country,city,street) <> (Location.tupled, Location.unapply)
  
  val entityType = EntityType.Location
}

object LocationTable {
  val location = TableQuery[LocationTable]
}
