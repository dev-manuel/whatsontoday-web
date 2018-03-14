package whatson.service

import com.mohiva.play.silhouette.api.services.IdentityService
import com.mohiva.play.silhouette.impl.providers.CommonSocialProfile
import whatson.model._
import com.mohiva.play.silhouette.api.LoginInfo
import scala.concurrent.Future

trait LoginService extends IdentityService[Login] {
   /**
   * Saves a user.
   *
   * @param user The user to save.
   * @return The saved user.
   */
  def save(user: Login): Future[Login]

  /**
    * Saves the social profile for a user.
    *
    * If a user exists for this profile then update the user, otherwise create a new user with the given profile.
    *
    * @param profile The social profile to save.
    * @return The user for whom the profile was saved.
    */
  def save(profile: CommonSocialProfile): Future[Login]

  /**
   * Saves the social profile for a user.
   *
   * If a user exists for this profile then update the user, otherwise create a new user with the given profile.
   *
   * @param profile The social profile to save.
   * @return The user for whom the profile was saved.
   */
  def save(profile: CommonSocialProfile, userType: String): Future[Login]

  def confirm(loginInfo: LoginInfo): Future[Option[Login]]

  def retrieveAll(loginInfo: LoginInfo): Future[Option[Login]]
}
