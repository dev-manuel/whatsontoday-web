package controllers

import org.scalatest._
import play.api._
import play.api.test._
import play.api.test.Helpers._
import whatson.util._
import scala.concurrent._

class HomeControllerSpec extends RestTestSuite {
  "HomeController GET" should {
    "render the index page" in {
      val index = route(app, FakeRequest(GET, "/")).get

      status(index) mustBe OK
    }
  }

  "HomeController GET web" should {
    "render the index page" in {
      val index = route(app, FakeRequest(GET, "/web/login")).get

      status(index) mustBe OK
    }

    "work for nested routes" in {
      val index = route(app, FakeRequest(GET, "/web/event/5")).get

      status(index) mustBe OK
    }
  }
}
