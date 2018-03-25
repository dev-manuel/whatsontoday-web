package whatson.model.forms

import play.api.data.Form
import play.api.data.Forms._
import whatson.model._

object LocationForm {
  val map = mapping(
    "id" -> optional(number(min=1)),
    "name" -> nonEmptyText,
    /*"latitude" -> bigDecimal.transform(x => x.toFloat,(x: Float) => BigDecimal(x)),
    "longitude" -> ignored(0.0f)bigDecimal.transform(x => x.toFloat,(x: Float) => BigDecimal(x)),*/
    "country" -> nonEmptyText,
    "city" -> nonEmptyText,
    "street" -> nonEmptyText
  ){ case x => Location(x._1,x._2,0.0f,0.0f,x._3,x._4,x._5)}(x => Some((x.id,x.name,x.country,x.city,x.street)))
  val form = Form(map)
}
