package whatson.util

import org.scalatestplus.play._
import org.scalatest._
import org.scalatestplus.play.guice._
import javax.inject._
import play.api._
import play.api.inject.guice.GuiceApplicationBuilder
import play.api.inject._
import whatson.service._
import play.api.mvc._
import com.google.inject.{AbstractModule, Provides}

case class TestModule(mailService: MailService) extends AbstractModule {
  def configure() {}

  @Provides
  def provideMailService(): MailService = mailService
}
