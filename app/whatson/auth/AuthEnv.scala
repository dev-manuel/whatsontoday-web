package whatson.auth

import com.mohiva.play.silhouette.api.Env
import com.mohiva.play.silhouette.impl.authenticators.JWTAuthenticator
import whatson.model._

trait AuthEnv extends Env {
  type I = User
  type A = JWTAuthenticator
}