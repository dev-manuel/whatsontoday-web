package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import java.sql.Timestamp
import whatson.db.ParticipantTable._
import whatson.db.EventCategoryTable._
import whatson.db.UserTable._
import whatson.model._
import whatson.db.Util._
import whatson.model.detail._

class EventTable(tag: Tag) extends Table[Event](tag, "event") with HasRatings[Event] {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)
  
  def from = column[Timestamp]("fromtime")
  def to = column[Timestamp]("totime")
  
  def creatorId = column[Option[Int]]("creator_fk")
  
  def locationId = column[Int]("location_fk")
  
  def * = (id.?,name,from,to,creatorId,locationId) <> (Event.tupled, Event.unapply)
  
  def creator = foreignKey("creator",creatorId,user)(_.id.?)
  def location = foreignKey("location",locationId,LocationTable.location)(_.id)
  def participants = participant.filter(_.eventID === id).flatMap(_.participant)
  def categories = eventCategory.filter(_.eventID === id).flatMap(_.categoryFK)
  
  
  val entityType = RatingTable.eventType
}

object EventTable {
  val event = TableQuery[EventTable]
  
  implicit class QuerySort[C[D]](q: Query[EventTable,Event,C]) extends Sortable[Query[EventTable,Event,C],Option[Location]] {
    def sortColumn[U,C[D]](name: String) = name match {
      case "name" => q.sortBy(_.name)
      case "from" => q.sortBy(_.from)
      case "to" => q.sortBy(_.to)
      case _ => q.sortBy(_.id)
    }
    
    override def sortColumn[U,C[D]](name: String, param: Option[Location]) = name match {
      case "name" => q.sortBy(_.name)
      case "from" => q.sortBy(_.from)
      case "to" => q.sortBy(_.to)
      case "location" => {
        val lat = param.map(_.latitude).getOrElse(0.0f)
        val long = param.map(_.longitude).getOrElse(0.0f)
        
        val s = q.join(LocationTable.location).on(_.locationId === _.id)
          .sortBy(x => geoDistance(x._2.latitude,x._2.longitude,lat,long)).map(_._1)
        s
      }
      case _ => q.sortBy(_.id)
    }
    
    val defaultSort = "id"
  }
}