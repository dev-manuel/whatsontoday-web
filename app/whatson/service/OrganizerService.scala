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

  def save(login: Login, name: String): Future[Organizer] = save(Organizer(None,name,None)) //TODO

  def save(login: Login, name: String, avatar: Option[String]): Future[Organizer] = save(Organizer(None,name,avatar)) //TODO
}
