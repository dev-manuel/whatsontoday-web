package whatson.model

import play.api.libs.json._
import slick.jdbc._
import whatson.db._

case class Right(id: Option[Int], name: String) extends HasCopy[Right] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}

object Right {
  implicit val rightReads = Json.reads[Right]
  implicit val rightWrites = Json.writes[Right]

  val tupled = (this.apply _).tupled

  val CreateEvent = "CreateEvent"
  val ConfirmEvent = "ConfirmEvent"
  val CreateCategory = "CreateCategory"
  val CreateLocation = "CreateLocation"
  val Participate = "Participate"
  val CreateImage = "CreateImage"
  val ConfirmUser = "ConfirmUser"
  val CreateOrganizer = "CreateOrganizer"
  val ConfirmOrganizer = "ConfirmOrganizer"
}
