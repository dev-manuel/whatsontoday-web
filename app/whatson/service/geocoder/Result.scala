package whatson.service.geocoder

import play.api.libs.json.Json

case class Result(results: List[Address],
                  status: String,
                  error_message: Option[String])

case class Address(address_components: List[AddressComponent],
                   formatted_address: String,
                   geometry: Geometry,
                   place_id: String,
                   types: List[String])

case class AddressComponent(long_name: String,
                            short_name: String,
                            types: List[String])

case class Geometry(location: Location,
                    location_type: String,
                    viewport: Viewport)


case class Location(lat: Double,
                    lng: Double)

case class Viewport(northeast: Location,
                    southwest: Location)

abstract sealed class StatusCode
case object OK extends StatusCode
case object ZERO_RESULTS extends StatusCode
case object OVER_QUERY_LIMIT extends StatusCode
case object REQUEST_DENIED extends StatusCode
case object INVALID_REQUEST extends StatusCode
case object UNKNOWN_ERROR extends StatusCode


object Result {
  /*implicit val okReads = Json.reads[OK]
  implicit val zero_resultsReads = Json.reads[ZERO_RESULTS]
  implicit val over_query_limitReads = Json.reads[OVER_QUERY_LIMIT]
  implicit val request_deniedReads = Json.reads[REQUEST_DENIED]
  implicit val invalid_requestReads = Json.reads[INVALID_REQUEST]
  implicit val unknown_errorReads = Json.reads[UNKNOWN_ERROR]
  implicit val statusCodeReads = Json.reads[StatusCode]*/
  implicit val locationReads = Json.reads[Location]
  implicit val viewportReads = Json.reads[Viewport]
  implicit val geometryReads = Json.reads[Geometry]
  implicit val addressComponentReads = Json.reads[AddressComponent]
  implicit val addressReads = Json.reads[Address]
  implicit val resultReads = Json.reads[Result]
}
