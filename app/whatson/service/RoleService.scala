package whatson.service

import whatson.model._
import com.mohiva.play.silhouette.api.LoginInfo
import scala.concurrent.Future

trait RoleService {
   def getByName(name: String): Future[Option[Role]]
}
