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

class MailServiceImpl @Inject()(mailerClient: MailerClient,
                                config: Configuration)(implicit context: ExecutionContext)
    extends MailService {

  val url = config.underlying.getString("application.url")

  def sendUserConfirmation(userMail: String,
                           confirmationToken: String) = {
    val email = Email(
      "Confirm your email address",
      "Whats On <no-reply@whats-on.today>",
      Seq(userMail),
      bodyHtml = Some(new UserAccountConfirmation(userMail,url,confirmationToken)().toString())
    )
    mailerClient.send(email)
  }

  def sendOrganizerConfirmation(userMail: String,
                               name: String,
                               confirmationToken: String) = {
    val email = Email(
      "Confirm your email address",
      "Whats On <no-reply@whats-on.today>",
      Seq(userMail),
      bodyHtml = Some(new OrganizerAccountConfirmation(userMail,name,url,confirmationToken)().toString())
    )
    mailerClient.send(email)
  }
}
