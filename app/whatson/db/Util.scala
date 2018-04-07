package whatson.db

import scala.concurrent.ExecutionContext

import play.api._
import play.api.libs.json._
import play.api.mvc._
import slick.ast.TypedType
import slick.dbio.DBIOAction
import slick.jdbc.JdbcProfile
import slick.jdbc.PostgresProfile.api._
import whatson.model.HasID

object Util extends Results {
  val fromAngle = SimpleFunction.unary[Float, Float]("fromangle")
  def geoDistance(a: Rep[Float], b:Rep[Float], c:Rep[Float], d:Rep[Float]) =
    SimpleFunction[Float]("geodistance").apply(Seq(a,b,c,d))

  def similarity(a: Rep[String], b:Rep[String], c:Rep[Float]) =
    SimpleFunction[Float]("similarity").apply(Seq(a,b,c))

  def similar(a: Rep[String], b:Rep[String]) =
    SimpleBinaryOperator[Boolean]("%").apply(a,b)

  def lower(a: Rep[String]) =
    SimpleFunction[String]("lower").apply(Seq(a))

  def currentTimestamp = SimpleLiteral[java.sql.Timestamp]("current_timestamp")
  
  def oneDay = SimpleLiteral[java.sql.Timestamp]("interval '24 hours'")
  
  def plus(a: Rep[java.sql.Timestamp], b:Rep[java.sql.Timestamp]) =
    SimpleBinaryOperator[java.sql.Timestamp]("+").apply(a,b)

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

  def returnPagedNoCount[A](a: DBIOAction[Seq[A],NoStream,Nothing], db: Database)(implicit request: Request[_], ec: ExecutionContext, tjs: Writes[A]) = {
    db.run(a).map(x => {
      Ok(Json.toJson(x))
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
