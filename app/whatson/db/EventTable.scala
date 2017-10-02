package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf

class EventTable(tag: Tag) extends Table[(Option[Int],String)](tag, "events") {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)
    
  def * = (id.?,name)
}

object EventTable {
  val event = TableQuery[EventTable]
}