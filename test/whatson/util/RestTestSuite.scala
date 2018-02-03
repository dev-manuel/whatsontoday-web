package whatson.util

import slick.jdbc.JdbcProfile
import org.scalatest._
import org.scalatest.mockito.MockitoSugar
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api._
import play.api.inject.guice.GuiceApplicationBuilder
import play.api.test._
import whatson.service._
import scala.language.implicitConversions
import play.api.db.slick.{DatabaseConfigProvider}
import play.api.db.evolutions._
import play.api.db._
import org.scalatest._
import whatson.model._
import whatson.db._
import whatson.db.Util._
import scala.concurrent._
import scala.concurrent.ExecutionContext
import scala.concurrent.ExecutionContext.Implicits.global

class RestTestSuite extends PlaySpec
    with GuiceOneAppPerTest with Injecting
    with MockitoSugar with BeforeAndAfterEachTestData {

  val mailService = mock[MailService]

  implicit override def newAppForTest(testData: TestData): Application =
    new GuiceApplicationBuilder()
      .overrides(TestModule(mailService))
      .build()

  def dbConfig(implicit app: Application) = Application.instanceCache[DatabaseConfigProvider].apply(app)

  def db = dbConfig(app).get[JdbcProfile].db

  def config(implicit app: Application) = Application.instanceCache[Configuration].apply(app)

  def environment(implicit app: Application) = Application.instanceCache[Environment].apply(app)

  def database(implicit app: Application) = Application.instanceCache[DBApi].apply(app).databases()(0)

  def cleanUpDb() {
    Evolutions.cleanupEvolutions(database(app))
  }

  def createLogin(mail: String): Future[Login] = {
    db.run(insertAndReturn[Login,LoginTable](LoginTable.login,Login(None, mail, None, None, None, "", mail, true)))
  }

  def createOrganizer(name: String, mail: String): Future[Organizer] = {
    createLogin(mail).flatMap { case login =>
      db.run(insertAndReturn[Organizer,OrganizerTable](OrganizerTable.organizer,Organizer(None, name, login.id.getOrElse(-1), None)))
    }
  }
}
