package whatson.model.detail

import play.api.libs.json._
import whatson.model._

case class ImageDetail(id: Option[Int], name: String, url: String) extends HasCopy[ImageDetail] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}

object ImageDetail {
  implicit val imageDetailReads = Json.reads[ImageDetail]

  implicit val imageDetailWrites = Json.writes[ImageDetail]

  val tupled = (this.apply _).tupled
}
