package whatson.model.forms

import play.api.data.Form
import play.api.data.Forms._
import whatson.model._

object CategoryForm {
  val map = mapping(
    "id" -> optional(number(min=1)),
    "name" -> nonEmptyText(minLength=3),
    "parentId" -> number(min=1),
    )(Category.apply)(Category.unapply)
  val form = Form(map)
}
