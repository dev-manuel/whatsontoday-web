package whatson.service

import scala.concurrent.Future

import whatson.model.detail._
import whatson.model.forms._
import whatson.model._


trait LocationService {
  def insertOrGet(locationForm: LocationForm.Data): Future[Option[Location]]
}
