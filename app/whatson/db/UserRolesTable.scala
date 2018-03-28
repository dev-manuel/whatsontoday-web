package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model._

class UserRolesTable(tag: Tag) extends Table[UserRole](tag, "userroles") {
  def roleId = column[Int]("role_fk")

  def loginId = column[Int]("login_fk")

  def scope = column[String]("scope")

  def organizerId = column[Option[Int]]("organizer_fk")

  def locationId = column[Option[Int]]("location_fk")

  def * = (roleId,loginId,scope,organizerId,locationId) <>
    ({
       case (r,l,s,Some(o),_) => UserRole(r,l,UserRole.OrganizerScope(o))
       case (r,l,s,None,Some(loc)) => UserRole(r,l,UserRole.LocationScope(loc))
       case (r,l,_,_,_) => UserRole(r,l,UserRole.Global)
     },(s: UserRole) => Some((s.roleId,s.loginId,s.scope.name,s.scope.organizerId,s.scope.locationId)))

  def role = foreignKey("role",roleId,RoleTable.role)(_.id)
  def login = foreignKey("login",loginId,LoginTable.login)(_.id)
}

object UserRolesTable {
  val userRoles = TableQuery[UserRolesTable]
}
