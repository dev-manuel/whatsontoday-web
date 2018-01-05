package whatson.service

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import whatson.db._
import whatson.db.Util._
import whatson.model._
import javax.inject._

class UserServiceImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
    extends UserService with HasDatabaseConfigProvider[JdbcProfile] {

  def save(user: User) = db.run(insertAndReturn[User,UserTable](UserTable.user,user))
}
