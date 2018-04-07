package whatson.model.forms

import play.api.data.Form
import play.api.data.Forms._
import whatson.model._
import play.api.libs.json.Json

object LocationForm {
  val map = mapping(
    "id" -> optional(number(min = 1)),
    "name" -> nonEmptyText,
    /*"latitude" -> bigDecimal.transform(x => x.toFloat,(x: Float) => BigDecimal(x)),
    "longitude" -> ignored(0.0f)bigDecimal.transform(x => x.toFloat,(x: Float) => BigDecimal(x)),*/
    "country" -> nonEmptyText,
    "city" -> nonEmptyText,
    "street" -> nonEmptyText,
    "website" -> optional(nonEmptyText),
    "phone" -> optional(nonEmptyText),
    "comment" -> optional(nonEmptyText),
    "link" -> optional(nonEmptyText),
    "zip" -> optional(nonEmptyText)
    )(Data.apply)(Data.unapply)

  case class Data(id: Option[Int], name: String, country: String,
                  city: String, street: String, website: Option[String] = None,
                  phone: Option[String] = None, comment: Option[String] = None,
                  link: Option[String] = None, zip: Option[String] = None) {
    def toLocation(lat: Option[Float] = None, long: Option[Float] = None) = Location(id, name, lat, long, country, city, street, website, phone, comment, link, zip)
  }

  object Data {
    implicit val jsonFormat = Json.format[Data]
  }

  val form = Form(map)
}
