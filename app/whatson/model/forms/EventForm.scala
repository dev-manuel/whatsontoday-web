package whatson.model.forms

import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import java.sql.Timestamp
import whatson.util.DateTime._
import whatson.model._

/**
  * The form which handles creating/updating Events.
  */
object EventForm {
  val map = mapping(
      "name" -> nonEmptyText,
      "from" -> sqlTimestamp("yyyy-MM-dd HH:mm:ss"),
      "to" -> sqlTimestamp("yyyy-MM-dd HH:mm:ss"),
      "categories" -> list(CategoryForm.map),
      "location" -> LocationForm.map,
      "imageIds" -> list(number),
      "description" -> nonEmptyText
    )(Data.apply)(Data.unapply)
  val form = Form(map)

  case class Data(name: String, from: Timestamp,
                  to: Timestamp, categories: List[Category],
                  location: Location, imageIds: List[Int],
                  description: String)

  object Data {
    implicit val jsonFormat = Json.format[Data]
  }
}
