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

class RestTestSuite extends PlaySpec
    with GuiceOneAppPerTest with Injecting with MockitoSugar {

  val mailService = mock[MailService]

  implicit override def newAppForTest(testData: TestData): Application =
    new GuiceApplicationBuilder()
      .overrides(TestModule(mailService))
      .build()


  val log = Logger("api.events")
}
