package controllers

import play.api.mvc._
import whatson.auth._
import com.mohiva.play.silhouette.api.actions._

import scala.concurrent._
import com.mohiva.play.silhouette.api._
import whatson.model.{Organizer, Login}
import whatson.service._
import whatson.model.detail._
import whatson.model._
import whatson.model.UserRole._

trait Util {
  val silhouette: Silhouette[AuthEnv]
  val organizerService: OrganizerService

  val Unauthorized: Result
  val roleService: RoleService
  val loginService: LoginService

  def roleRequest[A](pars: BodyParser[A])
                 (r: (SecuredRequest[AuthEnv,A],Login,List[(RoleDetail,Scope)]) => Future[Result])
                 (implicit executionContext: ExecutionContext): Action[A] =
    silhouette.SecuredAction.async(pars) { request =>
      loginService.getRoles(request.identity.id.getOrElse(-1)).flatMap {
        case x => r(request,request.identity,x)
      }
    }

  def withRights[A](rights: String*)(pars: BodyParser[A])
                (r: (SecuredRequest[AuthEnv,A],Login,List[(RoleDetail,Scope)]) => Future[Result])
                (implicit executionContext: ExecutionContext): Action[A] =
    withScopedRights(rights.map(x => x->Global):_*)(pars)(r)

  def withScopedRights[A](rights: (String,Scope)*)(pars: BodyParser[A])
                (r: (SecuredRequest[AuthEnv,A],Login,List[(RoleDetail,Scope)]) => Future[Result])
                (implicit executionContext: ExecutionContext): Action[A] =
    roleRequest(pars) { case (req,login,roles) =>
      if(rights.forall(r => roles.contains((x: (RoleDetail,Scope)) => x._2 == r._2 && x._1.rights.map(_.name).contains(r._1))))
        r(req,login,roles)
      else
        Future(Unauthorized)
    }

  def hasScopedRight(right: String, scope: Scope, roles: List[(RoleDetail,Scope)]) =
    roles.contains((x: (RoleDetail,Scope)) => x._2 == scope
                     && x._1.rights.map(_.name).contains(right))
}
