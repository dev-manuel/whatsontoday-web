package whatson.util

import slick.jdbc.JdbcProfile
import org.scalatest._
import org.scalatest.mockito.MockitoSugar
import org.scalatestplus.play._
import org.scalatestplus.play.guice._
import play.api._
import play.api.inject.guice.GuiceApplicationBuilder
import play.api.test._
import whatson.service._
import scala.language.implicitConversions
import play.api.db.slick.{DatabaseConfigProvider}
import play.api.db.evolutions._
import play.api.db._
import org.scalatest._
import whatson.model._
import whatson.db._
import whatson.db.Util._
import scala.concurrent._
import scala.concurrent.ExecutionContext
import scala.concurrent.ExecutionContext.Implicits.global
import java.sql.Timestamp
import com.mohiva.play.silhouette.impl.authenticators._
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.api.services._
import whatson.auth._
import com.mohiva.play.silhouette.api.util.{Clock, Credentials}
import com.mohiva.play.silhouette.impl.providers._
import play.api.test._
import com.mohiva.play.silhouette.api.util.PasswordHasher
import whatson.modules._

class RestTestSuite extends PlaySpec with TestSuiteMixin
    with GuiceOneAppPerTest with Injecting
    with MockitoSugar {
  val mailService = mock[MailService]

  implicit override def newAppForTest(testData: TestData): Application =
    new GuiceApplicationBuilder()
      .overrides(TestModule(mailService))
      .build()

  def dbConfig(implicit app: Application) = Application.instanceCache[DatabaseConfigProvider].apply(app)

  def db = dbConfig(app).get[JdbcProfile].db

  def config(implicit app: Application) = Application.instanceCache[Configuration].apply(app)

  def database(implicit app: Application) = Application.instanceCache[DBApi].apply(app).databases()(0)

  def silhouette = Application.instanceCache[Silhouette[AuthEnv]].apply(app)

  def credentialsProvider = Application.instanceCache[CredentialsProvider].apply(app)

  def passwordHasher = Application.instanceCache[PasswordHasher].apply(app)

  def authenticatorService = Application.instanceCache[JWTAuthenticatorService].apply(app)

  def cleanUpDb() {
    Evolutions.cleanupEvolutions(database(app))
  }

  implicit val emptyRequest = FakeRequest("GET", "/")

  def getToken(login: Login): Future[String] = authenticatorService.create(LoginInfo("credentials", login.email))
    .flatMap(x => authenticatorService.init(x))


  def createLogin(mail: String): Future[Login] = {
    val pwInfo = passwordHasher.hash("")
    db.run(insertAndReturn[Login,LoginTable](LoginTable.login,Login(None, mail, Some(pwInfo.password), Some(pwInfo.salt.getOrElse("")), Some(pwInfo.hasher), "credentials", mail, true)))
  }

  def createOrganizer(name: String, mail: String): Future[(Login,Organizer,String)] = {
    createLogin(mail).flatMap { case login =>
      db.run(insertAndReturn[Organizer,OrganizerTable](OrganizerTable.organizer,Organizer(None, name, login.id.getOrElse(-1), None)))
        .map(o => (login,o))
    }.flatMap { case (l,o) =>
        getToken(l).map(t => (l,o,t))
    }
  }

  def createOrganizer(): Future[(Login,Organizer,String)] = createOrganizer("testorganizer", "testorganizer@test.de")

  def createUser(mail: String): Future[(Login,User,String)] = {
    createLogin(mail).flatMap { case login =>
      db.run(insertAndReturn[User,UserTable](UserTable.user,User(None, login.id.getOrElse(-1), None)))
        .map(o => (login,o))
    }.flatMap { case (l,o) =>
        getToken(l).map(t => (l,o,t))
    }
  }

  def createUser(): Future[(Login,User,String)] = createUser("testuser@test.de")

  def createLocation(name: String, lat: Float, long: Float): Future[Location] = {
    db.run(insertAndReturn[Location,LocationTable](LocationTable.location,Location(None, name, lat, long)))
  }

  def createLocation(): Future[Location] = createLocation("testlocation", 0, 0)

  def createEvent(name: String, from: Timestamp, to: Timestamp, creatorId: Option[Int], locationId: Int): Future[Event] = {
    db.run(insertAndReturn[Event,EventTable](EventTable.event,Event(None,
                                                                    name, from, to, creatorId, locationId)))
  }

  def createEvent(): Future[Event] = {
    createOrganizer().zip(createLocation()).flatMap { case (org,loc) =>
      createEvent("testevent", new Timestamp(0), new Timestamp(0), org._2.id, loc.id.getOrElse(-1))
    }
  }

  def createEvent(org: Organizer): Future[Event] = {
    createLocation().flatMap { case loc =>
      createEvent("testevent", new Timestamp(0), new Timestamp(0), org.id, loc.id.getOrElse(-1))
    }
  }
}
