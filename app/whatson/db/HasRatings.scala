package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model._
import whatson.model.EntityType._

trait HasRatings[T] extends HasID[T] {
  val entityType: EntityType.Value

  def ratings = RatingTable.rating.filter(x => x.entityId === id && x.entityType === entityType)
  def avgRating = ratings.map(_.rating).avg
}
