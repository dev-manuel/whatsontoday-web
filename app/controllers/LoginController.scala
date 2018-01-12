package controllers

import scala.concurrent.{ExecutionContext, Future}

import com.mohiva.play.silhouette.api._
import javax.inject._
import play.api._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json._
import play.api.mvc._
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import whatson.auth._
import whatson.db.LoginTable._
import whatson.model.Login._
import com.mohiva.play.silhouette.api.services._
import com.mohiva.play.silhouette.impl.authenticators._
import com.mohiva.play.silhouette.api.crypto._
import scala.util._


class LoginController @Inject()(cc: ControllerComponents,
                               protected val dbConfigProvider: DatabaseConfigProvider,
                                silhouette: Silhouette[AuthEnv],
                                encoder: AuthenticatorEncoder,
                                settings: JWTAuthenticatorSettings)
    (implicit context: ExecutionContext)
    extends AbstractController(cc)
    with HasDatabaseConfigProvider[JdbcProfile]{

  val log = Logger("api.login")

  /**
    * Returns the user.
    *
    * @return The result to display.
    */
  def getUser = silhouette.SecuredAction.async { implicit request =>
    Future.successful(Ok(Json.toJson(request.identity)))
  }

  def deleteUser = silhouette.SecuredAction.async { implicit request =>
    log.debug("Rest request to get user")

    val q = login.filter(_.id === request.identity.id).delete

    db.run(q).map {
      case 0 => NotFound
      case x => Ok(Json.toJson(x))
    }
  }

  def updateUser = silhouette.SecuredAction.async(parse.json(loginReads)) { implicit request =>
    log.debug("Rest request to update user")

    val q = login.filter(_.id === request.identity.id).update(request.body)

    db.run(q).map {
      case 0 => NotFound
      case x => Ok(Json.toJson(x))
    }
  }

  def confirm(token: String) = Action.async { implicit request =>
    log.debug("Rest request to confirm account")

    JWTAuthenticator.unserialize(token, encoder, settings) match {
      case Success(loginInfo) => Future(Ok("yay"))
      case _ => Future(Unauthorized)
    }
  }
}
