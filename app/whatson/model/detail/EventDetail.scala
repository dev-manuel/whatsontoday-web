package whatson.model.detail

import java.sql.Timestamp
import play.api.libs.json._
import whatson.model._
import whatson.util.DateTime._
import whatson.db.EventTable
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import scala.concurrent.ExecutionContext

case class EventDetail(id: Option[Int], name: String, from: Timestamp,
                       to: Timestamp, description: String, creatorId: Option[Int],
                       categories: List[Category],
                       avgRating: Option[Float], location: Location,
                       images: List[TaggedImage], participantCount: Int) extends Rateable with WithTaggedImages

object EventDetail {
  implicit val eventDetailReads = Json.reads[EventDetail]
  implicit val eventDetailWrites = Json.writes[EventDetail]

  val tupled = (this.apply _).tupled

  implicit class EventDetailQuery(q: Query[EventTable, Event, Seq]) {
    def detailed(implicit ec: ExecutionContext) = {
      val s = q.map(x => (x,x.participants.length,x.avgRating))
        .join(LocationTable.location).on(_._1.locationId === _.id)
      val t = s.result.flatMap(y => {
        DBIO.sequence(y.map {
          case ((event,pCount,r), location) => {
            val taggedImgs = EventTable.event.filter(_.id === event.id).flatMap(_.taggedImages).result.map(l => l.map(x => TaggedImage(x._2.id,x._1)))

            val c = for (
              j <- EventCategoryTable.eventCategory if j.eventID === event.id;
              c <- CategoryTable.category if c.id === j.categoryID
            ) yield c

            c.result.zip(taggedImgs).map(o => {
              EventDetail(event.id, event.name, event.from, event.to, event.description, event.creatorId,
                          o._1.toList, r,location, o._2.toList, pCount)
            })
          }
        })
      })
      t
    }
  }
}
