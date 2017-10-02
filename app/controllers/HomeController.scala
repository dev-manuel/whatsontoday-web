package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import scala.concurrent.ExecutionContext
import slick.jdbc.PostgresProfile.api._
import whatson.db.EventTable
import play.api.db.slick.HasDatabaseConfigProvider
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.Await
import scala.concurrent.duration.Duration
import slick.dbio.Effect.Transactional

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents, protected val dbConfigProvider: DatabaseConfigProvider)(implicit context: ExecutionContext) extends AbstractController(cc) 
  with HasDatabaseConfigProvider[JdbcProfile] {
  
  val log = Logger("rest")
  
  /**
   * Create an Action to render an HTML page.
   *
   * The configuration in the `routes` file means that this method
   * will be called when the application receives a `GET` request with
   * a path of `/`.
   */
  def index() = Action { implicit request: Request[AnyContent] =>
    log.debug("Rest request for the main page")
    Ok.sendFile(new java.io.File("./public/index.html"))
  }
  
  def events() = Action { implicit request: Request[AnyContent] =>
    log.debug("Rest request for test implementation of events")
    db.run(EventTable.event.insertOrUpdate((Some(1),"test2")))
    
    val q = for(e <- EventTable.event) yield e.name;
    db.run(q.result).foreach(y => log.debug(y.toString()))
    
    Ok("yay")
  }
}
