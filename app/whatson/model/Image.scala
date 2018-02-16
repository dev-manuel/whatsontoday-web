package whatson.model

import play.api.libs.json._
import play.api.libs.functional.syntax._

case class Image(id: Option[Int], name: String, data: Array[Byte], contentType: String) extends HasCopy[Image] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}

object Image {
  implicit val imageReads = Json.reads[Image]

  implicit val imageWrites = new Writes[Image] {
    def writes(img: Image): JsValue = {
      Json.obj("id" -> img.id,"name" -> img.name, "contentType" -> img.contentType)
    }
  }

  val tupled = (this.apply _).tupled
}
