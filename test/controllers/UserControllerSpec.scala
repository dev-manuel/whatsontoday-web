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
                                          Json.toJson(Data("testuser@test.de","testpass", "testpass", true)))).get

      status(signUp) mustBe OK

      val captorMail = ArgumentCaptor.forClass(classOf[String])
      val captorToken = ArgumentCaptor.forClass(classOf[String])

      verify(mailService, atLeastOnce()).sendUserConfirmation(captorMail.capture(),captorToken.capture())
    }

    "return OK on correct sign up" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/user/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass", "testpass", true)))).get

      status(signUp) mustBe OK
    }


    "not allow the same signUp twice" in {
      val signUp1 = route(app, FakeRequest(POST, "/api/v1/user/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass", "testpass", true)))).get

      status(signUp1) mustBe OK

      val signUp2 = route(app, FakeRequest(POST, "/api/v1/user/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser@test.de","testpass", "testpass", true)))).get

      status(signUp2) mustBe BAD_REQUEST
    }

    "not allow short passwords" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/user/signUp", new Headers(List(("Content-Type","application/json"))),
                                           Json.toJson(Data("testuser@test.de","t", "testpass", true)))).get

      status(signUp) mustBe BAD_REQUEST
    }

    "not allow wrong emails" in {
      val signUp = route(app, FakeRequest(POST, "/api/v1/user/signUp", new Headers(List(("Content-Type","application/json"))),
                                          Json.toJson(Data("testuser","testpass", "testpass", true)))).get

      status(signUp) mustBe BAD_REQUEST
    }
  }

  "UserController GET participating" should {
    "return Ok for users" in {
      val user = Await.result(createUser(),Duration.Inf)

      val get = route(app, FakeRequest(GET, "/api/v1/user/participating",
                                       new Headers(List(("x-auth-token",user._3))),"")).get

      status(get) mustBe OK
    }

    "return Unauthorized for organizers" in {
      val organizer = Await.result(createOrganizer(),Duration.Inf)

      val get = route(app, FakeRequest(GET, "/api/v1/user/participating",
                                       new Headers(List(("x-auth-token",organizer._3))),"")).get

      status(get) mustBe UNAUTHORIZED
    }

    "return an empty list for new users" in {
      Await.result(createEvent(),Duration.Inf)
      val user = Await.result(createUser(),Duration.Inf)

      val get = route(app, FakeRequest(GET, "/api/v1/user/participating",
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

      val get = route(app, FakeRequest(GET, "/api/v1/user/participating",
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

      val get1 = route(app, FakeRequest(GET, "/api/v1/user/participating",
                                        new Headers(List(("x-auth-token",user._3),("x-page","0"),("x-page-size","2"))),"")).get

      val get2 = route(app, FakeRequest(GET, "/api/v1/user/participating",
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
