package whatson.service

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import whatson.db._
import whatson.db.Util._
import whatson.model._
import javax.inject._
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.{ ExecutionContext, Future }

class UserServiceImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit context: ExecutionContext)
    extends UserService with HasDatabaseConfigProvider[JdbcProfile] {

  def save(user: User) = db.run(insertAndReturn[User,UserTable](UserTable.user,user))

  def getByLogin(login: Login) = db.run(UserTable.user.filter(_.loginFk === login.id.getOrElse(-1)).result).map(_.headOption)
}
