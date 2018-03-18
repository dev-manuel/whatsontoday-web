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
                                val roleService: RoleService)
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
          .sortBy(y => geoDistance(e.location.latitude, e.location.longitude, y._2.latitude, y._2.longitude))
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

  def createEvent() = withRights(Right.CreateEvent)(parse.json) { case (request,login,role) =>
    //TODO: Check Role for creating location, categories
    EventForm.form.bindFromRequest()(request).fold(
      form => {
        Future.successful(BadRequest(Json.toJson(form.errors)))
      },
      data => {
        log.debug("Rest request to create event")

        val locationQuery = (data.location.id match {
          case None => insertAndReturn[Location,LocationTable](LocationTable.location,data.location)
          case Some(id) => LocationTable.location.filter(_.id === id).result.map(_.head)
        })

        val imagesQuery = DBIO.sequence(data.images.map(x => ImageTable.image.filter(_.id === x.id.bind).result.map(l => l.map(r => (r,x.tag))))).map(_.flatten)

        val categoriesQuery = DBIO.sequence(
          data.categories.map {
            case cat =>
              cat.id match {
                case None => insertAndReturn[Category,CategoryTable](CategoryTable.category,cat).map(x => List(x).seq)
                case Some(id) => CategoryTable.category.filter(_.id === id.bind).result
              }
          }).map(_.flatten)

        db.run(locationQuery.zip(imagesQuery).zip(categoriesQuery)).flatMap { case ((location,images),categories) =>
          val event = Event(None, data.name, data.from, data.to, data.description, login.id, location.id.getOrElse(-1))
          db.run(insertAndReturn[Event,EventTable](EventTable.event,event)).map(r => (r,images,categories))
        }.flatMap { case (event,images,categories) =>
          val imagesAdd = ImageEntityTable.imageEntity ++= images.map(img => ImageEntity(img._1.id.getOrElse(-1),event.id.getOrElse(-1),EntityType.Event,img._2))
          val categoriesAdd = EventCategoryTable.eventCategory ++= categories.map(cat => (cat.id.getOrElse(-1),event.id.getOrElse(-1)))
          val eventDetailed = EventTable.event.filter(_.id === event.id.getOrElse(-1)).detailed
          db.run(imagesAdd.zip(categoriesAdd) >> eventDetailed)
        }.map(x => Ok(Json.toJson(x.head)))
      })
  }

  def updateEvent(id: Int) = withRights(Right.CreateEvent)(parse.json) { case (request,login,role) =>
    //TODO: Check Role for creating location, categories
    EventForm.form.bindFromRequest()(request).fold(
      form => {
        Future.successful(BadRequest(Json.toJson(form.errors)))
      },
      data => {
        log.debug("Rest request to update event")

        val locationQuery = (data.location.id match {
          case None => insertAndReturn[Location,LocationTable](LocationTable.location,data.location)
          case Some(id) => LocationTable.location.filter(_.id === id).result.map(_.head)
        })

        val imagesQuery = DBIO.sequence(data.images.map(x => ImageTable.image.filter(_.id === x.id.bind).result.map(l => l.map(r => (r,x.tag))))).map(_.flatten)

        val categoriesQuery = DBIO.sequence(
          data.categories.map {
            case cat =>
              cat.id match {
                case None => insertAndReturn[Category,CategoryTable](CategoryTable.category,cat).map(x => List(x).seq)
                case Some(id) => CategoryTable.category.filter(_.id === id.bind).result
              }
          }).map(_.flatten)

        val eventQuery = EventTable.event.filter(x => x.id === id.bind && x.creatorId === login.id).result.map(_.headOption)

        db.run(locationQuery.zip(imagesQuery).zip(categoriesQuery).zip(eventQuery)).flatMap {
          case (((location,images),categories),Some(event)) => {
            val event = Event(Some(id), data.name, data.from, data.to, data.description, login.id, location.id.getOrElse(-1))

            val getQuery = EventTable.event.filter(x => x.id === id.bind && x.creatorId === login.id)

            db.run(getQuery.update(event) >> getQuery.result.map(_.head))
              .map(r => Some((r,images,categories)))
          }
          case (((_,_),_),None) => Future.successful(None)
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

  def participate(id: Int) = withRights(Right.Participate)(parse.default) { case (request,login,role) =>
    log.debug("Rest request to participate in event")

    val q = (event.filter(x => x.id === id.bind).result)
      .zip(ParticipantTable.participant.filter(x => x.eventID === id.bind && x.loginID === login.id.getOrElse(-1).bind).result)

    db.run(q).map(x => (x._1.headOption,x._2.headOption)).flatMap {
      case (Some(e),None) => {
        db.run(ParticipantTable.participant += ((login.id.getOrElse(-1),id)))
        Future.successful(Ok)
      }
      case (Some(e),Some(p)) => Future.successful(Conflict)
      case (None,_) => Future.successful(BadRequest)
    }
  }

  def unparticipate(id: Int) = withRights(Right.CreateEvent)(parse.default) { case (request,login,role) =>
    log.debug("Rest request to unparticipate in event")

    db.run(ParticipantTable.participant.filter(x => x.eventID === id.bind && x.loginID === login.id.getOrElse(-1).bind).delete)
      .flatMap {
      case 1 => {
        Future.successful(Ok)
      }
      case _ => Future.successful(BadRequest)
    }
  }
}
