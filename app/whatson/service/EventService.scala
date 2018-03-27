package whatson.service

import whatson.model._

import scala.concurrent.Future

import java.io._
import whatson.model.detail._

trait EventService {
  def insertCSV(file: File, organizer: Organizer): Future[List[EventDetail]]
}
