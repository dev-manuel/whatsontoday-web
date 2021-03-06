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
import whatson.util._

class LoginServiceImpl @Inject()(
  protected val dbConfigProvider: DatabaseConfigProvider,
  applicationConfig: ApplicationConfig)(implicit context: ExecutionContext)
    extends LoginService with HasDatabaseConfigProvider[JdbcProfile] {

  /**
    * Retrieves a user that matches the specified login info.
    *
    * @param loginInfo The login info to retrieve a user.
    * @return The retrieved user or None if no user could be retrieved for the given login info.
    */
  def retrieve(loginInfo: LoginInfo): Future[Option[Login]] = {
    val q = login.filter(x => x.providerId === loginInfo.providerID
                           && lower(x.providerKey) === lower(loginInfo.providerKey)
                           && x.confirmed)
    db.run(q.result).map(_.headOption)
  }

  /**
    * Retrieves a user that matches the specified login info.
    *
    * @param loginInfo The login info to retrieve a user.
    * @return The retrieved user or None if no user could be retrieved for the given login info.
    */
  def retrieveAll(loginInfo: LoginInfo): Future[Option[Login]] = {
    val q = login.filter(x => x.providerId === loginInfo.providerID
                           && lower(x.providerKey) === lower(loginInfo.providerKey))
    db.run(q.result).map(_.headOption)
  }


  def confirm(loginInfo: LoginInfo): Future[Option[Login]] = {
    val q = for {
      l <- login if l.providerId === loginInfo.providerID && lower(l.providerKey) === lower(loginInfo.providerKey)
    } yield l
    val qa = q.map(x => x.confirmed)

    db.run(qa.update(true)).flatMap {
      case 0 => Future(None)
      case i => db.run(q.result).map(x => Some(x.head))
    }
  }


  /**
   * Saves a user.
   *
   * @param user The user to save.
   * @return The saved user.
   */
  def save(l: Login) = db.run(insertAndReturn[Login,LoginTable](LoginTable.login,l.copy(confirmed = l.confirmed || !applicationConfig.confirmationMails)))

  /**
   * Saves the social profile for a user.
   *
   * If a user exists for this profile then update the user, otherwise create a new user with the given profile.
   *
   * @param profile The social profile to save.
   * @return The user for whom the profile was saved.
   */
  def save(profile: CommonSocialProfile, userType: String) = {
    val q = for {
      l <- login if l.providerId === profile.loginInfo.providerID && lower(l.providerKey) === lower(profile.loginInfo.providerKey)
    } yield l
    val qa = q.map(x => x.email)

    val l = profile.email.getOrElse("")
    val loginInsert = Login(None,profile.email.getOrElse(""),None,None,None,
                 profile.loginInfo.providerID,profile.loginInfo.providerKey,true, userType)

    db.run(qa.update(l)).flatMap {
      case 0 => db.run(login += loginInsert)
      case i => Future(i)
    }.flatMap(_ => db.run(q.result)).map(_.head)
  }

  def save(profile: CommonSocialProfile) = this.save(profile, "user")
}
