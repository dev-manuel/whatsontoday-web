package whatson.model

import play.api.libs.json._
import whatson.model._
import whatson.model.EntityType._

case class HImages(imageId: Int, entityId: Int, entityType: EntityType.Value)

object HImages {
  implicit val hImagesReads = Json.reads[HImages]
  implicit val hImagesWrites = Json.writes[HImages]

  val tupled = (this.apply _).tupled
}
