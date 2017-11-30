package whatson.model

case class Rating(id: Option[Int], rating: Float, userId: Int, entityId: Int, entityType: Int) extends HasCopy[Rating] {
  def cpy(i: Option[Int]) = this.copy(id = i)
}