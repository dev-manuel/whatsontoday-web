package whatson.model

import whatson.db._

object EntityType extends DbEnumeration {
  val Event, Location, User, Category = Value
}
