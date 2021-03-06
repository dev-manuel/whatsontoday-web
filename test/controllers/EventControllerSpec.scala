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
import whatson.model.forms._
import whatson.model.detail._

class EventControllerSpec extends RestTestSuite {

  "EventController GET" should {
    "return a list of events" in {
      val event = Await.result(createEvent(from = new Timestamp(4000,0,0,0,0,0,0)), Duration.Inf)

      val events = route(app, FakeRequest(GET, "/api/v1/events?sortDir=true")).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[List[EventDetail]]
    }

    "sort by name if sort=name" in {
      Await.result(createEvent(), Duration.Inf)
      Await.result(createEvent(name = "name2"), Duration.Inf)
      Await.result(createEvent(name = "name3"), Duration.Inf)
      Await.result(createEvent(name = "anametoo"), Duration.Inf)
      Await.result(createEvent(name = "bnametoo"), Duration.Inf)

      val events = route(app, FakeRequest(GET, "/api/v1/events?sortDir=true&sort=name")).get

      status(events) mustBe OK

      val content = contentAsJson(events).as[List[EventDetail]]
    }

    "sort by beginning date if sort=from" in {
      Await.result(createEvent(from = new Timestamp(4000,1,0,0,0,0,0)), Duration.Inf)
      Await.result(createEvent(from = new Timestamp(4000,2,0,0,0,0,0)), Duration.Inf)
      Await.result(createEvent(from = new Timestamp(4000,10,0,0,0,0,0)), Duration.Inf)
      Await.result(createEvent(from = new Timestamp(4000,6,0,0,0,0,0)), Duration.Inf)
      Await.result(createEvent(from = new Timestamp(4000,7,0,0,0,0,0)), Duration.Inf)

      val events = route(app, FakeRequest(GET, "/api/v1/events?sortDir=true&sort=from")).get

      status(events) mustBe OK

      val content = contentAsJson(events).as[List[EventDetail]]
      content.sortBy(x => x.from.getTime()) mustEqual content
    }

    "sort by end date if sort=to" in {
      Await.result(createEvent(to = Some(new Timestamp(4000,1,0,0,0,0,0))), Duration.Inf)
      Await.result(createEvent(to = Some(new Timestamp(4000,2,0,0,0,0,0))), Duration.Inf)
      Await.result(createEvent(to = Some(new Timestamp(4000,10,0,0,0,0,0))), Duration.Inf)
      Await.result(createEvent(to = Some(new Timestamp(4000,6,0,0,0,0,0))), Duration.Inf)
      Await.result(createEvent(to = Some(new Timestamp(4000,7,0,0,0,0,0))), Duration.Inf)


      val events = route(app, FakeRequest(GET, "/api/v1/events?sortDir=true&sort=to")).get

      status(events) mustBe OK

      val content = contentAsJson(events).as[List[EventDetail]]
      content.sortBy(x => x.to.getOrElse(new Timestamp(0)).getTime()) mustEqual content
    }

    "sort by rating if sort=rating" in {
      Await.result(createEvent(from = new Timestamp(4000,1,0,0,0,0,0)), Duration.Inf)

      val events = route(app, FakeRequest(GET, "/api/v1/events?sortDir=true&sort=rating")).get

      status(events) mustBe OK
      //TODO
    }

    "sort by distance to location if sort=location and a locationId is specified" in {
      Await.result(createEvent(), Duration.Inf)
      val location1 = Await.result(createLocation(lat = Some(0.1f), long = Some(0.3f)), Duration.Inf)
      Await.result(createEvent(locationId = location1.id, from = new Timestamp(4000,1,0,0,0,0,0)), Duration.Inf)
      val location2 = Await.result(createLocation(lat = Some(0.1f), long = Some(0.1f)), Duration.Inf)
      Await.result(createEvent(locationId = location2.id, from = new Timestamp(4000,1,0,0,0,0,0)), Duration.Inf)

      val events = route(app, FakeRequest(GET, "/api/v1/events?sortDir=true&sort=location&location=" ++ location1.id.getOrElse(-1).toString)).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[List[EventDetail]]
      content.sortBy(x => x.location.distance(location1)) mustEqual content
    }

    "reverse the sort direction if sortDir=false" in {
      Await.result(createEvent(from = new Timestamp(4000,1,0,0,0,0,0)), Duration.Inf)
      Await.result(createEvent(from = new Timestamp(4000,10,0,0,0,0,0)), Duration.Inf)
      Await.result(createEvent(from = new Timestamp(4000,6,0,0,0,0,0)), Duration.Inf)

      val events1 = route(app, FakeRequest(GET, "/api/v1/events?sortDir=true&sort=from")).get
      val events2 = route(app, FakeRequest(GET, "/api/v1/events?sortDir=false&sort=from")).get

      status(events1) mustBe OK
      status(events2) mustBe OK

      val content1 = contentAsJson(events1).as[List[EventDetail]]
      val content2 = contentAsJson(events2).as[List[EventDetail]]
      //content1.reverse mustEqual content2
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

      val eventForm = EventForm.Data("testevent", new Timestamp(0), Some(new Timestamp(0)), List(),
                                     LocationForm.Data(None, "testlocation", "testcountry", "testcity", "teststreet"),
                                     List(), "testdescription", "short description")

      val events = route(app, FakeRequest(POST, "/api/v1/events", new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe OK

      val content = contentAsJson(events).as[EventDetail]
      content.description mustEqual (eventForm.description)
      content.name mustEqual (eventForm.name)
    }

    "attach an existing location if specified" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val location = Await.result(createLocation(), Duration.Inf)

      val eventForm = EventForm.Data("testevent", new Timestamp(0), Some(new Timestamp(0)), List(), location.toForm,
                                     List(), "testdescription", "short description")

      val events = route(app, FakeRequest(POST, "/api/v1/events", new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[EventDetail]
      content.description mustEqual (eventForm.description)
      content.name mustEqual (eventForm.name)
      content.location mustEqual location
    }

    "attach an existing category if specified" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val category = Await.result(createCategory(), Duration.Inf)

      val eventForm = EventForm.Data("testevent", new Timestamp(0), Some(new Timestamp(0)), List(category),
                                     LocationForm.Data(None, "testlocation", "testcountry", "testcity", "teststreet"),
                                     List(), "testdescription", "short description")

      val events = route(app, FakeRequest(POST, "/api/v1/events", new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[EventDetail]
      content.categories must contain (category)
    }


    "attach a new category if specified" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val parentCategory = Await.result(createCategory(), Duration.Inf)
      val category = Category(None,"testcategory2",parentCategory.id.getOrElse(-1))

      val eventForm = EventForm.Data("testevent", new Timestamp(0), Some(new Timestamp(0)), List(category),
                                     LocationForm.Data(None, "testlocation", "testcountry", "testcity", "teststreet"),
                                     List(), "testdescription", "short description")

      val events = route(app, FakeRequest(POST, "/api/v1/events", new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[EventDetail]
      content.categories.map(_.name) must contain (category.name)
    }

    "attach an image if specified" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val image = Await.result(createImage(), Duration.Inf)

      val eventForm = EventForm.Data("testevent", new Timestamp(0), Some(new Timestamp(0)), List(),
                                     LocationForm.Data(None, "testlocation", "testcountry", "testcity", "teststreet"),
                                     List(TaggedImageForm.Data(image.id.getOrElse(-1),None)), "testdescription", "short description")
      val events = route(app, FakeRequest(POST, "/api/v1/events", new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[EventDetail]
      content.images.map(_.id) must contain (image.id)
    }

    "attach an image with a tag if specified" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val image = Await.result(createImage(), Duration.Inf)

      val tag = Some("testtag")
      val eventForm = EventForm.Data("testevent", new Timestamp(0), Some(new Timestamp(0)), List(),
                                     LocationForm.Data(None, "testlocation", "testcountry", "testcity", "teststreet"),
                                     List(TaggedImageForm.Data(image.id.getOrElse(-1),tag)), "testdescription", "short description")
      val events = route(app, FakeRequest(POST, "/api/v1/events", new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[EventDetail]
      content.images.map(_.id) must contain (image.id)
      content.images.map(_.tag) must contain (tag)
    }

    "return BadRequest for empty event name" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val location = Await.result(createLocation(), Duration.Inf)

      val eventForm = EventForm.Data("", new Timestamp(0), Some(new Timestamp(0)), List(),
                                     LocationForm.Data(None, "testlocation", "testcountry", "testcity", "teststreet"),
                                     List(), "testdescription", "short description")

      val events = route(app, FakeRequest(POST, "/api/v1/events", new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe BAD_REQUEST
    }


    "return BadRequest for empty event description" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val location = Await.result(createLocation(), Duration.Inf)

      val eventForm = EventForm.Data("testevent", new Timestamp(0), Some(new Timestamp(0)), List(),
                                     LocationForm.Data(None, "testlocation", "testcountry", "testcity", "teststreet"),
                                     List(), "", "short description")

      val events = route(app, FakeRequest(POST, "/api/v1/events", new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe BAD_REQUEST
    }

    "return BadRequest for empty short event description" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val location = Await.result(createLocation(), Duration.Inf)

      val eventForm = EventForm.Data("testevent", new Timestamp(0), Some(new Timestamp(0)), List(),
                                     LocationForm.Data(None, "testlocation", "testcountry", "testcity", "teststreet"),
                                     List(), "description", "")

      val events = route(app, FakeRequest(POST, "/api/v1/events", new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe BAD_REQUEST
    }

    "return BadRequest for users" in {
      val user = Await.result(createUser(), Duration.Inf)
      val location = Await.result(createLocation(), Duration.Inf)

      val eventForm = EventForm.Data("testevent", new Timestamp(0), Some(new Timestamp(0)), List(), location.toForm,
                                     List(), "testdescription", "short description")

      val events = route(app, FakeRequest(POST, "/api/v1/events", new Headers(List(("Content-Type","application/json"), ("x-auth-token",user._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe UNAUTHORIZED
    }
  }

  "EventController DELETE" should {
    "return OK on proper request" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val event = Await.result(createEvent(Some(organizer._2)), Duration.Inf)

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
      val event = Await.result(createEvent(Some(organizer._2)), Duration.Inf)

      val eventForm = EventForm.Data("testeventupdated", new Timestamp(0), Some(new Timestamp(0)), List(),
                                     LocationForm.Data(None, "testlocation", "testcountry", "testcity", "teststreet"),
                                     List(), "testdescriptionupdated", "short description updated")
      val events = route(app, FakeRequest(PUT, "/api/v1/events/" ++ event.id.getOrElse(-1).toString,
                                          new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe OK
    }

    "return BadRequest on non existing event" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)

      val eventForm = EventForm.Data("testeventupdated", new Timestamp(0), Some(new Timestamp(0)), List(),
                                     LocationForm.Data(None, "testlocation", "testcountry", "testcity", "teststreet"),
                                     List(), "testdescriptionupdated", "short description")
      val events = route(app, FakeRequest(PUT, "/api/v1/events/20000",
                                          new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe BAD_REQUEST
    }

    "return BadRequest for event not belonging to organizer" in {
      val organizer1 = Await.result(createOrganizer(), Duration.Inf)
      val organizer2 = Await.result(createOrganizer(name = "testorganizer2", mail = "testorganizer2@test.de"), Duration.Inf)
      val event = Await.result(createEvent(Some(organizer1._2)), Duration.Inf)

      val eventForm = EventForm.Data("testeventupdated", new Timestamp(0), Some(new Timestamp(0)), List(),
                                     LocationForm.Data(None, "testlocation", "testcountry", "testcity", "teststreet"),
                                     List(), "testdescriptionupdated", "short description")
      val events = route(app, FakeRequest(PUT, "/api/v1/events/" ++ event.id.getOrElse(-1).toString,
                                          new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer2._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe BAD_REQUEST
    }

    "return BadRequest on empty event name request" in {
      val organizer = Await.result(createOrganizer(), Duration.Inf)
      val event = Await.result(createEvent(Some(organizer._2)), Duration.Inf)

      val eventForm = EventForm.Data("", new Timestamp(0), Some(new Timestamp(0)), List(),
                                     LocationForm.Data(None, "testlocation", "testcountry", "testcity", "teststreet"),
                                     List(), "testdescriptionupdated", "short description")
      val events = route(app, FakeRequest(PUT, "/api/v1/events/" ++ event.id.getOrElse(-1).toString,
                                          new Headers(List(("Content-Type","application/json"), ("x-auth-token",organizer._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe BAD_REQUEST
    }

    "return Unauthorized for users" in {
      val user = Await.result(createUser(), Duration.Inf)
      val event = Await.result(createEvent(), Duration.Inf)

      val eventForm = EventForm.Data("testeventupdated", new Timestamp(0), Some(new Timestamp(0)), List(),
                                     LocationForm.Data(None, "testlocation", "testcountry", "testcity", "teststreet"),
                                     List(), "testdescriptionupdated", "short description")
      val events = route(app, FakeRequest(PUT, "/api/v1/events/" ++ event.id.getOrElse(-1).toString,
                                          new Headers(List(("Content-Type","application/json"), ("x-auth-token",user._3))),
                                          Json.toJson(eventForm))).get

      status(events) mustBe UNAUTHORIZED
    }
  }

  "EventController GET participate" should {
    "return OK on first participation" in {
      val event = Await.result(createEvent(), Duration.Inf)
      val user = Await.result(createUser(), Duration.Inf)

      val participate = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event.id.getOrElse(-1).toString,
                         new Headers(List(("x-auth-token",user._3))),"")).get

      status(participate) mustBe OK
    }

    "return Unauthorized for Organizers" in {
      val event = Await.result(createEvent(), Duration.Inf)
      val organizer = Await.result(createOrganizer(), Duration.Inf)

      val participate = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event.id.getOrElse(-1).toString,
                                               new Headers(List(("x-auth-token",organizer._3))),"")).get

      status(participate) mustBe UNAUTHORIZED
    }

    "return BadRequest for non existent event" in {
      val user = Await.result(createUser(), Duration.Inf)

      val participate = route(app, FakeRequest(GET, "/api/v1/events/participate/20000",
                                               new Headers(List(("x-auth-token",user._3))),"")).get

      status(participate) mustBe BAD_REQUEST
    }

    "return CONFLICT on second participation" in {
      val event = Await.result(createEvent(), Duration.Inf)
      val user = Await.result(createUser(), Duration.Inf)

      val participate1 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event.id.getOrElse(-1).toString,
                                                new Headers(List(("x-auth-token",user._3))),"")).get
      Thread.sleep(1000)
      val participate2 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event.id.getOrElse(-1).toString,
                                                new Headers(List(("x-auth-token",user._3))),"")).get

      status(participate2) mustBe CONFLICT
    }
  }

  "EventController GET unparticipate" should {
    "return OK on first unparticipation" in {
      val event = Await.result(createEvent(), Duration.Inf)
      val user = Await.result(createUser(), Duration.Inf)

      route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event.id.getOrElse(-1).toString,
                                               new Headers(List(("x-auth-token",user._3))),"")).get

      Thread.sleep(1000)
      val unparticipate = route(app, FakeRequest(GET, "/api/v1/events/unparticipate/" ++ event.id.getOrElse(-1).toString,
                                               new Headers(List(("x-auth-token",user._3))),"")).get

      status(unparticipate) mustBe OK
    }

    "return Unauthorized for Organizers" in {
      val event = Await.result(createEvent(), Duration.Inf)
      val organizer = Await.result(createOrganizer(), Duration.Inf)

      val unparticipate = route(app, FakeRequest(GET, "/api/v1/events/unparticipate/" ++ event.id.getOrElse(-1).toString,
                                               new Headers(List(("x-auth-token",organizer._3))),"")).get

      status(unparticipate) mustBe UNAUTHORIZED
    }

    "return BadRequest for non existent event" in {
      val user = Await.result(createUser(), Duration.Inf)

      val unparticipate = route(app, FakeRequest(GET, "/api/v1/events/unparticipate/20000",
                                               new Headers(List(("x-auth-token",user._3))),"")).get

      status(unparticipate) mustBe BAD_REQUEST
    }

    "return BadRequest on second unparticipation" in {
      val event = Await.result(createEvent(), Duration.Inf)
      val user = Await.result(createUser(), Duration.Inf)

      val participate = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event.id.getOrElse(-1).toString,
                                                new Headers(List(("x-auth-token",user._3))),"")).get

      val req = FakeRequest(GET, "/api/v1/events/unparticipate/" ++ event.id.getOrElse(-1).toString,
                            new Headers(List(("x-auth-token",user._3))),"")

      Thread.sleep(1000)
      val unparticipate1 = route(app,req).get
      Thread.sleep(1000)
      val unparticipate2 = route(app,req).get

      status(unparticipate2) mustBe BAD_REQUEST
    }
  }

  "EventController GET nearby" should {
    "return a list of events" in {
      val event1 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event2 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event3 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event4 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)

      val events = route(app, FakeRequest(GET, "/api/v1/events/nearby/" + event1.id.getOrElse(-1))).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[List[EventDetail]]
      content.map(x => x.id) must contain (event2.id)
      content.map(x => x.id) must contain (event3.id)
      content.map(x => x.id) must contain (event4.id)
    }

    "not return the event itself" in {
      val event1 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event2 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event3 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event4 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)

      val events = route(app, FakeRequest(GET, "/api/v1/events/nearby/" + event1.id.getOrElse(-1))).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[List[EventDetail]]
      content.map(x => x.id) must not contain (event1.id)
    }

    "sort by distance" in {
      val location1 = Await.result(createLocation(), Duration.Inf)
      val location2 = Await.result(createLocation(lat = Some(10.0f), long = Some(10.0f)), Duration.Inf)
      val location3 = Await.result(createLocation(lat = Some(10.0f), long = Some(-20.0f)), Duration.Inf)

      val event1 = Await.result(createEvent(locationId = location1.id, from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event2 = Await.result(createEvent(locationId = location3.id, from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event3 = Await.result(createEvent(locationId = location2.id, from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event4 = Await.result(createEvent(locationId = location1.id, from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)

      val events = route(app, FakeRequest(GET, "/api/v1/events/nearby/" + event1.id.getOrElse(-1))).get

      status(events) mustBe OK

      val content = contentAsJson(events).as[List[EventDetail]]
      content.sortBy(x => x.location.distance(location1)) mustEqual content
    }

    "only return events in the future" in {
      val event1 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event2 = Await.result(createEvent(from = new Timestamp(0, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event3 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event4 = Await.result(createEvent(from = new Timestamp(4000, 0, 0, 0, 0, 0, 0)), Duration.Inf)

      val events = route(app, FakeRequest(GET, "/api/v1/events/nearby/" + event1.id.getOrElse(-1))).get

      status(events) mustBe OK

      val content = contentAsJson(events).as[List[EventDetail]]
      content.map(x => x.id) must not contain (event2.id)
      content.map(x => x.id) must contain (event3.id)
      content.map(x => x.id) must contain (event4.id)
    }
  }

  "EventController GET alsoViewed" should {
    "return a list of events" in {
      val event1 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event2 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event3 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event4 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)

      val user = Await.result(createUser(), Duration.Inf)

      val participate1 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event1.id.getOrElse(-1).toString,
                                               new Headers(List(("x-auth-token",user._3))),"")).get
      val participate2 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event2.id.getOrElse(-1).toString,
                                               new Headers(List(("x-auth-token",user._3))),"")).get

      Thread.sleep(1000)

      val events = route(app, FakeRequest(GET, "/api/v1/events/alsoViewed/" + event1.id.getOrElse(-1))).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[List[EventDetail]]
      content.map(x => x.id) must contain (event2.id)
    }

    "not return the event itself" in {
      val event1 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event2 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event3 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event4 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)

      val user = Await.result(createUser(), Duration.Inf)

      val participate1 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event1.id.getOrElse(-1).toString,
                                               new Headers(List(("x-auth-token",user._3))),"")).get
      val participate2 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event2.id.getOrElse(-1).toString,
                                               new Headers(List(("x-auth-token",user._3))),"")).get

      Thread.sleep(1000)

      val events = route(app, FakeRequest(GET, "/api/v1/events/alsoViewed/" + event1.id.getOrElse(-1))).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[List[EventDetail]]
      content.map(x => x.id) must not contain (event1.id)
    }

    "only return events users participate in" in {
      val event1 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event2 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event3 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event4 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)

      val user = Await.result(createUser(), Duration.Inf)

      val participate1 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event1.id.getOrElse(-1).toString,
                                               new Headers(List(("x-auth-token",user._3))),"")).get
      val participate2 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event2.id.getOrElse(-1).toString,
                                               new Headers(List(("x-auth-token",user._3))),"")).get

      Thread.sleep(1000)

      val events = route(app, FakeRequest(GET, "/api/v1/events/alsoViewed/" + event1.id.getOrElse(-1))).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[List[EventDetail]]
      content.map(x => x.id) must not contain (event3.id)
      content.map(x => x.id) must not contain (event4.id)
    }

    "only return events in the future" in {
      val event1 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event2 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event3 = Await.result(createEvent(from = new Timestamp(0, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event4 = Await.result(createEvent(from = new Timestamp(0, 0, 0, 0, 0, 0, 0)), Duration.Inf)

      val user = Await.result(createUser(), Duration.Inf)

      val participate1 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event1.id.getOrElse(-1).toString,
                                               new Headers(List(("x-auth-token",user._3))),"")).get
      val participate2 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event2.id.getOrElse(-1).toString,
                                                new Headers(List(("x-auth-token",user._3))),"")).get
      val participate3 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event3.id.getOrElse(-1).toString,
                                                new Headers(List(("x-auth-token",user._3))),"")).get
      val participate4 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event4.id.getOrElse(-1).toString,
                                                new Headers(List(("x-auth-token",user._3))),"")).get

      Thread.sleep(1000)

      val events = route(app, FakeRequest(GET, "/api/v1/events/alsoViewed/" + event1.id.getOrElse(-1))).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[List[EventDetail]]
      content.map(x => x.id) must contain (event2.id)
      content.map(x => x.id) must not contain (event3.id)
      content.map(x => x.id) must not contain (event4.id)
    }

    "sort by most similar participants" in {
      val event1 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event2 = Await.result(createEvent(from = new Timestamp(3000, 0, 0, 0, 0, 0, 0)), Duration.Inf)
      val event3 = Await.result(createEvent(from = new Timestamp(0, 0, 0, 0, 0, 0, 0)), Duration.Inf)

      val user1 = Await.result(createUser(), Duration.Inf)
      val user2 = Await.result(createUser(), Duration.Inf)
      val user3 = Await.result(createUser(), Duration.Inf)

      val participate1 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event1.id.getOrElse(-1).toString,
                                               new Headers(List(("x-auth-token",user1._3))),"")).get
      val participate2 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event2.id.getOrElse(-1).toString,
                                                new Headers(List(("x-auth-token",user1._3))),"")).get
      val participate3 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event3.id.getOrElse(-1).toString,
                                                new Headers(List(("x-auth-token",user1._3))),"")).get

      val participate4 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event1.id.getOrElse(-1).toString,
                                                new Headers(List(("x-auth-token",user2._3))),"")).get
      val participate5 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event2.id.getOrElse(-1).toString,
                                                new Headers(List(("x-auth-token",user2._3))),"")).get
      val participate6 = route(app, FakeRequest(GET, "/api/v1/events/participate/" ++ event2.id.getOrElse(-1).toString,
                                                new Headers(List(("x-auth-token",user2._3))),"")).get

      Thread.sleep(1000)

      val events = route(app, FakeRequest(GET, "/api/v1/events/alsoViewed/" + event1.id.getOrElse(-1))).get

      status(events) mustBe OK
      val content = contentAsJson(events).as[List[EventDetail]]
      content.sortBy(x => -x.participantCount) mustEqual content
    }
  }
}
