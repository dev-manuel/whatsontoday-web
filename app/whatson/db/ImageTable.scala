package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model._
import slick.lifted.ProvenShape.proveShapeOf
import java.sql.Timestamp
import whatson.db.ParticipantTable._

class ImageTable(tag: Tag) extends Table[Image](tag, "images") with HasID[Image] {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)

  def data = column[Array[Byte]]("data")

  def contentType = column[Option[String]]("content_type")

  def * = (id.?,name,data,contentType) <> (Image.tupled, Image.unapply)
}

object ImageTable {
  val image = TableQuery[ImageTable]
}
