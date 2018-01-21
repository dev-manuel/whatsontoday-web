package whatson.model

import whatson.db._

object UserType extends DbEnumeration {
  val User, Organizer = Value
}
