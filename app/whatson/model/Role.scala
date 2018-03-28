package whatson.model

import java.sql.Timestamp
import play.api.libs.json._
import whatson.util.DateTime._
import slick.jdbc._

case class Role(id: Option[Int], name: String) extends HasCopy[Role] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}

object Role {
  implicit val roleReads = Json.reads[Role]
  implicit val roleWrites = Json.writes[Role]

  val tupled = (this.apply _).tupled

  val DEFAULT = "DEFAULT"
  val Admin = "Admin"
  val OrganizerAdmin = "OrganizerAdmin"
}
