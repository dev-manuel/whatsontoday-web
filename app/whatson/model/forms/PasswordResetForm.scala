package whatson.model.forms

import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import java.sql.Timestamp
import whatson.util.DateTime._
import whatson.model._

object PasswordResetForm {
  val map = mapping(
    "email" -> email
  )(Data.apply)(Data.unapply)
  val form = Form(map)

  case class Data(email: String)

  object Data {
    implicit val jsonFormat = Json.format[Data]
  }
}
