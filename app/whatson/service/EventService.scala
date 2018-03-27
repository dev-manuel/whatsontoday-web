package whatson.service

import whatson.model._

import scala.concurrent.Future

import java.io._

trait EventService {
  def insertCSV(file: File): Future[List[Event]]
}
