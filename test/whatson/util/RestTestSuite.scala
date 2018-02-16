package whatson.util

import slick.jdbc.PostgresProfile.api._
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
import play.api.libs.Files._
import play.api.inject._


class RestTestSuite extends PlaySpec with TestSuiteMixin
    with GuiceOneAppPerTest with Injecting
    with MockitoSugar {
  val mailService = mock[MailService]

  implicit override def newAppForTest(testData: TestData): Application = {
    val app = new GuiceApplicationBuilder()
      .overrides(TestModule(mailService))
      .build()

    Application.instanceCache[ApplicationLifecycle].apply(app).addStopHook { () =>
      cleanUpDb()
      Future.successful(())
    }

    app
  }

  def dbConfig(implicit app: Application) = Application.instanceCache[DatabaseConfigProvider].apply(app)

  def db = dbConfig(app).get[JdbcProfile].db

  def config(implicit app: Application) = Application.instanceCache[Configuration].apply(app)

  def database(implicit app: Application) = Application.instanceCache[DBApi].apply(app).databases()(0)

  def silhouette = Application.instanceCache[Silhouette[AuthEnv]].apply(app)

  def credentialsProvider = Application.instanceCache[CredentialsProvider].apply(app)

  def passwordHasher = Application.instanceCache[PasswordHasher].apply(app)

  def authenticatorService = Application.instanceCache[JWTAuthenticatorService].apply(app)

  def temporaryFileCreator = Application.instanceCache[TemporaryFileCreator].apply(app)

  def cleanUpDb() {
    Evolutions.cleanupEvolutions(database(app))
  }

  implicit val emptyRequest = FakeRequest("GET", "/")

  def getToken(login: Login): Future[String] = authenticatorService.create(LoginInfo("credentials", login.email))
    .flatMap(x => authenticatorService.init(x))


  def createLogin(mail: String): Future[Login] = createLogin(mail,true)

  def createLogin(mail: String, confirmed: Boolean): Future[Login] = {
    val pwInfo = passwordHasher.hash("")
    db.run(insertAndReturn[Login,LoginTable](LoginTable.login,Login(None, mail, Some(pwInfo.password), Some(pwInfo.salt.getOrElse("")), Some(pwInfo.hasher), "credentials", mail, confirmed)))
  }

  def createOrganizer(name: String = "testorganizer", mail: String = "testorganizer@test.de", confirmed: Boolean = true): Future[(Login,Organizer,String)] = {
    createLogin(mail, confirmed).flatMap { case login =>
      db.run(insertAndReturn[Organizer,OrganizerTable](OrganizerTable.organizer,Organizer(None, name, login.id.getOrElse(-1), None)))
        .map(o => (login,o))
    }.flatMap { case (l,o) =>
        getToken(l).map(t => (l,o,t))
    }
  }

  def createUser(mail: String): Future[(Login,User,String)] = {
    createLogin(mail).flatMap { case login =>
      db.run(insertAndReturn[User,UserTable](UserTable.user,User(None, login.id.getOrElse(-1), None)))
        .map(o => (login,o))
    }.flatMap { case (l,o) =>
        getToken(l).map(t => (l,o,t))
    }
  }

  def createUser(): Future[(Login,User,String)] = createUser("testuser@test.de")

  def createLocation(name: String = "testlocation", lat: Float = 0.0f, long: Float = 0.0f): Future[Location] = {
    db.run(insertAndReturn[Location,LocationTable](LocationTable.location,Location(None, name, lat, long)))
  }

  def createCategory(name: String = "testcategory", parentId: Option[Int] = None): Future[Category] = {
    parentId.map(Future.successful(_)).getOrElse(db.run(CategoryTable.category.result).map(x => x.head.id.getOrElse(-1))).flatMap { parent =>
      db.run(insertAndReturn[Category,CategoryTable](CategoryTable.category,Category(None, name, parent)))
    }
  }

  def createEvent(org: Option[Organizer] = None, name: String = "testevent",
                  from: Timestamp = new Timestamp(0), to: Timestamp = new Timestamp(0),
                  description: String = "testdescription", locationId: Option[Int] = None): Future[Event] = {

    org.map(Future.successful(_)).getOrElse(createOrganizer().map(_._2))
      .zip(locationId.map(Future.successful(_)).getOrElse(createLocation().map(_.id.getOrElse(-1)))).flatMap { case (org,loc) =>
        db.run(insertAndReturn[Event,EventTable](EventTable.event,
                                                 Event(None, name, from, to, description, org.id, loc)))
    }
  }

  def createImage(name: String = "testimage", contents: Array[Byte] = Array(1,2,3,4)): Future[Image] = {
    db.run(insertAndReturn[Image,ImageTable](ImageTable.image,Image(None, name, contents,"image/jpeg")))
  }
}
