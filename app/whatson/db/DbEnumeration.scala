package whatson.db

import slick.jdbc.PostgresProfile.api._
import play.api.libs.json._
import play.api.mvc._

abstract class DbEnumeration extends Enumeration {
  implicit val enumMapper = MappedColumnType.base[Value,Int](_.id,this.apply _)

  implicit val enumFormat = new Format[Value] {
    def reads(json: JsValue) = JsSuccess(withName(json.as[String].value))
    def writes(myEnum: Value) = JsString(myEnum.toString)
  }
}
