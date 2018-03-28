package whatson.model

import play.api.libs.json._
import whatson.model._
import whatson.model.EntityType._

case class UserRole(roleId: Int, loginId: Int, scope: UserRole.Scope)

object UserRole {
  sealed trait Scope {
    def name: String
    def organizerId: Option[Int]
    def locationId: Option[Int]
  }
  case object Global extends Scope {
    def name = "GLOBAL"
    def organizerId = None
    def locationId = None
  }
  case class OrganizerScope(orgId: Int) extends Scope {
    def name = "ORGANIZER"
    def organizerId = Some(orgId)
    def locationId = None
  }
  case class LocationScope(locId: Int) extends Scope {
    def name = "LOCATION"
    def organizerId = None
    def locationId = Some(locId)
  }

  implicit object GlobalFormat extends Format[Global.type] {
    def reads(json: JsValue) = json match {
      case JsString("Global") => JsSuccess(Global)
      case _ => JsError(List())
    }
    def writes(o: Global.type) = Json.toJson("Global")
  }
  implicit val organizerScopeFormat = Json.format[OrganizerScope]
  implicit val locationScopeFormat = Json.format[LocationScope]
  implicit val userRoleFormat = Json.format[ImageEntity]

  val tupled = (this.apply _).tupled
}
