package whatson.util

import scala.concurrent._
import scala.math.BigDecimal

object StringUtil {
  implicit class StringNumberUtil[A](s: String) {
    def toBigDecimal: Option[BigDecimal] = {
      try {
        Some(BigDecimal(s))
      } catch {
        case e: Exception => None
      }
    }
  }
}
