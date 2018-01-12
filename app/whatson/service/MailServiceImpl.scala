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

class MailServiceImpl @Inject()(mailerClient: MailerClient)(implicit context: ExecutionContext)
    extends MailService {

  def testMail() = {
    val email = Email(
      "Simple email",
      "Whats On <no-reply@whats-on.today>",
      Seq(""),
      // sends text, HTML or both...
      bodyText = Some("A text message"),
      bodyHtml = Some(new UserAccountConfirmation("yay")().toString())
    )
    mailerClient.send(email)
  }
}
