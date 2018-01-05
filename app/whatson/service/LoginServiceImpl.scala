package whatson.service

import scala.concurrent.{ExecutionContext, Future}

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.impl.providers.CommonSocialProfile
import javax.inject._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import whatson.db.LoginTable._
import whatson.db.Util._
import whatson.model._

class LoginServiceImpl @Inject()(
  protected val dbConfigProvider: DatabaseConfigProvider)(implicit context: ExecutionContext)
    extends LoginService with HasDatabaseConfigProvider[JdbcProfile] {
  /**
   * Retrieves a user that matches the specified login info.
   *
   * @param loginInfo The login info to retrieve a user.
   * @return The retrieved user or None if no user could be retrieved for the given login info.
   */
  def retrieve(loginInfo: LoginInfo): Future[Option[Login]] =
    db.run(login.filter(x => x.providerId === loginInfo.providerID && x.providerKey === loginInfo.providerKey).result).map(_.headOption)


  /**
   * Saves a user.
   *
   * @param user The user to save.
   * @return The saved user.
   */
  def save(l: Login) = db.run(insertAndReturn[Login,LoginTable](LoginTable.login,l))

  /**
   * Saves the social profile for a user.
   *
   * If a user exists for this profile then update the user, otherwise create a new user with the given profile.
   *
   * @param profile The social profile to save.
   * @return The user for whom the profile was saved.
   */
  def save(profile: CommonSocialProfile) = {
    val q = for {
      l <- login if l.providerId === profile.loginInfo.providerID && l.providerKey === profile.loginInfo.providerKey
    } yield l
    val qa = q.map(x => x.email)

    val l = profile.email.getOrElse("")
    val loginInsert = Login(None,profile.email.getOrElse(""),None,None,None,
                 profile.loginInfo.providerID,profile.loginInfo.providerKey)

    db.run(qa.update(l)).flatMap {
      case 0 => db.run(login += loginInsert)
      case i => Future(i)
    }.flatMap(_ => db.run(q.result)).map(_.head)
  }
}
