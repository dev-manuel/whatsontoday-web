package whatson.service

import whatson.model._

import scala.concurrent.Future

trait MailService {
  def sendUserConfirmation(userMail: String,
                               confirmationToken: String): Unit

  def sendOrganizerConfirmation(userMail: String,
                               name: String,
                                confirmationToken: String): Unit

  def sendPasswordChangeNotification(userMail: String,
                                     changeToken: String): Unit

  def sendPasswordResetMail(userMail: String,
                            changeToken: String): Unit
}
