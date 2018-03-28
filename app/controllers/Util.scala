package controllers

import play.api.mvc._
import whatson.auth._
import com.mohiva.play.silhouette.api.actions._

import scala.concurrent._
import com.mohiva.play.silhouette.api._
import whatson.model.{Organizer, Login}
import whatson.service._
import whatson.model.detail._

trait Util {
  val silhouette: Silhouette[AuthEnv]
  val organizerService: OrganizerService

  val Unauthorized: Result
  val roleService: RoleService

  def roleRequest[A](pars: BodyParser[A])(r: (SecuredRequest[AuthEnv,A],Login,RoleDetail) => Future[Result])(implicit executionContext: ExecutionContext): Action[A] =
    silhouette.SecuredAction.async(pars) { request =>
      roleService.getDetailed(request.identity.roleId).flatMap {
        case Some(x) => r(request,request.identity,x)
        case _ => Future(Unauthorized)
      }
    }

  def withRights[A](rights: String*)(pars: BodyParser[A])
                (r: (SecuredRequest[AuthEnv,A],Login,RoleDetail) => Future[Result])(implicit executionContext: ExecutionContext): Action[A] =
    roleRequest(pars) { case (req,login,role) =>
      if(rights.forall(r => role.rights.map(_.name).contains(r)))
        r(req,login,role)
      else
        Future(Unauthorized)
    }
}
