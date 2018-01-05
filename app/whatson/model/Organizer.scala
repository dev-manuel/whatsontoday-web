package whatson.model

import play.api.libs.json._

case class Organizer(id: Option[Int], name: String, loginFk: Int) extends HasCopy[Organizer] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}

object Organizer {
  implicit val organizerReads = Json.reads[Organizer]

  implicit val organizerWrites = Json.writes[Organizer]

  val tupled = (this.apply _).tupled
}
