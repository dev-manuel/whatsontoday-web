package whatson.model.detail

import play.api.libs.json._
import whatson.model._

case class TaggedImage(id: Option[Int], name: String, tag: Option[String]) extends HasCopy[TaggedImage] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}

object TaggedImage {
  implicit val taggedImageReads = Json.reads[TaggedImage]

  implicit val taggedImageWrites = Json.writes[TaggedImage]
}
