package controllers

import org.scalatest._
import play.api._
import play.api.test._
import play.api.test.Helpers._
import whatson.util._

class EventControllerSpec extends RestTestSuite {

  "EventController GET" should {

    "return a list of events" in {
      val events = route(app, FakeRequest(GET, "/api/events?sortDir=true")).get

      status(events) mustBe OK
    }
  }
}
