package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import java.sql.Timestamp
import whatson.db.ParticipantTable._

class UserTable(tag: Tag) extends Table[(Option[Int],String,String,String)](tag, "users") {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)
  
  def pwHash = column[String]("pwhash")
  
  def email = column[String]("email")
  
  def events = participant.filter(_.userID === id).flatMap(_.eventFK)

  def * = (id.?,name,pwHash,email)
}

object UserTable {
  val user = TableQuery[UserTable]
}