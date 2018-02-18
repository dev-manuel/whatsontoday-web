package whatson.db

import slick.jdbc.PostgresProfile.api._
import slick.lifted.ProvenShape.proveShapeOf
import whatson.model._

class UserTable(tag: Tag) extends Table[User](tag, "users") with HasID[User] {
  def id = column[Int]("id",O.PrimaryKey,O.AutoInc)

  def loginFk = column[Int]("login_fk")

  def avatar = column[Option[String]]("avatar")

  def * = (id.?,loginFk,avatar) <> (User.tupled, User.unapply)

  def login = foreignKey("login", loginFk,LoginTable.login)(_.id)

  def events = ParticipantTable.participant.filter(_.userID === id).flatMap(_.eventFK)
}

object UserTable {
  val user = TableQuery[UserTable]
}
