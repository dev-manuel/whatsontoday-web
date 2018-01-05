package controllers

import play.api.mvc._
import whatson.auth._
import com.mohiva.play.silhouette.api.actions._

import scala.concurrent._
import com.mohiva.play.silhouette.api._
import whatson.model._
import whatson.service._

trait Util {
  val silhouette: Silhouette[AuthEnv]
  val organizerService: OrganizerService

  val NotFound: Result

  def organizerRequest[A](pars: BodyParser[A])(r: (SecuredRequest[AuthEnv,A],Organizer) => Future[Result])(implicit executionContext: ExecutionContext): Action[A] =
    silhouette.SecuredAction.async(pars) { request =>
      organizerService.getByLogin(request.identity).flatMap {
        case Some(x) => r(request,x)
        case _ => Future(NotFound)
      }
    }
}
