package whatson.service.geocoder

case class Result(results: List[Address],
                  status: StatusCode,
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
