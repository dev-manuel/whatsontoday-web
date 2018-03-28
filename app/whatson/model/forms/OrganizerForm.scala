package whatson.model.forms

import play.api.data.Form
import play.api.data.Forms._
import play.api.libs.json.Json

object OrganizerForm {
  val form = Form(
    mapping(
      "name" -> nonEmptyText.verifying("too short", x => x.length>3)
    )(Data.apply)(Data.unapply)
  )

  case class Data(name: String)

  /**
    * The companion object.
    */
  object Data {

    /**
      * Converts the [Date] object to Json and vice versa.
      */
    implicit val jsonFormat = Json.format[Data]
  }
}
