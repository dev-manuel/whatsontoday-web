package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf

class CategoryTable(tag: Tag) extends Table[(Option[Int],String,Option[Int])](tag, "category") {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)
  def parentID = column[Option[Int]]("parent_fk")
    
  def * = (id.?,name,parentID)
        
  def parent = foreignKey("parent",parentID,CategoryTable.category)(_.id)
}

object CategoryTable {
  val category = TableQuery[CategoryTable]
}
