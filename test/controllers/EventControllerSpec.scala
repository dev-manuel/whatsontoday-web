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

class EventControllerSpec extends RestTestSuite {

  "EventController GET" should {

    "return a list of events" in {
      val events = route(app, FakeRequest(GET, "/api/v1/events?sortDir=true")).get

      status(events) mustBe OK
    }

    "return NOT_FOUND on non existing event" in {
      val events = route(app, FakeRequest(GET, "/api/v1/events/5")).get

      status(events) mustBe NOT_FOUND
    }

    "return OK on existing event" in {
      val event = Await.result(createEvent(), Duration.Inf)
      val events = route(app, FakeRequest(GET, "/api/v1/events/" ++ event.id.getOrElse(-1).toString)).get

      status(events) mustBe OK
    }
  }

  "EventController POST" should {
    "return OK on proper request" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val location = Await.result(createLocation(), Duration.Inf)

      val event = Event(None, "testevent", new Timestamp(0), new Timestamp(0), organizer._2.id, location.id.getOrElse(-1))
      val events = route(app, FakeRequest(POST, "/api/v1/events", new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(event))).get

      status(events) mustBe OK
    }

    "return BadRequest for users" in {
      val user = Await.result(createUser(), Duration.Inf)
      val location = Await.result(createLocation(), Duration.Inf)

      val event = Event(None, "testevent", new Timestamp(0), new Timestamp(0), user._2.id, location.id.getOrElse(-1))
      val events = route(app, FakeRequest(POST, "/api/v1/events", new Headers(List(("Content-Type","application/json"), ("x-auth-token",user._3))),
                                          Json.toJson(event))).get

      status(events) mustBe UNAUTHORIZED
    }
  }

  "EventController DELETE" should {
    "return OK on proper request" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val event = Await.result(createEvent(organizer._2), Duration.Inf)

      val delete = route(app, FakeRequest(DELETE, "/api/v1/events/" ++ event.id.getOrElse(-1).toString,
                                          new Headers(List(("x-auth-token",organizer._3))),"")).get

      status(delete) mustBe OK
    }

    "return NotFound on non existing event" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val delete = route(app, FakeRequest(DELETE, "/api/v1/events/5",
                                          new Headers(List(("x-auth-token",organizer._3))),"")).get

      status(delete) mustBe NOT_FOUND
    }

    "return BadRequest for users" in {
      val user = Await.result(createUser(), Duration.Inf)
      val event = Await.result(createEvent(), Duration.Inf)

      val delete = route(app, FakeRequest(DELETE, "/api/v1/events/" ++ event.id.getOrElse(-1).toString,
                                          new Headers(List(("Content-Type","application/json"), ("x-auth-token",user._3))),"")).get

      status(delete) mustBe BAD_REQUEST
    }
  }

  "EventController PUT" should {
    "return OK on proper request" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val event = Await.result(createEvent(organizer._2), Duration.Inf)

      val eventUp = event.copy(name = "updated")
      val events = route(app, FakeRequest(PUT, "/api/v1/events/" ++ eventUp.id.getOrElse(-1).toString,
                                          new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(eventUp))).get

      status(events) mustBe OK
    }

    "return NotFound on non existing event" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)

      val eventUp = Event(Some(20000),"testevent", new Timestamp(0), new Timestamp(0), organizer._2.id, 1)
      val events = route(app, FakeRequest(PUT, "/api/v1/events/" ++ eventUp.id.getOrElse(-1).toString,
                                          new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(eventUp))).get

      status(events) mustBe NOT_FOUND
    }

    "return Unauthorized for users" in {
      val user = Await.result(createUser(), Duration.Inf)
      val event = Await.result(createEvent(), Duration.Inf)

      val eventUp = event.copy(name = "updated")
      val events = route(app, FakeRequest(PUT, "/api/v1/events/" ++ eventUp.id.getOrElse(-1).toString,
                                          new Headers(List(("Content-Type","application/json"), ("x-auth-token",user._3))),
                                          Json.toJson(eventUp))).get

      status(events) mustBe UNAUTHORIZED
    }
  }
}
