package whatson.model

import play.api.libs.json._

case class AccessToken(token: String, userType: String)

object AccessToken {
  implicit val accessTokenReads = Json.reads[AccessToken]
  implicit val accessTokenyWrites = Json.writes[AccessToken]
}
