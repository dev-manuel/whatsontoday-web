package whatson.model.detail

import scala.concurrent.ExecutionContext

import play.api.libs.json._
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import whatson.model._
import whatson.model.detail._

case class LocationDetail(id: Option[Int], name: String, latitude: Option[Float], longitude: Option[Float],
                          country: String, city: String, street: String,
                          avgRating: Option[Float], images: List[TaggedImage],
                          website: Option[String], phone: Option[String], comment: Option[String], 
                          link: Option[String]) extends Rateable with WithTaggedImages {
  def toLocation = Location(id,name,latitude,longitude,country,city,street,website,phone,comment,link)
}

object LocationDetail {
  implicit val locationDetailReads = Json.reads[LocationDetail]
  implicit val locationDetailWrites = Json.writes[LocationDetail]

  val tupled = (this.apply _).tupled

  implicit class LocationDetailQuery(q: Query[LocationTable, Location, Seq]) {
    def detailed(implicit ec: ExecutionContext) = {
      val t = q.map(x => (x,x.avgRating)).result.flatMap(y => {
        DBIO.sequence(y.map {
          case (location,avg) => {
            val imgTagged = LocationTable.location.filter(_.id === location.id).flatMap(_.taggedImages)
              .result.map(l => l.map(x => TaggedImage(x._2.id,x._1,x._2.copyright)))

            imgTagged.map(o => {
                            LocationDetail(location.id, location.name, location.latitude, location.longitude,
                                           location.country, location.city, location.street, avg, o.toList,
                                           location.website, location.phone, location.comment, location.link)
            })
          }
        })
      })
      t
    }
  }
}
