package whatson.model

import java.sql.Timestamp
import play.api.libs.json._
import whatson.util.DateTime._
import slick.jdbc._

case class ParticipantCount(id: Option[Int], eventFk: Int, count: Int) extends HasCopy[ParticipantCount] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}

object ParticipantCount {
  val tupled = (this.apply _).tupled
}
