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
import whatson.model.Event._
import whatson.model.Event
import whatson.db.EventTable._
import play.api.mvc.Results
import play.api.libs.typedmap.TypedKey
import slick.dbio.DBIOAction
import slick.lifted.ColumnOrdered
import slick.ast.TypedType

object Util extends Results {
  val fromAngle = SimpleFunction.unary[Float, Float]("fromangle")
  def geoDistance(a: Rep[Float], b:Rep[Float], c:Rep[Float], d:Rep[Float]) =
    SimpleFunction[Float]("geodistance").apply(Seq(a,b,c,d))
  
  
  def insertAndReturn[T, U <: HasID[T]](a: TableQuery[U], b: U#TableElementType) = {
    (a returning a.map(x => x.id) into ((event,i) => event.cpy(Some(i))) += b)
  }
  
  def runTwo[A,B,C](a: (Query[A,B, Seq], Rep[C]), db: Database) = 
    db.run(a._1.result).zip(db.run(a._2.result))
  
  def returnPaged[A,B,C](a: DBIOAction[Seq[A],NoStream,Nothing], q: Query[B,C,Seq], db: Database)(implicit request: Request[_], ec: ExecutionContext, tjs: Writes[A]) = {
    db.run(a).zip(db.run(q.length.result)).map(x => {
      Ok(Json.toJson(x._1)).withHeaders("X-Number-Items" -> x._2.toString())
    })
  }
  
  implicit class QueryUtils[B,C](q: Query[B,C,Seq]) {
    def queryPaged[A,B,C](implicit request: Request[A]) = {
      val page = request.headers.get("X-Page").map(_.toInt).getOrElse(0)
      val pageSize = request.headers.get("X-Page-Size").map(_.toInt).getOrElse(20)
      
      q.drop(page*pageSize).take(pageSize)
    }
    
    def returnPaged(db: Database)(implicit request: Request[_], ec: ExecutionContext, tjs: Writes[C]) = {
      runTwo(q.paged,db).map(x => Ok(Json.toJson(x._1)).withHeaders("X-Number-Items" -> x._2.toString()))
    }
    
    def paged[A](implicit request: Request[A]) = {
      val page = request.headers.get("X-Page").map(_.toInt).getOrElse(0)
      val pageSize = request.headers.get("X-Page-Size").map(_.toInt).getOrElse(20)
      
      (q.drop(page*pageSize).take(pageSize),q.length)
    }
  }
  
  implicit class RepUtils[A](rep: Rep[A]) {
    def dir(b: Boolean)(implicit t: TypedType[A]) = if(b) columnToOrdered(rep).asc else columnToOrdered(rep).desc
  }
}