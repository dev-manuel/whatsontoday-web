package whatson.db

import slick.jdbc.PostgresProfile.api._

trait Sortable[R,O] {
  def sortColumn[U,C[D]](name: String): R
  def sortColumn[U,C[D]](name: String, param: O): R = sortColumn(name)
  
  def sortColumn[U,C[D]](name: Option[String]): R = sortColumn(name.getOrElse(defaultSort))
  def sortColumn[U,C[D]](name: Option[String], param: O): R = sortColumn(name.getOrElse(defaultSort),param)
  
  val defaultSort: String
}