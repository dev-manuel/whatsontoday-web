package whatson.service

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import whatson.db._
import whatson.db.Util._
import whatson.model._
import javax.inject._
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.{ ExecutionContext, Future }
import play.api.libs.mailer._
import views.html._
import play.api._
import whatson.util._

class MailServiceImpl @Inject()(mailerClient: MailerClient,
                                config: Configuration,
                                applicationConfig: ApplicationConfig)(implicit context: ExecutionContext)
    extends MailService {

  def sendUserConfirmation(userMail: String,
                           confirmationToken: String) = {
    val email = Email(
      "Confirm your email address",
      "Whats On <no-reply@whats-on.today>",
      Seq(userMail),
      bodyHtml = Some(new UserAccountConfirmation(userMail,applicationConfig.url,confirmationToken)().toString())
    )

    if(applicationConfig.confirmationMails)
      mailerClient.send(email)
  }

  def sendOrganizerConfirmation(userMail: String,
                               name: String,
                               confirmationToken: String) = {
    val email = Email(
      "Confirm your email address",
      "Whats On <no-reply@whats-on.today>",
      Seq(userMail),
      bodyHtml = Some(new OrganizerAccountConfirmation(userMail,name,applicationConfig.url,confirmationToken)().toString())
    )

    if(applicationConfig.confirmationMails)
      mailerClient.send(email)
  }

  def sendPasswordChangeNotification(userMail: String,
                           changeToken: String) = {
    val email = Email(
      "Your password has been changed",
      "Whats On <no-reply@whats-on.today>",
      Seq(userMail),
      bodyHtml = Some(new PasswordChangeNotification(userMail,applicationConfig.url,changeToken)().toString())
    )

    mailerClient.send(email)
  }

  def sendPasswordResetMail(userMail: String,
                            changeToken: String) = {
    val email = Email(
      "You requested a password change",
      "Whats On <no-reply@whats-on.today>",
      Seq(userMail),
      bodyHtml = Some(new PasswordResetMail(userMail,applicationConfig.url,changeToken)().toString())
    )

    mailerClient.send(email)
  }
}
