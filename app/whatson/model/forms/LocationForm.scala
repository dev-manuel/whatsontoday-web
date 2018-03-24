package whatson.model.forms

import play.api.data.Form
import play.api.data.Forms._
import whatson.model._

object LocationForm {
  val map = mapping(
    "id" -> optional(number(min=1)),
    "name" -> nonEmptyText,
    "latitude" -> bigDecimal.transform(x => x.toFloat,(x: Float) => BigDecimal(x)),
    "longitude" -> bigDecimal.transform(x => x.toFloat,(x: Float) => BigDecimal(x)),
    "country" -> nonEmptyText,
    "city" -> nonEmptyText,
    "street" -> nonEmptyText
  )(Location.apply)(x => Location.unapply(x))
  val form = Form(map)
}
