package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model._

trait HasRatings[T] extends HasID[T] {
  val entityType: Int
  
  def ratings = RatingTable.rating.filter(x => x.entityId === id && x.entityType === entityType)
  def avgRating = ratings.map(_.rating).avg
}