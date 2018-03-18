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
import whatson.model.forms._
import org.mockito._
import org.mockito.Matchers._
import org.mockito.Mockito._
import whatson.db._
import slick.jdbc.PostgresProfile.api._
import whatson.model.detail._


class LoginControllerSpec extends RestTestSuite {
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

  "LoginController PUT" should {
    "set the password for organizers and send a mail notification" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)

      val passwordForm = LoginUpdateForm.Data("updatedPassword")
      val reset = route(app, FakeRequest(PUT, "/api/v1/login", new Headers(List(("x-auth-token", organizer._3))),
                                       Json.toJson(passwordForm))).get

      status(reset) mustBe OK

      val captorMail = ArgumentCaptor.forClass(classOf[String])
      val captorToken = ArgumentCaptor.forClass(classOf[String])

      verify(mailService, atLeastOnce()).sendPasswordChangeNotification(captorMail.capture(),captorToken.capture())
    }

    "set the password for users and send a mail notification" in {
      val user = Await.result(createUser(), Duration.Inf)

      val passwordForm = LoginUpdateForm.Data("updatedPassword")
      val reset = route(app, FakeRequest(PUT, "/api/v1/login", new Headers(List(("x-auth-token", user._3))),
                                         Json.toJson(passwordForm))).get

      status(reset) mustBe OK

      val captorMail = ArgumentCaptor.forClass(classOf[String])
      val captorToken = ArgumentCaptor.forClass(classOf[String])

      verify(mailService, atLeastOnce()).sendPasswordChangeNotification(captorMail.capture(),captorToken.capture())
    }

    "return BadRequest for too short passwords" in {
      val user = Await.result(createUser(), Duration.Inf)

      val passwordForm = LoginUpdateForm.Data("short")
      val reset = route(app, FakeRequest(PUT, "/api/v1/login", new Headers(List(("x-auth-token", user._3))),
                                         Json.toJson(passwordForm))).get

      status(reset) mustBe BAD_REQUEST
    }
  }

  "LoginController PUT resetPassword" should {
    "send a password reset mail for organizers" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)

      val resetForm = PasswordResetForm.Data(organizer._1.email)
      val reset = route(app, FakeRequest(PUT, "/api/v1/login/resetPassword", new Headers(List()),
                                       Json.toJson(resetForm))).get

      status(reset) mustBe OK

      val captorMail = ArgumentCaptor.forClass(classOf[String])
      val captorToken = ArgumentCaptor.forClass(classOf[String])

      verify(mailService, atLeastOnce()).sendPasswordResetMail(captorMail.capture(),captorToken.capture())
    }

    "send a password reset mail for users" in {
      val user = Await.result(createUser(), Duration.Inf)

      val resetForm = PasswordResetForm.Data(user._1.email)
      val reset = route(app, FakeRequest(PUT, "/api/v1/login/resetPassword", new Headers(List()),
                                         Json.toJson(resetForm))).get

      status(reset) mustBe OK

      val captorMail = ArgumentCaptor.forClass(classOf[String])
      val captorToken = ArgumentCaptor.forClass(classOf[String])

      verify(mailService, atLeastOnce()).sendPasswordResetMail(captorMail.capture(),captorToken.capture())
    }

    "return BadRequest for non existent user" in {
      val resetForm = PasswordResetForm.Data("nonexistentuser@test.de")
      val reset = route(app, FakeRequest(PUT, "/api/v1/login/resetPassword", new Headers(List()),
                                         Json.toJson(resetForm))).get

      status(reset) mustBe BAD_REQUEST
    }

    "return BadRequest for wrong email format" in {
      val resetForm = PasswordResetForm.Data("notanemail")
      val reset = route(app, FakeRequest(PUT, "/api/v1/login/resetPassword", new Headers(List()),
                                         Json.toJson(resetForm))).get

      status(reset) mustBe BAD_REQUEST
    }
  }

  "LoginController DELETE" should {
    "delete the currently logged in user" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)

      val delete = route(app, FakeRequest(DELETE, "/api/v1/login", new Headers(List(("x-auth-token", organizer._3))),
                                          "")).get

      status(delete) mustBe OK

      Await.result(db.run(LoginTable.login.filter(x => x.email === organizer._1.email).result), Duration.Inf) mustBe List().seq
    }

    "invalidate access tokens" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)

      val delete = route(app, FakeRequest(DELETE, "/api/v1/login", new Headers(List(("x-auth-token", organizer._3))),
                                          "")).get

      Thread.sleep(1000)
      val get = route(app, FakeRequest(GET, "/api/v1/login", new Headers(List(("x-auth-token", organizer._3))),
                                       "")).get

      status(get) mustBe UNAUTHORIZED
    }
  }

  "LoginController GET participating" should {
    "return Ok for users" in {
      val user = Await.result(createUser(),Duration.Inf)

      val get = route(app, FakeRequest(GET, "/api/v1/login/participating",
                                       new Headers(List(("x-auth-token",user._3))),"")).get

      status(get) mustBe OK
    }

    "return an empty list for new users" in {
      Await.result(createEvent(),Duration.Inf)
      val user = Await.result(createUser(),Duration.Inf)

      val get = route(app, FakeRequest(GET, "/api/v1/login/participating",
                                       new Headers(List(("x-auth-token",user._3))),"")).get

      status(get) mustBe OK
      val content = contentAsJson(get).as[List[EventDetail]]
      content.length mustBe 0
    }

    "contain an event after participating" in {
      val event = Await.result(createEvent(),Duration.Inf)
      val user = Await.result(createUser(),Duration.Inf)

      val participate = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event.id.getOrElse(-1).toString,
                                               new Headers(List(("x-auth-token",user._3))),"")).get

      Thread.sleep(1000)

      val get = route(app, FakeRequest(GET, "/api/v1/login/participating",
                                       new Headers(List(("x-auth-token",user._3))),"")).get

      status(get) mustBe OK
      val content = contentAsJson(get).as[List[EventDetail]]
      content.map(x => x.id) must contain (event.id)
    }

    "be pageable" in {
      val event1 = Await.result(createEvent(),Duration.Inf)
      val event2 = Await.result(createEvent(),Duration.Inf)
      val event3 = Await.result(createEvent(),Duration.Inf)
      val user = Await.result(createUser(),Duration.Inf)

      def participate(event: Event) = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event.id.getOrElse(-1).toString,
                                               new Headers(List(("x-auth-token",user._3))),"")).get

      participate(event1)
      participate(event2)
      participate(event3)
      Thread.sleep(1000)

      val get1 = route(app, FakeRequest(GET, "/api/v1/login/participating",
                                        new Headers(List(("x-auth-token",user._3),("x-page","0"),("x-page-size","2"))),"")).get

      val get2 = route(app, FakeRequest(GET, "/api/v1/login/participating",
                                        new Headers(List(("x-auth-token",user._3),("x-page","1"),("x-page-size","2"))),"")).get

      status(get1) mustBe OK
      status(get2) mustBe OK
      val content1 = contentAsJson(get1).as[List[EventDetail]]
      val content2 = contentAsJson(get2).as[List[EventDetail]]
      content1.length mustBe 2
      content2.length mustBe 1
    }
  }
}
