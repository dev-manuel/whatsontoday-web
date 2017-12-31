package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model._
import whatson.model.EntityType._

class ImageEntityTable(tag: Tag) extends Table[ImageEntity](tag, "imageentity") {
  def imageId = column[Int]("image_fk")

  def entityId = column[Int]("entity_fk")
  def entityType = column[EntityType.Value]("entity_type")

  def * = (imageId,entityId,entityType) <> (ImageEntity.tupled, ImageEntity.unapply)

  def image = foreignKey("image",imageId,ImageTable.image)(_.id)
}

object ImageEntityTable {
  val imageEntity = TableQuery[ImageEntityTable]
}
