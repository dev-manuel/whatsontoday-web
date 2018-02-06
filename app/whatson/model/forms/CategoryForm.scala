package whatson.model.forms

import play.api.data.Form
import play.api.data.Forms._
import whatson.model._

object CategoryForm {
  val map = mapping(
    "id" -> ignored(None: Option[Int]),
    "name" -> nonEmptyText,
    "parentId" -> number,
    )(Category.apply)(Category.unapply)
  val form = Form(map)
}
