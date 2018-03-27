package whatson.service

import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.jdbc.JdbcProfile
import whatson.db._
import whatson.db.Util._
import whatson.model._
import javax.inject._
import slick.jdbc.PostgresProfile.api._
import scala.concurrent.{ ExecutionContext, Future }
import java.io._

class EventServiceImpl @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                              (implicit context: ExecutionContext)
    extends EventService with HasDatabaseConfigProvider[JdbcProfile] {

  def insertCSV(file: File): Future[List[Event]] = {
    

    Future.successful(List())
  }
}
