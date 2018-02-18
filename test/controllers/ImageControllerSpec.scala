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
import play.api.libs.Files._
import play.api.mvc.MultipartFormData._
import play.api.http.Writeable._
import play.api.mvc.Codec._

class ImageControllerSpec extends RestTestSuite {

  "ImageController GET" should {

    "return NOT_FOUND on non existing image" in {
      val image = route(app, FakeRequest(GET, "/api/v1/images/20000")).get

      status(image) mustBe NOT_FOUND
    }

    "return OK on existing image" in {
      val image = Await.result(createImage(), Duration.Inf)
      val get = route(app, FakeRequest(GET, "/api/v1/images/" ++ image.id.getOrElse(-1).toString)).get

      status(get) mustBe OK
    }
  }


  "ImageController GET bytes" should {

    "return NOT_FOUND on non existing image" in {
      val image = route(app, FakeRequest(GET, "/api/v1/images/bytes/20000")).get

      status(image) mustBe NOT_FOUND
    }

    "return OK on existing image" in {
      val image = Await.result(createImage(), Duration.Inf)
      val get = route(app, FakeRequest(GET, "/api/v1/images/bytes/" ++ image.id.getOrElse(-1).toString)).get

      status(get) mustBe OK
    }
  }

  //TODO: Make this work
  /*"ImageController POST" should {
    "return OK on proper request" in {
      val tempFile = temporaryFileCreator.create(new java.io.File("./res/testImage.jpg").toPath())
      val part = FilePart[TemporaryFile](key = "image", filename = "image", contentType=Some("image/jpg"), ref = tempFile)
      val formData = MultipartFormData(dataParts = Map(), files=Seq(part), badParts = Seq())

      val writeable = writeableOf_MultipartFormData(utf_8, Some("image/jpg"))

      val post = route(app,FakeRequest(POST, "/api/v1/images/testimage", new Headers(List(("Content-Type","multipart/form-data"))),
                                          formData))(writeable).get

      status(post) mustBe OK
    }
  }*/

  "ImageController GET attach" should {

    "return Unauthorized on non existing image" in {
      val user = Await.result(createUser(), Duration.Inf)

      val image = route(app, FakeRequest(GET, "/api/v1/images/attach/20000?entityType=Event&entityId=5",
                                         new Headers(List(("x-auth-token",user._3))),"")).get

      status(image) mustBe UNAUTHORIZED
    }

    "return OK on existing image for Locations" in {
      val image = Await.result(createImage(), Duration.Inf)
      val user = Await.result(createUser(), Duration.Inf)

      val get = route(app, FakeRequest(GET,"/api/v1/images/attach/" ++ image.id.getOrElse(-1).toString ++ "?entityType=Location&entityId=5",
                                       new Headers(List(("x-auth-token",user._3))),
                                       "")).get

      status(get) mustBe OK
    }

    "return Unauthorized for users on events" in {
      val image = Await.result(createImage(), Duration.Inf)
      val user = Await.result(createUser(), Duration.Inf)

      val attach = route(app, FakeRequest(GET, "/api/v1/images/attach/" ++ image.id.getOrElse(-1).toString ++ "?entityType=Event&entityId=5",
                                         new Headers(List(("x-auth-token",user._3))),"")).get

      status(attach) mustBe UNAUTHORIZED
    }

    "return Unauthorized for organizers on events not created by them" in {
      val image = Await.result(createImage(), Duration.Inf)
      val organizer = Await.result(createOrganizer("testorganizer2", "testorganizer2@test.de"), Duration.Inf)
      val event = Await.result(createEvent(), Duration.Inf)

      val attach = route(app, FakeRequest(GET, "/api/v1/images/attach/" ++ image.id.getOrElse(-1).toString ++
                                           "?entityType=Event&entityId=" ++ event.id.getOrElse(-1).toString,
                                         new Headers(List(("x-auth-token",organizer._3))),"")).get

      status(attach) mustBe UNAUTHORIZED
    }

    "return OK for organizers on events created by them" in {
      val image = Await.result(createImage(), Duration.Inf)
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val event = Await.result(createEvent(Some(organizer._2)), Duration.Inf)

      val attach = route(app, FakeRequest(GET, "/api/v1/images/attach/" ++ image.id.getOrElse(-1).toString ++
                                           "?entityType=Event&entityId=" ++ event.id.getOrElse(-1).toString,
                                         new Headers(List(("x-auth-token",organizer._3))),"")).get

      status(attach) mustBe OK
    }

    "return Unauthorized for users on organizers" in {
      val image = Await.result(createImage(), Duration.Inf)
      val user = Await.result(createUser(), Duration.Inf)

      val attach = route(app, FakeRequest(GET, "/api/v1/images/attach/" ++ image.id.getOrElse(-1).toString ++ "?entityType=Organizer&entityId=5",
                                          new Headers(List(("x-auth-token",user._3))),"")).get

      status(attach) mustBe UNAUTHORIZED
    }


    "return Unauthorized for organizers on other organizers" in {
      val image = Await.result(createImage(), Duration.Inf)
      val organizer = Await.result(createOrganizer("testorganizer2", "testorganizer2@test.de"), Duration.Inf)
      val organizer2 = Await.result(createOrganizer(),Duration.Inf)

      val attach = route(app, FakeRequest(GET, "/api/v1/images/attach/" ++ image.id.getOrElse(-1).toString ++
                                           "?entityType=Organizer&entityId=" ++ organizer2._2.id.getOrElse(-1).toString,
                                         new Headers(List(("x-auth-token",organizer._3))),"")).get

      status(attach) mustBe UNAUTHORIZED
    }

    "return OK for organizers on themselfes" in {
      val image = Await.result(createImage(), Duration.Inf)
      val organizer = Await.result(createOrganizer(), Duration.Inf)

      val attach = route(app, FakeRequest(GET, "/api/v1/images/attach/" ++ image.id.getOrElse(-1).toString ++
                                           "?entityType=Organizer&entityId=" ++ organizer._2.id.getOrElse(-1).toString,
                                         new Headers(List(("x-auth-token",organizer._3))),"")).get

      status(attach) mustBe OK
    }
  }
}
