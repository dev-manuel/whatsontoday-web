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
object EventsForm {
  val map = mapping(
      "name" -> nonEmptyText,
      "from" -> sqlTimestamp("yyyy-MM-dd HH:mm:ss"),
      "to" -> sqlTimestamp("yyyy-MM-dd HH:mm:ss"),
      "creator" -> number,
      "categories" -> list(CategoryForm.map),
      "location" -> LocationForm.map,
      "images" -> list(number)
    )(Data.apply)(Data.unapply)
  val form = Form(map)

  case class Data(name: String, from: Timestamp,
                  to: Timestamp, creatorId: Int, categories: List[Category],
                  location: Location, imageIds: List[Int])

  object Data {
    implicit val jsonFormat = Json.format[Data]
  }
}
