package whatson.model

import whatson.model.detail._

trait WithImages {
  val images: Seq[ImageDetail]
}
