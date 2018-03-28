package whatson.model

import play.api.libs.json._
import com.mohiva.play.silhouette.api.{ Identity, LoginInfo }

case class Login(id: Option[Int], email: String, pwHash: Option[String],
                 pwSalt: Option[String], pwHasher: Option[String],
                 providerID: String, providerKey: String, confirmed: Boolean,
                 roleId: Int, avatar: Option[String]) extends HasCopy[Login] with Identity {
  def cpy(i: Option[Int]) = this.copy(id = i)

  val loginInfo = LoginInfo(providerID,providerKey)
}

object Login {
  implicit val loginReads = Json.reads[Login]

  implicit val loginWrites = Json.writes[Login]

  val tupled = (this.apply _).tupled
}
