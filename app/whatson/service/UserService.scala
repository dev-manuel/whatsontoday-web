package whatson.service

import whatson.model._

import scala.concurrent.Future

trait UserService {
  /**
    * Saves a user.
    *
    * @param user The user to save.
    * @return The saved user.
    */
  def save(user: User): Future[User]

  def save(login: Login): Future[User] = login.id.map(x => save(User(None,x))).getOrElse(Future.never)

  def getByLogin(login: Login): Future[Option[User]]
}
