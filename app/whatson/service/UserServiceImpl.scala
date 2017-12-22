package whatson.service

import com.mohiva.play.silhouette.api.{ Identity, LoginInfo }
import scala.concurrent.Future
import whatson.model._
import com.mohiva.play.silhouette.impl.providers.CommonSocialProfile


class UserServiceImpl extends UserService {
  /**
   * Retrieves a user that matches the specified login info.
   *
   * @param loginInfo The login info to retrieve a user.
   * @return The retrieved user or None if no user could be retrieved for the given login info.
   */
  def retrieve(loginInfo: LoginInfo): Future[Option[User]] = Future.never //TODO: Change

  /**
   * Saves a user.
   *
   * @param user The user to save.
   * @return The saved user.
   */
  def save(user: User) = Future.never //TODO: Change

  /**
   * Saves the social profile for a user.
   *
   * If a user exists for this profile then update the user, otherwise create a new user with the given profile.
   *
   * @param profile The social profile to save.
   * @return The user for whom the profile was saved.
   */
  def save(profile: CommonSocialProfile) = Future.never //TODO: Change
}