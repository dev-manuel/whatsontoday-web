package controllers

import org.scalatest._
import play.api._
import play.api.test._
import play.api.test.Helpers._
import whatson.util._
import scala.concurrent._
import play.api.libs.json._
import play.api.mvc._
import whatson.model._
import scala.concurrent.duration._

class CategoryControllerSpec extends RestTestSuite {

  "CategoryController GET" should {
    "return a list of categories" in {
      createCategory()
      val categories = route(app, FakeRequest(GET, "/api/v1/category")).get

      status(categories) mustBe OK
    }
  }

  "CategoryController POST" should {
    "return OK on proper request from organizer" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val category = Category(None, "testcategory", 1)

      val create = route(app, FakeRequest(POST, "/api/v1/category",
                                          new Headers(List(("Content-Type","application/json"),("x-auth-token",organizer._3))),
                                          Json.toJson(category))).get

      status(create) mustBe OK
    }

    "return Unauthorized on request from user" in {
      val user = Await.result(createUser(), Duration.Inf)
      val category = Category(None, "testcategory", 1)

      val create = route(app, FakeRequest(POST, "/api/v1/category",
                                          new Headers(List(("Content-Type","application/json"),("x-auth-token",user._3))),
                                          Json.toJson(category))).get

      status(create) mustBe UNAUTHORIZED
    }
  }
}
