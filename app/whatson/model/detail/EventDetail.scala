package whatson.model.detail

import java.sql.Timestamp
import play.api.libs.json._
import whatson.model._
import whatson.util.DateTime._
import whatson.db.EventTable
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import scala.concurrent.ExecutionContext

case class EventDetail(id: Option[Int],name: String, from: Timestamp, 
    to: Timestamp, creator: User, categories: List[Category], avgRating: Option[Float]) extends Rateable {
  
}

object EventDetail {
  implicit val eventDetailReads = Json.reads[EventDetail]
  implicit val eventDetailWrites = Json.writes[EventDetail]
  
  val tupled = (this.apply _).tupled
  
  def detailed(q: Query[EventTable, Event, Seq])(implicit ec: ExecutionContext) = {
    val s = q.join(UserTable.user).on(_.creatorId === _.id)
    val t = s.result.flatMap(y => {
      DBIO.sequence(y.map(x => {
        val s = EventTable.event.filter(_.id === x._1.id).map(_.avgRating)
        val c = for(j <- EventCategoryTable.eventCategory if j.eventID === x._1.id;
          c <- CategoryTable.category if c.id === j.categoryID) yield c
        
        s.result.zip(c.result).map(o => {
          EventDetail(x._1.id,x._1.name,x._1.from,x._1.to,x._2,o._2.toList,o._1.headOption.flatten)
        })
      }))
    })
    t
  }
}

