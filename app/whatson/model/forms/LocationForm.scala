package whatson.model.forms

import play.api.data.Form
import play.api.data.Forms._
import whatson.model._

object LocationForm {
  val map = mapping(
    "id" -> ignored(None: Option[Int]),
    "name" -> nonEmptyText,
    "latitude" -> bigDecimal.transform(x => x.toFloat,(x: Float) => BigDecimal(x)),
    "longitude" -> bigDecimal.transform(x => x.toFloat,(x: Float) => BigDecimal(x))
  )(Location.apply)(x => Location.unapply(x))
  val form = Form(map)
}
