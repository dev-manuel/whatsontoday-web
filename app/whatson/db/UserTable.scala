package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import whatson.db.ParticipantTable._
import whatson.model._

class UserTable(tag: Tag) extends Table[User](tag, "users") with HasID[User] {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)
  def name = column[String]("name",O.Unique)
  
  def providerId = column[String]("providerId")
  def providerKey = column[String]("providerKey")
  
  def email = column[String]("email")
  
  def events = participant.filter(_.userID === id).flatMap(_.eventFK)

  def * = (id.?,name,email,providerId, providerKey) <> (User.tupled, User.unapply)
}

object UserTable {
  val user = TableQuery[UserTable]
}
