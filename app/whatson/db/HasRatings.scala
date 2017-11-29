package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model._

trait HasRatings[T] extends HasID[T] {
  def ratings = RatingTable.rating.filter(x => x.entityId === id)
  def avgRating = ratings.map(_.rating).avg
}