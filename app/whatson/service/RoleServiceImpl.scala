package whatson.service

import scala.concurrent.{ExecutionContext, Future}
import javax.inject._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import whatson.db.Util._
import whatson.model._
import whatson.model.detail.RoleDetail._
import whatson.util._

class RoleServiceImpl @Inject()(
  protected val dbConfigProvider: DatabaseConfigProvider,
  applicationConfig: ApplicationConfig)(implicit context: ExecutionContext)
    extends RoleService with HasDatabaseConfigProvider[JdbcProfile] {

  def getByName(name: String) = db.run(RoleTable.role.filter(_.name === name).result).map(_.headOption)

  def getDetailed(id: Int) = db.run(RoleTable.role.filter(_.id === id).detailed).map(_.headOption)
}
