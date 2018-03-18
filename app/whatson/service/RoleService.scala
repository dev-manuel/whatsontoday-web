package whatson.service

import whatson.model._
import whatson.model.detail._
import com.mohiva.play.silhouette.api.LoginInfo
import scala.concurrent.Future

trait RoleService {
  def getByName(name: String): Future[Option[Role]]

  def getDetailed(id: Int): Future[Option[RoleDetail]]
}
