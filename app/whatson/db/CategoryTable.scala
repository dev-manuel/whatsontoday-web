package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import whatson.model.Category

class CategoryTable(tag: Tag) extends Table[Category](tag, "category") {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)
  def parentID = column[Int]("parent_fk")
    
  def * = (id.?,name,parentID) <> (Category.tupled, Category.unapply) 
        
  def parent = foreignKey("parent",parentID,CategoryTable.category)(_.id)
}

object CategoryTable {
  val category = TableQuery[CategoryTable]
}
