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
  
  def getUser(id: Int) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get user")
    
    val q = for(e <- user if e.id === id.bind) yield e;
    
    db.run(q.result).map(x => x.headOption match {
      case Some(r) => Ok(Json.toJson(r))
      case _ => NotFound
    })
  }
  
  def deleteUser(id: Int) = Action.async { implicit request: Request[AnyContent] =>
    log.debug("Rest request to get user")
    
    val q = user.filter(_.id === id.bind).delete
    
    db.run(q).map {
      case 0 => NotFound
      case x => Ok(Json.toJson(x))
    }
  }
  
  def createUser() = Action.async(parse.json(userReads)) { implicit request: Request[User] =>
    log.debug("Rest request to create user")
    
    val inserted = db.run(insertAndReturn[User,UserTable](user,request.body))
    
    inserted.map(x => Ok(Json.toJson(x)))
  }
  
  def updateUser(id: Int) = Action.async(parse.json(userReads)) { implicit request: Request[User] =>
    log.debug("Rest request to update user")
    
    val q = user.filter(_.id === id.bind).update(request.body)
    
    db.run(q).map {
      case 0 => NotFound
      case x => Ok(Json.toJson(x))
    }
  }
}