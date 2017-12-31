package whatson.model.detail

import scala.concurrent.ExecutionContext

import play.api.libs.json._
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import whatson.model._

case class LocationDetail(id: Option[Int], name: String, latitude: Float, longitude: Float,
                       avgRating: Option[Float], images: List[Int]) extends Rateable with WithImages

object LocationDetail {
  implicit val locationDetailReads = Json.reads[LocationDetail]
  implicit val locationDetailWrites = Json.writes[LocationDetail]

  val tupled = (this.apply _).tupled

  implicit class LocationDetailQuery(q: Query[LocationTable, Location, Seq]) {
    def detailed(implicit ec: ExecutionContext) = {
      val t = q.result.flatMap(y => {
        DBIO.sequence(y.map {
          case location => {
            val s = LocationTable.location.filter(_.id === location.id).map(_.avgRating)
            val imgs = LocationTable.location.filter(_.id === location.id).flatMap(_.images).map(_.id)

            s.result.zip(imgs.result).map(o => {
              LocationDetail(location.id, location.name, location.latitude, location.longitude, o._1.headOption.flatten, o._2.toList)
            })
          }
        })
      })
      t
    }
  }
}
