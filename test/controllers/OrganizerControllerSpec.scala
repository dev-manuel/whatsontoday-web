package controllers

import org.scalatest._
import play.api._
import play.api.libs.json._
import play.api.mvc._
import play.api.test._
import play.api.test.Helpers._
import whatson.model.forms.OrganizerSignUpForm._
import whatson.model.forms.OrganizerSignUpForm.Data._
import whatson.service._
import whatson.util._
import org.mockito._
import org.mockito.Matchers._
import org.mockito.Mockito._
import scala.concurrent._
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._
import whatson.model.detail._

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
      val org = Await.result(createOrganizer("testorganizer2", "testuser2@test.de"), Duration.Inf)
      
      val signUp = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"),"x-auth-token"->org._3)),
                                          Json.toJson(Data("testuser@test.de","testpass","testorganizer", "testpass", true)))).get

      status(signUp) mustBe OK

      val captorMail = ArgumentCaptor.forClass(classOf[String])
      val captorToken = ArgumentCaptor.forClass(classOf[String])
      val captorName = ArgumentCaptor.forClass(classOf[String])

      verify(mailService, atLeastOnce()).sendOrganizerConfirmation(captorMail.capture(),captorName.capture(),captorToken.capture())
    }

    "return OK on correct sign up" in {
      val org = Await.result(createOrganizer("testorganizer2", "testuser2@test.de"), Duration.Inf)
      
      val signUp = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"),"x-auth-token"->org._3)),
                                          Json.toJson(Data("testuser@test.de","testpass", "testorganizer", "testpass", true)))).get

      status(signUp) mustBe OK
    }


    "not allow the same signUp twice" in {
      val org = Await.result(createOrganizer("testorganizer2", "testuser2@test.de"), Duration.Inf)
      
      val signUp1 = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"),"x-auth-token"->org._3)),
                                          Json.toJson(Data("testuser@test.de","testpass","testorganizer", "testpass", true)))).get

      status(signUp1) mustBe OK

      val signUp2 = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"),"x-auth-token"->org._3)),
                                           Json.toJson(Data("testuser@test.de","testpass", "testorganizer", "testpass", true)))).get

      status(signUp2) mustBe BAD_REQUEST
    }

    "not allow short passwords" in {
      val org = Await.result(createOrganizer("testorganizer2", "testuser2@test.de"), Duration.Inf)
      
      val signUp = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"),"x-auth-token"->org._3)),
                                           Json.toJson(Data("testuser@test.de","t","testorganizer", "testpass", true)))).get

      status(signUp) mustBe BAD_REQUEST
    }

    "not allow wrong emails" in {
      val org = Await.result(createOrganizer("testorganizer2", "testuser2@test.de"), Duration.Inf)
      
      val signUp = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"),"x-auth-token"->org._3)),
                                          Json.toJson(Data("testuser","testpass","testorganizer", "testpass", true)))).get

      status(signUp) mustBe BAD_REQUEST
    }
    
    "return unauthorized for users" in {
      val user = Await.result(createUser("testuser2@test.de"), Duration.Inf)
      
      val signUp = route(app, FakeRequest(POST, "/api/v1/organizer/signUp", new Headers(List(("Content-Type","application/json"),"x-auth-token"->user._3)),
                                          Json.toJson(Data("testuser@test.de","testpass", "testorganizer", "testpass", true)))).get

      status(signUp) mustBe UNAUTHORIZED
    }
  }

  /*"OrganizerController GET events" should {
    "return OK on existing organizer" in {
      val org = Await.result(createOrganizer("testorganizer", "testuser@test.de"), Duration.Inf)

      val organizer = route(app, FakeRequest(GET, "/api/v1/organizer/events/" ++ org._2.id.getOrElse(-1).toString + "?sortDir=true&sort=id")).get

      status(organizer) mustBe OK
    }

    "return an empty list for non existing organizer" in {
      Await.result(createEvent(), Duration.Inf)

      val events = route(app, FakeRequest(GET, "/api/v1/organizer/events/20000?sortDir=true&sort=id")).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[List[EventDetail]]
      content mustEqual List()
    }

    "return a list of events of the organizer" in {
      val org = Await.result(createOrganizer("testorganizer", "testuser@test.de"), Duration.Inf)
      val event1 = Await.result(createEvent(Some(org._1)), Duration.Inf)
      val event2 = Await.result(createEvent(Some(org._1)), Duration.Inf)

      val events = route(app, FakeRequest(GET, "/api/v1/organizer/events/" ++ org._2.id.getOrElse(-1).toString + "?sortDir=true&sort=id")).get

      status(events) mustBe OK

      val content = contentAsJson(events).as[List[EventDetail]]
      content.map(_.id) must contain (event1.id)
      content.map(_.id) must contain (event2.id)
    }

    "return only events of that organizer" in {
      val org1 = Await.result(createOrganizer("testorganizer", "testuser@test.de"), Duration.Inf)
      val org2 = Await.result(createOrganizer("testorganizer2", "testuser2@test.de"), Duration.Inf)
      val event1 = Await.result(createEvent(Some(org1._1)), Duration.Inf)
      val event2 = Await.result(createEvent(Some(org1._1)), Duration.Inf)
      val event3 = Await.result(createEvent(Some(org2._1)), Duration.Inf)

      val events = route(app, FakeRequest(GET, "/api/v1/organizer/events/" ++ org1._2.id.getOrElse(-1).toString + "?sortDir=true&sort=id")).get

      status(events) mustBe OK

      val content = contentAsJson(events).as[List[EventDetail]]
      content.filter(_.creatorId == org1._2.id) mustEqual content
    }

    "be pageable" in {
      val org = Await.result(createOrganizer("testorganizer", "testuser@test.de"), Duration.Inf)
      val event1 = Await.result(createEvent(Some(org._1)), Duration.Inf)
      val event2 = Await.result(createEvent(Some(org._1)), Duration.Inf)
      val event3 = Await.result(createEvent(Some(org._1)), Duration.Inf)

      val events1 = route(app, FakeRequest(GET, "/api/v1/organizer/events/" ++ org._2.id.getOrElse(-1).toString + "?sortDir=true&sort=id",
                                           new Headers(List(("X-Page-Size","2"),("X-Page","0"))),"")).get
      val events2 = route(app, FakeRequest(GET, "/api/v1/organizer/events/" ++ org._2.id.getOrElse(-1).toString + "?sortDir=true&sort=id",
                                           new Headers(List(("X-Page-Size","2"),("X-Page","1"))),"")).get

      status(events1) mustBe OK
      status(events2) mustBe OK

      val content1 = contentAsJson(events1).as[List[EventDetail]]
      content1.length mustEqual 2
      val content2 = contentAsJson(events2).as[List[EventDetail]]
      content2.length mustEqual 1
    }
  }*/
}
