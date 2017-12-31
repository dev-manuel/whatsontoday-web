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
                       to: Timestamp, creator: User, categories: List[Category],
                       avgRating: Option[Float], location: Location,
                       images: List[ImageDetail]) extends Rateable with WithImages {

}

object EventDetail {
  implicit val eventDetailReads = Json.reads[EventDetail]
  implicit val eventDetailWrites = Json.writes[EventDetail]

  val tupled = (this.apply _).tupled

  implicit class EventDetailQuery(q: Query[EventTable, Event, Seq]) {
    def detailed(implicit ec: ExecutionContext) = {
      val s = q.join(UserTable.user).on(_.creatorId === _.id).join(LocationTable.location).on(_._1.locationId === _.id)
      val t = s.result.flatMap(y => {
        DBIO.sequence(y.map {
          case ((event, creator), location) => {
            val s = EventTable.event.filter(_.id === event.id).map(_.avgRating)
            val imgs = EventTable.event.filter(_.id === event.id).flatMap(_.images).map(_.id)
            val c = for (
              j <- EventCategoryTable.eventCategory if j.eventID === event.id;
              c <- CategoryTable.category if c.id === j.categoryID
            ) yield c

            s.result.zip(c.result).zip(imgs.result).map(o => {
              EventDetail(event.id, event.name, event.from, event.to, creator, o._1._2.toList, o._1._1.headOption.flatten, location, o._2.map(x => ImageDetail(x)).toList)
            })
          }
        })
      })
      t
    }
  }
}

