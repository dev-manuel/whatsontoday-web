package whatson.util

import scala.concurrent._

object ListUtil {
  implicit class ListFutureUtil[A](l: List[A]) {
    def mapFutureSync[B](f: A => Future[B])(implicit context: ExecutionContext): Future[List[B]] = {
      l.headOption match {
        case Some(o) => f(o).flatMap(x => l.tail.mapFutureSync(f).map(xs => x::xs))
        case None => Future.successful(List())
      }
    }

    def mapFuture[B](f: A => Future[B])(implicit context: ExecutionContext): Future[List[B]] =
      Future.sequence(l.map(f))
  }
}
