package whatson.service

import whatson.model._

import scala.concurrent.Future

trait OrganizerService {
  /**
    * Saves a user.
    *
    * @param user The user to save.
    * @return The saved user.
    */
  def save(user: Organizer): Future[Organizer]

  def save(login: Login, name: String): Future[Organizer] = login.id.map(x => save(Organizer(None,name,x))).getOrElse(Future.never)

  def getByLogin(login: Login): Future[Option[Organizer]]
}
