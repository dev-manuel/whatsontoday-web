package whatson.model.forms

import play.api.data.Form
import play.api.data.Forms._
import whatson.model._
import play.api.libs.json.Json

object LocationForm {
  val map = mapping(
    "id" -> optional(number(min=1)),
    "name" -> nonEmptyText,
    /*"latitude" -> bigDecimal.transform(x => x.toFloat,(x: Float) => BigDecimal(x)),
    "longitude" -> ignored(0.0f)bigDecimal.transform(x => x.toFloat,(x: Float) => BigDecimal(x)),*/
    "country" -> nonEmptyText,
    "city" -> nonEmptyText,
    "street" -> nonEmptyText
  )(Data.apply)(Data.unapply)

  case class Data(id: Option[Int], name: String, country: String,
                  city: String, street: String) {
    def toLocation = Location(id,name,0.0f,0.0f,country,city,street)
  }

  object Data {
    implicit val jsonFormat = Json.format[Data]
  }

  val form = Form(map)
}
