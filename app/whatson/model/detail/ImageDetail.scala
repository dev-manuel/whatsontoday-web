package whatson.model.detail

import play.api.libs.json._
import whatson.model._

case class ImageDetail(id: Int) extends HasCopy[ImageDetail] {
  def cpy(i: Option[Int]) = this.copy(id = i.getOrElse(id))
}

object ImageDetail {
  implicit val imageDetailReads = Json.reads[ImageDetail]

  implicit val imageDetailWrites = Json.writes[ImageDetail]
}
