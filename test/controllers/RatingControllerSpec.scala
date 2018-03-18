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

class RatingControllerSpec extends RestTestSuite {
  "RatingController GET" should {
    "return Ok on proper event rating" in {
      val event = Await.result(createEvent(), Duration.Inf)
      val user = Await.result(createUser(), Duration.Inf)

      val post = route(app, FakeRequest(GET, "/api/v1/rating/" ++ event.id.getOrElse(-1).toString ++ "/Event/5.0",
                                        new Headers(List(("Accept", "application/json"),("x-auth-token",user._3))),
                                          "")).get

      status(post) mustBe OK
    }

    "return Ok on proper location rating" in {
      val location = Await.result(createLocation(), Duration.Inf)
      val user = Await.result(createUser(), Duration.Inf)

      val post = route(app, FakeRequest(GET, "/api/v1/rating/" ++ location.id.getOrElse(-1).toString ++ "/Location/5.0",
                                        new Headers(List(("Accept", "application/json"),("x-auth-token",user._3))),
                                        "")).get

      status(post) mustBe OK
    }

    "return Ok on proper organizer rating" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val user = Await.result(createUser(), Duration.Inf)

      val post = route(app, FakeRequest(GET, "/api/v1/rating/" ++ organizer._2.id.getOrElse(-1).toString ++ "/Organizer/5.0",
                                        new Headers(List(("Accept", "application/json"),("x-auth-token",user._3))),
                                        "")).get

      status(post) mustBe OK
    }
  }
}
