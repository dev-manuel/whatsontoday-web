package whatson.model

import play.api.libs.json._

case class Image(id: Option[Int], name: String, data: Array[Byte]) extends HasCopy[Image] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}

object Image {
  implicit val imageReads = Json.reads[Image]

  implicit val imageWrites = Json.writes[Image]

  val tupled = (this.apply _).tupled
}
