package whatson.service

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import whatson.db._
import whatson.db.Util._
import whatson.model._
import javax.inject._

class OrganizerServiceImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
    extends OrganizerService with HasDatabaseConfigProvider[JdbcProfile] {

  def save(organizer: Organizer) = db.run(insertAndReturn[Organizer,OrganizerTable](OrganizerTable.organizer,organizer))
}
