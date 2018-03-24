package whatson.model

import play.api.libs.json._
import whatson.model._
import whatson.model.EntityType._

case class Rating(id: Option[Int], rating: Float, userId: Int, entityId: Int, entityType: EntityType.Value) extends HasCopy[Rating] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}

object Rating {
  implicit val ratingReads = Json.reads[Rating]
  implicit val ratingWrites = Json.writes[Rating]

  val tupled = (this.apply _).tupled
}
