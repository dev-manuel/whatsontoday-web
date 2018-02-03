package controllers

import org.scalatest._
import play.api._
import play.api.test._
import play.api.test.Helpers._
import whatson.util._
import scala.concurrent._
import scala.concurrent.duration._
import play.api.libs.json._
import play.api.mvc._
import java.sql.Timestamp
import whatson.model._
import whatson.model._

class LoginControllerSpec extends RestTestSuite {

  /*"Authenticatiom POST" should {
    "return OK on proper log in request" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)

      val form = SignInForm(organizer._1.email, "", true)
      val events = route(app, FakeRequest(POST, "/api/v1/login/signIn", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(form))).get

      status(events) mustBe OK
    }

    "return OK on log in request without rememberMe" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)

      val form = SignInForm(organizer._1.email, "", true)
      val events = route(app, FakeRequest(POST, "/api/v1/login/signIn", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(form))).get

      status(events) mustBe OK
    }

    "return Unauthorized on log in request with wrong pw" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)

      val form = SignInForm(organizer._1.email, "wrongpassword", true)
      val events = route(app, FakeRequest(POST, "/api/v1/login/signIn", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(form))).get

      status(events) mustBe UNAUTHORIZED
    }
  }*/

  "LoginController GET" should {
    "return Identity on proper request" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)

      val get = route(app, FakeRequest(GET, "/api/v1/login", new Headers(List(("x-auth-token",organizer._3))),
                                          "")).get

      status(get) mustBe OK
    }

    "return Unauthorized on wrong token" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)

      val events = route(app, FakeRequest(GET, "/api/v1/login", new Headers(List(("x-auth-token",""))),
                                          "")).get

      status(events) mustBe UNAUTHORIZED
    }
  }

  "LoginController GET confirm" should {
    "return Redirect on proper token" in {
      val organizer = Await.result(createOrganizer(confirmed = false), Duration.Inf)

      val get = route(app, FakeRequest(GET, "/api/v1/login/confirm?token=" ++ organizer._3)).get

      status(get) mustBe 303
    }
  }
}
