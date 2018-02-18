package whatson.model.forms

import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import java.sql.Timestamp
import whatson.util.DateTime._
import whatson.model._

object TaggedImageForm {
  val map = mapping(
    "id" -> number(min=1),
    "tag" -> optional(nonEmptyText)
  )(Data.apply)(Data.unapply)

  case class Data(id: Int, tag: Option[String])

  val form = Form(map)

  object Data {
    implicit val jsonFormat = Json.format[Data]
  }
}
