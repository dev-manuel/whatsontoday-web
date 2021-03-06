package whatson.model.forms

import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json
import java.sql.Timestamp
import whatson.util.DateTime._
import whatson.model._
import whatson.model.forms.LocationForm.Data._
import scala.math.BigDecimal

/**
  * The form which handles creating/updating Events.
  */
object EventForm {
  val map = mapping(
      "name" -> nonEmptyText,
      "from" -> sqlTimestamp("yyyy-MM-dd HH:mm:ss"),
      "to" -> optional(sqlTimestamp("yyyy-MM-dd HH:mm:ss")),
      "categories" -> list(CategoryForm.map),
      "location" -> LocationForm.map,
      "images" -> list(TaggedImageForm.map),
      "description" -> nonEmptyText,
      "shortDescription" -> nonEmptyText(maxLength = 128),
      "priceMin" -> optional(bigDecimal),
      "priceMax" -> optional(bigDecimal)
    )(Data.apply)(Data.unapply)
  val form = Form(map)

  case class Data(name: String, from: Timestamp,
                  to: Option[Timestamp], categories: List[Category],
                  location: LocationForm.Data, images: List[TaggedImageForm.Data],
                  description: String, shortDescription: String,
                  priceMin: Option[BigDecimal] = None, priceMax: Option[BigDecimal] = None)

  object Data {
    implicit val jsonFormat = Json.format[Data]
  }
}
