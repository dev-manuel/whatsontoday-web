package controllers

import org.scalatest._
import play.api._
import play.api.libs.json._
import play.api.mvc._
import play.api.test._
import play.api.test.Helpers._
import whatson.model.forms.UserSignUpForm._
import whatson.model.forms.UserSignUpForm.Data._
import whatson.service._
import whatson.util._
import org.mockito._
import org.mockito.Matchers._
import org.mockito.Mockito._
import scala.concurrent._
import scala.concurrent.duration._
import whatson.model.detail._
import whatson.model._

class UserControllerSpec extends RestTestSuite {

  "UserController POST" should {

    "send a confirmation email" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/user/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass")))).get

      status(signUp) mustBe OK

      val captorMail = ArgumentCaptor.forClass(classOf[String])
      val captorToken = ArgumentCaptor.forClass(classOf[String])

      verify(mailService, atLeastOnce()).sendUserConfirmation(captorMail.capture(),captorToken.capture())
    }

    "return OK on correct sign up" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/user/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass")))).get

      status(signUp) mustBe OK
    }


    "not allow the same signUp twice" in {
      val signUp1 = route(app, FakeRequest(POST, "/api/v1/user/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass")))).get

      status(signUp1) mustBe OK

      val signUp2 = route(app, FakeRequest(POST, "/api/v1/user/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass")))).get

      status(signUp2) mustBe BAD_REQUEST
    }

    "not allow short passwords" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/user/signUp", new Headers(List(("Content-Type","application/json"))),
                                           Json.toJson(Data("testuser@test.de","t")))).get

      status(signUp) mustBe BAD_REQUEST
    }

    "not allow wrong emails" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/user/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser","testpass")))).get

      status(signUp) mustBe BAD_REQUEST
    }
  }
}
