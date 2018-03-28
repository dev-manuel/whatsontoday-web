package controllers

import javax.inject._

import play.api.mvc._
import play.api.mvc.Results._
import play.filters.csrf._
import play.filters.csrf.CSRF.Token

@Singleton
class CSRFController @Inject()(components: ControllerComponents,
                     addToken: CSRFAddToken,
                     checkToken: CSRFCheck) extends AbstractController(components) {
  def getToken = addToken(Action { implicit request =>
                            val Token(name, value) = CSRF.getToken.get
                            Ok(s"$name=$value")
                          })
}
