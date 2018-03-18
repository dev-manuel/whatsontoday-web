package whatson.model.detail

import play.api.libs.json._
import whatson.model._
import whatson.db.RoleTable
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import scala.concurrent.ExecutionContext

case class RoleDetail(id: Option[Int], name: String, right: List[Right])

object RoleDetail {
  implicit val roleDetailReads = Json.reads[RoleDetail]
  implicit val roleDetailWrites = Json.writes[RoleDetail]

  val tupled = (this.apply _).tupled

  implicit class RoleDetailQuery(q: Query[RoleTable, Role, Seq]) {
    def detailed(implicit ec: ExecutionContext) = q.result.flatMap(y => {
        DBIO.sequence(y.map {
          case role => {
            val rights = RoleTable.role.filter(_.id === role.id).flatMap(_.rights).result

            rights.map(o => {
              RoleDetail(role.id, role.name, o.toList)
            })
          }
        })
      })
  }
}
