package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model.HasID
import whatson.model.Event
import slick.jdbc.JdbcProfile
import javax.inject._
import play.api._
import play.api.mvc._
import scala.concurrent.ExecutionContext
import slick.jdbc.PostgresProfile.api._
import play.api.db.slick.HasDatabaseConfigProvider
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.Await
import scala.concurrent.duration.Duration
import slick.dbio.Effect.Transactional
import play.api.libs.json._
import java.util.Locale.Category
import whatson.model.EventH._
import whatson.model.Event
import whatson.db.EventTable._
import play.api.mvc.Results
import play.api.libs.typedmap.TypedKey

object Util extends Results {
  val fromAngle = SimpleFunction.unary[Float, Float]("fromangle")
  def geoDistance(a: Rep[Float], b:Rep[Float], c:Rep[Float], d:Rep[Float]) =
    SimpleFunction[Float]("geodistance").apply(Seq(a,b,c,d))
  
  
  def insertAndReturn[T, U <: HasID[T]](a: TableQuery[U], b: U#TableElementType) = {
    (a returning a.map(x => x.id) into ((event,i) => event.cpy(Some(i))) += b)
  }
  
  def paged[A,B,C](q: Query[B,C, Seq])(implicit request: Request[A]) = {
    val page = request.headers.get("X-Page").map(_.toInt).getOrElse(0)
    val pageSize = request.headers.get("X-Page-Size").map(_.toInt).getOrElse(20)
    
    (q.drop(page*pageSize).take(pageSize),q.distinct.length)
  }
  
  def runTwo[A,B,C](a: (Query[A,B, Seq], Rep[C]), db: Database) = 
    db.run(a._1.result).zip(db.run(a._2.result))
    
  def returnPaged[A,B](a: Query[A,B, Seq], db: Database)(implicit request: Request[_], ec: ExecutionContext, tjs: Writes[B]) = {
    runTwo(paged(a),db).map(x => Ok(Json.toJson(x._1)).withHeaders("X-Number-Items" -> x._2.toString()))
  }
}