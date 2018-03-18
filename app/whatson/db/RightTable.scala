package whatson.db


import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import whatson.db.Util._
import whatson.model._

class RightTable(tag: Tag) extends Table[Right](tag, "rights") {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)

  def * = (id.?,name) <> (Right.tupled, Right.unapply)
}

object RightTable {
  val right = TableQuery[RightTable]
}
