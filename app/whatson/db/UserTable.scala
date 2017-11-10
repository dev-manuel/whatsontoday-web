package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model.User
import slick.lifted.ProvenShape.proveShapeOf
import java.sql.Timestamp
import whatson.db.ParticipantTable._

class UserTable(tag: Tag) extends Table[User](tag, "users") {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)
  
  def pwHash = column[String]("pwhash")
  
  def email = column[String]("email")
  
  def events = participant.filter(_.userID === id).flatMap(_.eventFK)

  def * = (id.?,name,pwHash,email) <> (User.tupled, User.unapply)
}

object UserTable {
  val user = TableQuery[UserTable]
}