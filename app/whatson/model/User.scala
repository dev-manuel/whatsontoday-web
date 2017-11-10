package whatson.model

import play.api.libs.json._

case class User(id: Option[Int], name: String, pwHash: String, email: String) {
  
}

object UserH {
  implicit val userReads = Json.reads[User]
  
  //TODO: Hide pwHash when writing
  implicit val userWrites = Json.writes[User]
}