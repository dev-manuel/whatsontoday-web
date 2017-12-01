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
    to: Timestamp, creator: User, categories: List[Category], avgRating: Option[Float], location: Location) extends Rateable {
  
}

object EventDetail {
  implicit val eventDetailReads = Json.reads[EventDetail]
  implicit val eventDetailWrites = Json.writes[EventDetail]
  
  val tupled = (this.apply _).tupled
  
  def detailed(q: Query[EventTable, Event, Seq])(implicit ec: ExecutionContext) = {
    val s = q.join(UserTable.user).on(_.creatorId === _.id).join(LocationTable.location).on(_._1.locationId === _.id)
    val t = s.result.flatMap(y => {
      DBIO.sequence(y.map{case ((event,creator),location) => {
        val s = EventTable.event.filter(_.id === event.id).map(_.avgRating)
        val c = for(j <- EventCategoryTable.eventCategory if j.eventID === event.id;
          c <- CategoryTable.category if c.id === j.categoryID) yield c
        
        s.result.zip(c.result).map(o => {
          EventDetail(event.id,event.name,event.from,event.to,creator,o._2.toList,o._1.headOption.flatten,location)
        })
      }})
    })
    t
  }
}

