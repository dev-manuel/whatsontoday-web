package whatson.auth

import com.google.inject.{AbstractModule, Provides}
import com.mohiva.play.silhouette.api.{Environment, EventBus, Silhouette, SilhouetteProvider}
import com.mohiva.play.silhouette.api.crypto.{Crypter, CrypterAuthenticatorEncoder}
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services._
import com.mohiva.play.silhouette.api.util._
import com.mohiva.play.silhouette.crypto.{JcaCrypter, JcaCrypterSettings}
import com.mohiva.play.silhouette.impl.authenticators._
import com.mohiva.play.silhouette.impl.providers._
import com.mohiva.play.silhouette.impl.util._
import com.mohiva.play.silhouette.password.BCryptPasswordHasher
import net.codingwell.scalaguice.ScalaModule
import play.api.Configuration
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.ws.WSClient
import play.api.mvc.DefaultCookieHeaderEncoding
import whatson.auth._
import whatson.service._

class SilhouetteModule extends AbstractModule with ScalaModule {
   override def configure() = {
    bind[Silhouette[AuthEnv]].to[SilhouetteProvider[AuthEnv]]
    bind[PasswordHasher].toInstance(new BCryptPasswordHasher())
    bind[FingerprintGenerator].toInstance(new DefaultFingerprintGenerator(false))
    bind[EventBus].toInstance(EventBus())
    bind[Clock].toInstance(Clock())
    bind[IDGenerator].toInstance(new SecureRandomIDGenerator())
    bind[AuthInfoRepository].to[AuthInfoService]
    bind[UserService].to[UserServiceImpl]
  }

  @Provides
  def provideHTTPLayer(client: WSClient): HTTPLayer = new PlayHTTPLayer(client)

  @Provides
  def provideEnvironment(
    authenticatorService: AuthenticatorService[JWTAuthenticator],
    eventBus: EventBus,
    userService: UserService
  ): Environment[AuthEnv] = {
    Environment[AuthEnv](userService, authenticatorService, Seq.empty, eventBus)
  }

  @Provides
  def provideAuthenticatorCrypter(): Crypter = {
    val settings = JcaCrypterSettings("changeme")
    new JcaCrypter(settings)
  }

  @Provides
  def provideAuthenticatorService(
    crypter: Crypter, encoding: DefaultCookieHeaderEncoding,
    fpg: FingerprintGenerator, idg: IDGenerator, config: Configuration, clock: Clock
  ): AuthenticatorService[JWTAuthenticator] = {
    val authenticatorEncoder = new CrypterAuthenticatorEncoder(crypter)
    val e = JWTAuthenticatorSettings(sharedSecret = "changeme")
    new JWTAuthenticatorService(e,None,authenticatorEncoder,idg,clock)
  }

  @Provides
  def provideCredentialsProvider(authInfoRepository: AuthInfoRepository, passwordHasher: PasswordHasher): CredentialsProvider = {
    val passwordHasherRegisty = PasswordHasherRegistry(passwordHasher)
    new CredentialsProvider(authInfoRepository, passwordHasherRegisty)
  }
  
  /**
   * Provides the social provider registry.
   *
   * @param facebookProvider The Facebook provider implementation.
   * @param googleProvider The Google provider implementation.
   * @param vkProvider The VK provider implementation.
   * @param twitterProvider The Twitter provider implementation.
   * @param xingProvider The Xing provider implementation.
   * @return The Silhouette environment.
   */
  @Provides
  def provideSocialProviderRegistry(
    /*facebookProvider: FacebookProvider*/): SocialProviderRegistry = {

    SocialProviderRegistry(Seq(/*facebookProvider*/))
  }
  
    /**
   * Provides the Facebook provider.
   *
   * @param httpLayer The HTTP layer implementation.
   * @param stateProvider The OAuth2 state provider implementation.
   * @param configuration The Play configuration.
   * @return The Facebook provider.
   */
  /*@Provides
  def provideFacebookProvider(
    httpLayer: HTTPLayer,
    stateProvider: DefaultSocialStateHandler,
    configuration: Configuration): FacebookProvider = {

    new FacebookProvider(httpLayer, stateProvider, s)
  }*/
}
