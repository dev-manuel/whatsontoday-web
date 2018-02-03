package controllers

import org.scalatest._
import play.api._
import play.api.test._
import play.api.test.Helpers._
import whatson.util._
import scala.concurrent._
import scala.concurrent.duration._

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
}
