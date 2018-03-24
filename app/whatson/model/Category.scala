package whatson.model

import play.api.libs.json._

case class Category(id: Option[Int], name: String, parentId: Int) extends HasCopy[Category] {
  def cpy(id: Option[Int]) = this.copy(id = id)
}

object Category {
  implicit val categoryReads = Json.reads[Category]
  implicit val categoryWrites = Json.writes[Category]
  
  val tupled = (this.apply _).tupled
}