package whatson.service

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import whatson.db._
import whatson.db.Util._
import whatson.model._
import javax.inject._
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.{ ExecutionContext, Future }
import java.io._
import com.github.tototoshi.csv._
import play.api._
import scala.collection.Map._
import whatson.util.ListUtil._
import java.text.SimpleDateFormat
import java.sql.Timestamp
import whatson.model.detail.EventDetail._
import whatson.model.detail._
import whatson.util.StringUtil._

class EventServiceImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                              (implicit context: ExecutionContext)
    extends EventService with HasDatabaseConfigProvider[JdbcProfile] {

  val log = Logger("api.event")

  val format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss")

  def insertCSV(file: File, organizer: Organizer): Future[List[EventDetail]] = {
    val reader = CSVReader.open(file)
    val events = reader.allWithHeaders()

    events.mapFutureSync { case map =>
      val default = map.map(x => (x._1,Some(x._2))).toMap
      List("Name","From","To","Description", "ShortDescription", "Categories",
           "LocationName","Country","City","Street","PriceMin","PriceMax").map(default.getOrElse(_,None))
        .foldRight(Some(List()) : Option[List[String]]) {
          case (Some(a),Some(b)) => Some(a :: b)
          case _ => None
        } match {
          case Some(l) => {
            val categoryQuery = CategoryTable.category.filter(x => x.name inSetBind (l(5).split(";")))

            val loc = Location(None,l(6),0.0f,0.0f,l(7),l(8),l(9))
            val locationQuery = db.run(LocationTable.location.filter(x => x.country === l(7) && x.city === l(8) && x.street === l(9)).result).map(_.headOption).flatMap {
              case Some(l) => Future.successful(l)
              case None => db.run(insertAndReturn[Location,LocationTable](LocationTable.location,loc))
            }

            db.run(categoryQuery.result).zip(locationQuery).flatMap { case (categories,location) =>
              val event = Event(None, l(0),
                                new Timestamp(format.parse(l(1)).getTime), Some(new Timestamp(format.parse(l(2)).getTime)),
                                l(3), l(4), organizer.id, location.id.getOrElse(-1),
                                l(10).toBigDecimal,l(11).toBigDecimal)
              db.run(insertAndReturn[Event,EventTable](EventTable.event,event)).map(r => (r,categories))
            }.flatMap {
              case (event,categories) => {
                val categoriesAdd = EventCategoryTable.eventCategory ++= categories.map(cat => (cat.id.getOrElse(-1),event.id.getOrElse(-1)))
                val eventDetailed = EventTable.event.filter(_.id === event.id.getOrElse(-1)).detailed
                db.run(categoriesAdd >> eventDetailed).map(List(_))
              }
            }
          }
          case None => Future.successful(List())
        }
    }.map(_.flatten.flatten)
  }
}
