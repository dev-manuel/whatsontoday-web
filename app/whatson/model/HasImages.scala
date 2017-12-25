package whatson.model

import whatson.model.detail._

trait HasImages {
  val images: Seq[ImageDetail]
}
