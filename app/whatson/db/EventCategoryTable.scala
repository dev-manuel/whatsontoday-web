package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import whatson.db.CategoryTable._
import whatson.db.EventTable._

class EventCategoryTable(tag: Tag) extends Table[(Int,Int)](tag, "eventcategory") {
  def categoryID = column[Int]("category_fk")
  def eventID = column[Int]("event_fk")
    
  def * = (categoryID,eventID)
    
  def categoryFK = foreignKey("category", eventID,category)(_.id)
  def eventFK = foreignKey("event", eventID,event)(_.id)
}

object EventCategoryTable {
  val eventCategory = TableQuery[EventCategoryTable]
}
