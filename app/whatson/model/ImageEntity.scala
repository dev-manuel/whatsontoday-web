package whatson.model

import play.api.libs.json._
import whatson.model._
import whatson.model.EntityType._

case class ImageEntity(imageId: Int, entityId: Int, entityType: EntityType.Value)

object ImageEntity {
  implicit val imageEntityReads = Json.reads[ImageEntity]
  implicit val imageEntityWrites = Json.writes[ImageEntity]

  val tupled = (this.apply _).tupled
}
