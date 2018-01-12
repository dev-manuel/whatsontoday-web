package whatson.model

import play.api.libs.json._

case class User(id: Option[Int], loginFk: Int) extends HasCopy[User] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}

object User {
  implicit val userReads = Json.reads[User]

  implicit val userWrites = Json.writes[User]

  val tupled = (this.apply _).tupled
}
