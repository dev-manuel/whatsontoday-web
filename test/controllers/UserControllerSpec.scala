package controllers

import org.scalatest._
import play.api._
import play.api.libs.json._
import play.api.mvc._
import play.api.test._
import play.api.test.Helpers._
import whatson.model.UserSignUpForm._
import whatson.model.UserSignUpForm.Data._
import whatson.service._
import whatson.util._

class UserControllerSpec extends RestTestSuite {

  "UserController POST" should {

    "send a confirmation email" in {
      val mockDataService = mock[MailServiceImpl]

      val signUp = route(app, FakeRequest(POST, "/api/user/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass")))).get

      status(signUp) mustBe OK
    }
  }
}
