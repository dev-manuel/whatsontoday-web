package controllers

import org.scalatest._
import play.api._
import play.api.libs.json._
import play.api.mvc._
import play.api.test._
import play.api.test.Helpers._
import whatson.model.OrganizerSignUpForm._
import whatson.model.OrganizerSignUpForm.Data._
import whatson.service._
import whatson.util._
import org.mockito._
import org.mockito.Matchers._
import org.mockito.Mockito._

class OrganizerControllerSpec extends RestTestSuite {

  "OrganizerController POST" should {

    "send a confirmation email" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass","testorganizer")))).get

      status(signUp) mustBe OK

      val captorMail = ArgumentCaptor.forClass(classOf[String])
      val captorToken = ArgumentCaptor.forClass(classOf[String])
      val captorName = ArgumentCaptor.forClass(classOf[String])

      verify(mailService, atLeastOnce()).sendOrganizerConfirmation(captorMail.capture(),captorName.capture(),captorToken.capture())

      cleanUpDb()
    }

    "return OK on correct sign up" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass", "testorganizer")))).get

      status(signUp) mustBe OK

      cleanUpDb()
    }


    "not allow the same signUp twice" in {
      val signUp1 = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass","testorganizer")))).get

      status(signUp1) mustBe OK

      val signUp2 = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"))),
                                           Json.toJson(Data("testuser@test.de","testpass", "testorganizer")))).get

      status(signUp2) mustBe BAD_REQUEST

      cleanUpDb()
    }

    "not allow short passwords" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"))),
                                           Json.toJson(Data("testuser@test.de","t","testorganizer")))).get

      status(signUp) mustBe BAD_REQUEST

      cleanUpDb()
    }

    "not allow wrong emails" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser","testpass","testorganizer")))).get

      status(signUp) mustBe BAD_REQUEST

      cleanUpDb()
    }
  }
}
