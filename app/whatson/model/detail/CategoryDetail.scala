package whatson.model.detail

import scala.concurrent.ExecutionContext

import play.api.libs.json._
import slick.jdbc.PostgresProfile.api._
import whatson.db._
import whatson.model._

case class CategoryDetail(id: Option[Int], name: String, parentId: Int, images: List[Int]) extends WithImages

object CategoryDetail {
  implicit val categoryDetailReads = Json.reads[CategoryDetail]
  implicit val categoryDetailWrites = Json.writes[CategoryDetail]

  val tupled = (this.apply _).tupled

  implicit class CategoryDetailQuery(q: Query[CategoryTable, Category, Seq]) {
    def detailed(implicit ec: ExecutionContext) = {
      val t = q.result.flatMap(y => {
        DBIO.sequence(y.map {
          case category => {
            val imgs = CategoryTable.category.filter(_.id === category.id).flatMap(_.images).map(_.id)

            imgs.result.map(o => {
              CategoryDetail(category.id, category.name, category.parentId, o.toList)
            })
          }
        })
      })
      t
    }
  }
}
