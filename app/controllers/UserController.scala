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
import play.api.libs.json._
import java.util.Locale.Category
import whatson.db.CategoryTable
import whatson.model.UserH._
import whatson.model.User
import play.api.mvc.Results

class UserController @Inject()(cc: ControllerComponents, protected val dbConfigProvider: DatabaseConfigProvider)
    (implicit context: ExecutionContext)
    extends AbstractController(cc) 
    with HasDatabaseConfigProvider[JdbcProfile]{
  
  val log = Logger("api.users")
  
  def getUser(id: Long) = Action { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get user")
    
    Status(501)
  }
  
  def deleteUser(id: Long) = Action { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get user")
    
    Status(501)
  }
  
  def createUser() = Action(parse.json(userReads)) { implicit request: Request[User] =>
    log.debug("Rest request to create user")
    
    Status(501)
  }
  
  def updateUser(id: Long) = Action(parse.json(userReads)) { implicit request: Request[User] =>
    log.debug("Rest request to update user")
    
    Status(501)
  }
}