package controllers

import scala.concurrent._
import javax.inject._
import play.api._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import whatson.db.EventTable._
import whatson.db.Util._
import whatson.model._
import whatson.model.Event._
import whatson.model.detail.EventDetail._
import com.mohiva.play.silhouette.api._
import whatson.auth._
import whatson.service._
import whatson.model.forms._
import whatson.util.FormErrorJson._
import java.sql.Timestamp

/**
 * This Controller handles API Requests concerning events
 */
class EventController @Inject()(cc: ControllerComponents,
                                protected val dbConfigProvider: DatabaseConfigProvider,
                                val silhouette: Silhouette[AuthEnv],
                                val organizerService: OrganizerService,
                                val userService: UserService,
                                eventService: EventService,
                                locationService: LocationService)
    (implicit context: ExecutionContext)
    extends AbstractController(cc)
    with HasDatabaseConfigProvider[JdbcProfile]
    with Util {

  val log = Logger("api.event")

  def getEvent(id: Int) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get event")

    val q = for(e <- EventTable.event if e.id === id.bind) yield e;

    db.run(q.detailed).map(x => x.headOption match {
      case Some(r) => Ok(Json.toJson(r))
      case _ => NotFound
    })
  }

  def searchEvents(search: Option[String], location: Option[Int], category: Option[Int],
                   sort: Option[String], sortDir: Boolean, from: Option[Timestamp], to: Option[Timestamp]) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to search events")
    
    val q = for {
      e <- event if similar(e.name,search.getOrElse("").bind) || search.getOrElse("").bind === ""
                 if e.categories.filter(_.id === category.getOrElse(-1)).exists || category.getOrElse(-1).bind === -1
                 if e.locationId - location.getOrElse(-1).bind === 0 || location.getOrElse(-1).bind === -1
                 if e.from >= from.getOrElse(new Timestamp(0,0,0,0,0,0,0)) && e.from <= to.getOrElse(new Timestamp(4000,0,0,0,0,0,0))
                 if e.to.getOrElse(plus(e.from,oneDay)) >= currentTimestamp
    } yield e

    val s = q.sortColumn(sort,sortDir).queryPaged.detailed
    returnPaged(s,q,db)
  }

  def getNearby(id: Int) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get events nearby another event")

    val q = for(e <- EventTable.event if e.id === id.bind) yield e;

    db.run(q.detailed).map(_.headOption).flatMap {
      case Some(e) => {
        val q = EventTable.event.join(LocationTable.location).on(_.locationId === _.id)
          .sortBy(y => geoDistance(e.location.latitude.getOrElse(0.0f).bind, e.location.longitude.getOrElse(0.0f).bind, 
              y._2.latitude.getOrElse(0.0f), y._2.longitude.getOrElse(0.0f)))
          .map(_._1).filter(y => y.id =!= e.id && y.from >= currentTimestamp)
        val s = q.queryPaged.detailed
        returnPaged(s,q,db)
      }
      case None => Future(NotFound)
    }
  }

  def getSameViewed(id: Int) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get events other participants also visit")

    val q = ParticipantCountView.participantCount.filter(_.id === id.bind)
      .join(EventTable.event).on(_.event_fk === _.id)
      .sortBy(y => y._1.count.desc).map(_._2)
      .filter(y => y.id =!= id.bind && y.from >= currentTimestamp)

    val s = q.queryPaged.detailed

    returnPaged(s,q,db)
  }

  def deleteEvent(id: Int) = organizerRequest(parse.default) { (request,organizer) =>
    log.debug("Rest request to get event")

    val q = event.filter(x => x.id === id.bind && x.creatorId === organizer.id).delete

    db.run(q).map {
      case 0 => NotFound
      case x => Ok(Json.toJson(x))
    }
  }

  def createEvent() = organizerRequest(parse.json) { case (request,organizer) =>
    EventForm.form.bindFromRequest()(request).fold(
      form => {
        Future.successful(BadRequest(Json.toJson(form.errors)))
      },
      data => {
        log.debug("Rest request to create event")

        val location = locationService.insertOrGet(data.location)

        val imagesQuery = DBIO.sequence(data.images.map(x => ImageTable.image.filter(_.id === x.id.bind).result.map(l => l.map(r => (r,x.tag))))).map(_.flatten)

        val categoriesQuery = DBIO.sequence(
          data.categories.map {
            case cat =>
              cat.id match {
                case None => insertAndReturn[Category,CategoryTable](CategoryTable.category,cat).map(x => List(x).seq)
                case Some(id) => CategoryTable.category.filter(_.id === id.bind).result
              }
          }).map(_.flatten)

        db.run(imagesQuery.zip(categoriesQuery)).zip(location).flatMap {
          case ((images,categories),Some(location)) => {
            val event = Event(None, data.name, data.from, data.to,
                              data.description, data.shortDescription,
                              organizer.id, location.id.getOrElse(-1),
                              data.priceMin, data.priceMax)
            db.run(insertAndReturn[Event,EventTable](EventTable.event,event)).map(r => (r,images,categories))
          }.flatMap { case (event,images,categories) =>
              val imagesAdd = ImageEntityTable.imageEntity ++= images.map(img => ImageEntity(img._1.id.getOrElse(-1),event.id.getOrElse(-1),EntityType.Event,img._2))
              val categoriesAdd = EventCategoryTable.eventCategory ++= categories.map(cat => (cat.id.getOrElse(-1),event.id.getOrElse(-1)))
              val eventDetailed = EventTable.event.filter(_.id === event.id.getOrElse(-1)).detailed
              db.run(imagesAdd.zip(categoriesAdd) >> eventDetailed)
          }.map(x => Ok(Json.toJson(x.head)))
          case _ => Future.successful(BadRequest)
        }
      })
  }

  def updateEvent(id: Int) = organizerRequest(parse.json) { case (request,organizer) =>
    EventForm.form.bindFromRequest()(request).fold(
      form => {
        Future.successful(BadRequest(Json.toJson(form.errors)))
      },
      data => {
        log.debug("Rest request to update event")

        val location = locationService.insertOrGet(data.location)

        val imagesQuery = DBIO.sequence(data.images.map(x => ImageTable.image.filter(_.id === x.id.bind).result.map(l => l.map(r => (r,x.tag))))).map(_.flatten)

        val categoriesQuery = DBIO.sequence(
          data.categories.map {
            case cat =>
              cat.id match {
                case None => insertAndReturn[Category,CategoryTable](CategoryTable.category,cat).map(x => List(x).seq)
                case Some(id) => CategoryTable.category.filter(_.id === id.bind).result
              }
          }).map(_.flatten)

        val eventQuery = EventTable.event.filter(x => x.id === id.bind && x.creatorId === organizer.id).result.map(_.headOption)

        db.run(imagesQuery.zip(categoriesQuery).zip(eventQuery)).zip(location).flatMap {
          case (((images,categories),Some(event)),Some(location)) => {
            val event = Event(Some(id), data.name, data.from, data.to,
                              data.description, data.shortDescription,
                              organizer.id, location.id.getOrElse(-1),
                              data.priceMin, data.priceMax)

            val getQuery = EventTable.event.filter(x => x.id === id.bind && x.creatorId === organizer.id)

            db.run(getQuery.update(event) >> getQuery.result.map(_.head))
              .map(r => Some((r,images,categories)))
          }
          case _ => Future.successful(None)
        }.flatMap {
          case Some((event,images,categories)) => {
            val dropImages = ImageEntityTable.imageEntity.filter(x => x.entityId === id && x.entityType === EntityType.Event).delete
            val dropCategories = EventCategoryTable.eventCategory.filter(x => x.eventID === id).delete
            val dropQuery = dropImages.zip(dropCategories)

            val imagesAdd = ImageEntityTable.imageEntity ++= images.map(img => ImageEntity(img._1.id.getOrElse(-1),event.id.getOrElse(-1),EntityType.Event, img._2))
            val categoriesAdd = EventCategoryTable.eventCategory ++= categories.map(cat => (cat.id.getOrElse(-1),event.id.getOrElse(-1)))
            val eventDetailed = EventTable.event.filter(_.id === event.id.getOrElse(-1)).detailed
            db.run(dropQuery >> imagesAdd.zip(categoriesAdd) >> eventDetailed).map(x => Some(x))
          }
          case None => Future.successful(None)
        }.map {
          case Some(e) => Ok(Json.toJson(e))
          case None => BadRequest
        }
      })
  }

  def insertCSV = organizerRequest(parse.multipartFormData) { case (request,organizer) =>
    log.debug("Rest request to insert events by csv")

    request.body.file("csv").map { case x =>
      val file = x.ref.path.toFile()

      eventService.insertCSV(file,organizer)
     }.map(_.map(x => Ok(Json.toJson(x)))).headOption.getOrElse(Future.successful(BadRequest))
  }

  def participate(id: Int) = userRequest(parse.default) { case (request,user) =>
    log.debug("Rest request to participate in event")

    val q = (event.filter(x => x.id === id.bind).result)
      .zip(ParticipantTable.participant.filter(x => x.eventID === id.bind && x.userID === user.id.getOrElse(-1).bind).result)

    db.run(q).map(x => (x._1.headOption,x._2.headOption)).flatMap {
      case (Some(e),None) => {
        db.run(ParticipantTable.participant += ((user.id.getOrElse(-1),id)))
        Future.successful(Ok)
      }
      case (Some(e),Some(p)) => Future.successful(Conflict)
      case (None,_) => Future.successful(BadRequest)
    }
  }

  def unparticipate(id: Int) = userRequest(parse.default) { case (request,user) =>
    log.debug("Rest request to unparticipate in event")

    db.run(ParticipantTable.participant.filter(x => x.eventID === id.bind && x.userID === user.id.getOrElse(-1).bind).delete)
      .flatMap {
      case 1 => {
        Future.successful(Ok)
      }
      case _ => Future.successful(BadRequest)
    }
  }
  
   
  def getSliderEvents = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get events for slider")

    db.run(SliderEventTable.sliderEvent.sortBy(_.number).flatMap(_.event).detailed).map(x => Ok(Json.toJson(x)))
  }
}
