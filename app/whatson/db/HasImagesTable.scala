package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model._
import whatson.model.EntityType._

class HasImagesTable(tag: Tag) extends Table[HImages](tag, "hasimages") {
  def imageId = column[Int]("image_fk")

  def entityId = column[Int]("entity_fk")
  def entityType = column[EntityType.Value]("entity_type")

  def * = (imageId,entityId,entityType) <> (HImages.tupled, HImages.unapply)

  def image = foreignKey("image",imageId,ImageTable.image)(_.id)
}

object HasImagesTable {
  val hasImages = TableQuery[HasImagesTable]
}
