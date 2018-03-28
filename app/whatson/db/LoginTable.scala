package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import whatson.model._

class LoginTable(tag: Tag) extends Table[Login](tag, "login") with HasID[Login] {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)

  def pwSalt = column[String]("pwsalt")
  def pwHash = column[String]("pwhash")
  def pwHasher = column[String]("pwhasher")

  def providerId = column[String]("provider_id")
  def providerKey = column[String]("provider_key")

  def email = column[String]("email")

  def confirmed = column[Boolean]("confirmed")

  def roleId = column[Int]("role_fk")

  def avatar = column[Option[String]]("avatar")

  def * = (id.?,email,pwHash.?, pwSalt.?, pwHasher.? ,providerId, providerKey, confirmed, roleId, avatar) <> (Login.tupled, Login.unapply)

  def events = ParticipantTable.participant.filter(_.loginID === id).flatMap(_.eventFK)
}

object LoginTable {
  val login = TableQuery[LoginTable]
}
