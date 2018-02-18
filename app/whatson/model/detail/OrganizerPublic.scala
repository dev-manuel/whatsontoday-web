package whatson.model.detail

import java.sql.Timestamp
import play.api.libs.json._
import whatson.model._
import whatson.util.DateTime._
import whatson.db.EventTable
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import scala.concurrent.ExecutionContext

case class OrganizerPublic(id: Option[Int], name: String,
                           avgRating: Option[Float], images: List[TaggedImage], avatar: Option[String]) extends Rateable with WithTaggedImages

object OrganizerPublic {
  implicit val organizerPublicReads = Json.reads[OrganizerPublic]
  implicit val organizerPublicWrites = Json.writes[OrganizerPublic]

  val tupled = (this.apply _).tupled

  implicit class OrganizerPublicQuery(q: Query[OrganizerTable, Organizer, Seq]) {
    def public(implicit ec: ExecutionContext) = {
      val t = q.result.flatMap(y => {
        DBIO.sequence(y.map {
          case organizer => {
            val s = OrganizerTable.organizer.filter(_.id === organizer.id).map(_.avgRating)
            val imgs = OrganizerTable.organizer.filter(_.id === organizer.id).flatMap(_.images).map(_.id)
            val imgTagged = OrganizerTable.organizer.filter(_.id === organizer.id).flatMap(_.taggedImages)
              .result.map(l => l.map(x => TaggedImage(x._2.id,x._2.name,x._1)))

            s.result.zip(imgTagged).map(o => {
              OrganizerPublic(organizer.id, organizer.name, o._1.headOption.flatten, o._2.toList, organizer.avatar)
            })
          }
        })
      })
      t
    }
  }
}
