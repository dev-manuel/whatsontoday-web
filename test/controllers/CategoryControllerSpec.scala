package controllers

import org.scalatest._
import play.api._
import play.api.test._
import play.api.test.Helpers._
import whatson.util._
import scala.concurrent._

class CategoryControllerSpec extends RestTestSuite {

  "CategoryController GET" should {

    "return a list of categories" in {
      val categories = route(app, FakeRequest(GET, "/api/v1/categories")).get

      status(categories) mustBe OK
    }
  }
}
