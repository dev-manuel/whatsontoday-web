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

  def save(login: Login): Future[User] = login.id.map(x => save(User(None,x,None))).getOrElse(Future.never)

  def save(login: Login, avatar: Option[String]): Future[User] = login.id.map(x => save(User(None,x,avatar))).getOrElse(Future.never)

  def getByLogin(login: Login): Future[Option[User]]
}
