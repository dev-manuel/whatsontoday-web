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
}
