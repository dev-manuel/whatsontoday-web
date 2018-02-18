package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model._
import whatson.model.EntityType._
import whatson.db._

trait HasImages[T] extends HasID[T] {
  val entityType: EntityType.Value

  def images = ImageEntityTable.imageEntity.filter(x => x.entityId === id && x.entityType === entityType).flatMap(_.image)
  def taggedImages = ImageEntityTable.imageEntity.filter(x => x.entityId === id && x.entityType === entityType).flatMap(_.taggedImage)
}
