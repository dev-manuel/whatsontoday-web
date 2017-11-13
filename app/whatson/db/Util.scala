package whatson.db

import slick.jdbc.PostgresProfile.api._
import whatson.model.HasID
import whatson.model.Event

object Util {
  def insertAndReturn[T, U <: HasID[T]](a: TableQuery[U], b: U#TableElementType) = {
    (a returning a.map(x => x.id) into ((event,i) => event.cpy(Some(i))) += b)
  }
}