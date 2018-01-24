package controllers

import org.scalatestplus.play._
import org.scalatest._
import org.scalatestplus.play.guice._
import play.api.test._
import play.api.test.Helpers._
import whatson.db.EventTable
import javax.inject._
import play.api.db.slick.HasDatabaseConfigProvider
import play.api.db.slick.DatabaseConfigProvider
import play.api.db._
import whatson.model.Event._
import whatson.model.Event
import whatson.db.EventTable._
import whatson.db.Util._
import java.sql.Timestamp
import java.time.LocalDateTime
import play.api._
import play.api.db.evolutions._

class HomeControllerSpec extends PlaySpec
    with GuiceOneAppPerTest with Injecting {

  "HomeController GET" should {

    "render the index page" in {
      val index = route(app, FakeRequest(GET, "/")).get

      status(index) mustBe OK
    }
  }
}
