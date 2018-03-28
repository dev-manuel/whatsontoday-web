package controllers

import scala.concurrent.ExecutionContext

import javax.inject._
import play.api._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.mvc._
import slick.jdbc.JdbcProfile
import play.api._
import whatson.util._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents,
                               protected val dbConfigProvider: DatabaseConfigProvider,
                               config: Configuration,
                               applicationConfig: ApplicationConfig)(implicit context: ExecutionContext) extends AbstractController(cc)
  with HasDatabaseConfigProvider[JdbcProfile] {

  val log = Logger("api.home")

  def index() = Action { implicit request: Request[AnyContent] =>
    log.debug("Rest request for the main page ('/') redirect to '/web'")
    Redirect("/web", MOVED_PERMANENTLY)
  }

  def indexWeb(any: String) = Action { implicit request: Request[AnyContent] =>
    log.debug("Rest request for the main page")
    
    Ok.sendFile(new java.io.File("./public/index.html"))
  }
}
