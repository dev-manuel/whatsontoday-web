package controllers

import javax.inject._
import play.api._
import play.api.mvc._
import scala.concurrent.ExecutionContext
import slick.jdbc.PostgresProfile.api._
import play.api.db.slick.HasDatabaseConfigProvider
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.Await
import scala.concurrent.duration.Duration
import slick.dbio.Effect.Transactional
import play.api.libs.json._
import java.util.Locale.Category
import whatson.db._
import whatson.db.UserTable._
import whatson.model.UserH._
import whatson.model._
import play.api.mvc.Results
import whatson.db.Util._

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
  
  def createUser() = Action.async(parse.json(userReads)) { implicit request: Request[User] =>
    log.debug("Rest request to create user")
    
    val inserted = db.run(insertAndReturn[User,UserTable](user,request.body))
    
    inserted.map(x => Ok(Json.toJson(x)))
  }
  
  def updateUser(id: Long) = Action(parse.json(userReads)) { implicit request: Request[User] =>
    log.debug("Rest request to update user")
    
    Status(501)
  }
}