package whatson.model.forms

import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import java.sql.Timestamp
import whatson.util.DateTime._
import whatson.model._

object LoginUpdateForm {
  val map = mapping(
    "password" -> nonEmptyText
    )(Data.apply)(Data.unapply)
  val form = Form(map)

  case class Data(password: String)

  object Data {
    implicit val jsonFormat = Json.format[Data]
  }
}
