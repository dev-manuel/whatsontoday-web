package whatson.model

import play.api.libs.json._
import slick.jdbc._
import whatson.db._

case class Right(id: Option[Int], name: Right.Rights.Value) extends HasCopy[Right] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}

object Right {
  implicit val rightReads = Json.reads[Right]
  implicit val rightWrites = Json.writes[Right]

  val tupled = (this.apply _).tupled

  object Rights extends DbEnumeration {
    val CreateEvent, ConfirmEvent, CreateCategory = Value
  }
}
