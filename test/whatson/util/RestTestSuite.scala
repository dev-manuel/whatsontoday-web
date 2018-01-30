package whatson.util

import org.scalatest._
import org.scalatest.mockito.MockitoSugar
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api._
import play.api.inject.guice.GuiceApplicationBuilder
import play.api.test._
import whatson.service._
import scala.language.implicitConversions
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.db.evolutions._
import play.api.db._
import org.scalatest._

class RestTestSuite extends PlaySpec
    with GuiceOneAppPerTest with Injecting
    with MockitoSugar with BeforeAndAfterEachTestData {

  val mailService = mock[MailService]

  implicit override def newAppForTest(testData: TestData): Application =
    new GuiceApplicationBuilder()
      .overrides(TestModule(mailService))
      .build()

  def dbConfig(implicit app: Application) = Application.instanceCache[DatabaseConfigProvider].apply(app)

  def db(implicit app: Application) = dbConfig(app).get.db

  def config(implicit app: Application) = Application.instanceCache[Configuration].apply(app)

  def environment(implicit app: Application) = Application.instanceCache[Environment].apply(app)

  def database(implicit app: Application) = Application.instanceCache[DBApi].apply(app).databases()(0)

  def cleanUpDb() {
    Evolutions.cleanupEvolutions(database(app))
  }
}
