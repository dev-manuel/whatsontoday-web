package controllers

import scala.concurrent._
import slick.jdbc.JdbcProfile
import org.scalatestplus.play._
import org.scalatest._
import org.scalatestplus.play.guice._
import play.api.test._
import play.api.test.Helpers._
import whatson.db.EventTable
import javax.inject._
import play.api.db.slick._
import play.api.db._
import whatson.model.Event._
import whatson.model.Event
import whatson.db.EventTable._
import whatson.db.Util._
import java.sql.Timestamp
import java.time.LocalDateTime
import play.api._
import play.api.db.evolutions._
import play.api.inject.guice.GuiceApplicationBuilder
import play.api.inject._
import whatson.service._
import org.scalatest.mockito.MockitoSugar
import play.api.mvc._
import whatson.model.UserSignUpForm._
import whatson.model.UserSignUpForm.Data._
import play.api.libs.json._
import scala.concurrent.ExecutionContext.Implicits.global

class UserControllerSpec extends PlaySpec
    with GuiceOneAppPerTest with Injecting with MockitoSugar {

  //TODO Inject stub mail service
  implicit override def newAppForTest(testData: TestData): Application =
    new GuiceApplicationBuilder()
      .build()


  val log = Logger("api.events")


  "UserController POST" should {

    "send a confirmation email" in {
      val mockDataService = mock[MailService]

      /*val events = route(app, FakeRequest(POST, "/api/user/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass")))).get

      status(events) mustBe OK*/
    }
  }
}
