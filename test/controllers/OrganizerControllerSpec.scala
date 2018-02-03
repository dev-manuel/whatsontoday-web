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
import scala.concurrent._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._

class OrganizerControllerSpec extends RestTestSuite {

  "OrganizerController GET" should {
    "return OK on existing organizer" in {
      val org = Await.result(createOrganizer("testorganizer", "testuser@test.de"), Duration.Inf)

      val organizer = route(app, FakeRequest(GET, "/api/v1/organizer/" ++ org._2.id.getOrElse(-1).toString)).get

      status(organizer) mustBe OK
    }

    "return NotFound on non existing organizer" in {
      val organizer = route(app, FakeRequest(GET, "/api/v1/organizer/5")).get

      status(organizer) mustBe NOT_FOUND
    }
  }

  "OrganizerController POST" should {

    "send a confirmation email" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass","testorganizer")))).get

      status(signUp) mustBe OK

      val captorMail = ArgumentCaptor.forClass(classOf[String])
      val captorToken = ArgumentCaptor.forClass(classOf[String])
      val captorName = ArgumentCaptor.forClass(classOf[String])

      verify(mailService, atLeastOnce()).sendOrganizerConfirmation(captorMail.capture(),captorName.capture(),captorToken.capture())
    }

    "return OK on correct sign up" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass", "testorganizer")))).get

      status(signUp) mustBe OK
    }


    "not allow the same signUp twice" in {
      val signUp1 = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass","testorganizer")))).get

      status(signUp1) mustBe OK

      val signUp2 = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"))),
                                           Json.toJson(Data("testuser@test.de","testpass", "testorganizer")))).get

      status(signUp2) mustBe BAD_REQUEST
    }

    "not allow short passwords" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"))),
                                           Json.toJson(Data("testuser@test.de","t","testorganizer")))).get

      status(signUp) mustBe BAD_REQUEST
    }

    "not allow wrong emails" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser","testpass","testorganizer")))).get

      status(signUp) mustBe BAD_REQUEST
    }
  }
}
