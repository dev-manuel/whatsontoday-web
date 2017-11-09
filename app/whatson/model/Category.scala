package whatson.model

import play.api.libs.json._

case class Category(id: Option[Int], name: String, parentId: Int) {
  
}

object CategoryH {
  implicit val categoryReads = Json.reads[Category]
  implicit val categoryWrites = Json.writes[Category]
}