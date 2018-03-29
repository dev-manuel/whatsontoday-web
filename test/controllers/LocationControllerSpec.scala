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
import whatson.model.detail._
import whatson.model.forms._

class LocationControllerSpec extends RestTestSuite {
  "LocationController GET" should {
    "return locations on search" in {
      Await.result(createLocation(), Duration.Inf)

      val get = route(app, FakeRequest(GET, "/api/v1/location?search=testlocation",
                                       new Headers(List(("Accept", "application/json"))),
                                       "")).get

      status(get) mustBe OK
    }

    "return A Location on proper request" in {
      val location = Await.result(createLocation(), Duration.Inf)

      val get = route(app, FakeRequest(GET, "/api/v1/location/" ++ location.id.getOrElse(-1).toString,
                                        new Headers(List(("Accept", "application/json"))),
                                          "")).get

      status(get) mustBe OK
    }

    "return NotFound for non existing location" in {
      val get = route(app, FakeRequest(GET, "/api/v1/location/20000",
                                       new Headers(List(("Accept", "application/json"))),
                                       "")).get

      status(get) mustBe NOT_FOUND
    }

    "return OK for proper get Nearby request" in {
      val location1 = Await.result(createLocation(), Duration.Inf)
      val location2 = Await.result(createLocation(lat = 10.0f, long = 10.0f), Duration.Inf)
      val location3 = Await.result(createLocation(lat = 10.0f, long = -10.0f), Duration.Inf)

      val get = route(app, FakeRequest(GET, "/api/v1/location/nearby/" ++ location1.id.getOrElse(-1).toString,
                                       new Headers(List(("Accept", "application/json"))),
                                       "")).get

      status(get) mustBe OK
      val content = contentAsJson(get).as[List[LocationDetail]]
      content.sortBy(x => x.toLocation.distance(location1)) must equal (content)
    }

    "return NotFound for nearby on non existing location" in {
      val get = route(app, FakeRequest(GET, "/api/v1/location/nearby/20000",
                                       new Headers(List(("Accept", "application/json"))),
                                       "")).get

      status(get) mustBe NOT_FOUND
    }
  }


  "LocationController POST" should {
    "return OK on proper request from user" in {
      val location = LocationForm.Data(None, "testlocation", "testcountry", "testcity", "teststreet")
      val user = Await.result(createUser(), Duration.Inf)

      val create = route(app, FakeRequest(POST, "/api/v1/location",
                                          new Headers(List(("Content-Type","application/json"),("x-auth-token",user._3))),
                                          Json.toJson(location))).get

      status(create) mustBe OK
    }

    "return BAD REQUEST on empty name" in {
      val location = LocationForm.Data(None, "", "testcountry", "testcity", "teststreet")
      val user = Await.result(createUser(), Duration.Inf)

      val create = route(app, FakeRequest(POST, "/api/v1/location",
                                          new Headers(List(("Content-Type","application/json"),("x-auth-token",user._3))),
                                          Json.toJson(location))).get

      status(create) mustBe BAD_REQUEST
    }

    "return BAD REQUEST on empty country" in {
      val location = LocationForm.Data(None, "testname", "", "testcity", "teststreet")
      val user = Await.result(createUser(), Duration.Inf)

      val create = route(app, FakeRequest(POST, "/api/v1/location",
                                          new Headers(List(("Content-Type","application/json"),("x-auth-token",user._3))),
                                          Json.toJson(location))).get

      status(create) mustBe BAD_REQUEST
    }

    "return BAD REQUEST on empty city" in {
      val location = LocationForm.Data(None, "testname", "testcountry", "", "teststreet")
      val user = Await.result(createUser(), Duration.Inf)

      val create = route(app, FakeRequest(POST, "/api/v1/location",
                                          new Headers(List(("Content-Type","application/json"),("x-auth-token",user._3))),
                                          Json.toJson(location))).get

      status(create) mustBe BAD_REQUEST
    }

    "return BAD REQUEST on empty street" in {
      val location = LocationForm.Data(None, "testname", "testcountry", "testcity", "")
      val user = Await.result(createUser(), Duration.Inf)

      val create = route(app, FakeRequest(POST, "/api/v1/location",
                                          new Headers(List(("Content-Type","application/json"),("x-auth-token",user._3))),
                                          Json.toJson(location))).get

      status(create) mustBe BAD_REQUEST
    }
  }
}
