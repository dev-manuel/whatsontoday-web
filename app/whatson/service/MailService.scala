package whatson.service

import whatson.model._

import scala.concurrent.Future

trait MailService {
  def testMail(): Unit
}
