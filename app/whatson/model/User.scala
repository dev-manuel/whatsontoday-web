package whatson.model

import play.api.libs.json._

case class User(id: Option[Int], name: String, pwHash: String, email: String) extends HasCopy[User] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}

object User {
  implicit val userReads = Json.reads[User]
  
  //TODO: Hide pwHash when writing
  implicit val userWrites = Json.writes[User]
  
  val tupled = (this.apply _).tupled
}