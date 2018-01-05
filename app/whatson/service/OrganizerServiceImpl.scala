package whatson.service

import scala.concurrent.{ ExecutionContext, Future }

import javax.inject._
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import whatson.db.Util._
import whatson.model._

class OrganizerServiceImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)(implicit context: ExecutionContext)
    extends OrganizerService with HasDatabaseConfigProvider[JdbcProfile] {

  def save(organizer: Organizer) = db.run(insertAndReturn[Organizer,OrganizerTable](OrganizerTable.organizer,organizer))

  def getByLogin(login: Login) = db.run(OrganizerTable.organizer.filter(_.loginFk === login.id.getOrElse(-1)).result).map(_.headOption)
}
