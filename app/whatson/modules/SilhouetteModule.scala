package whatson.modules

import scala.collection.immutable._

import com.google.inject.{AbstractModule, Provides}
import com.mohiva.play.silhouette.api.{Environment, EventBus, Silhouette, SilhouetteProvider}
import com.mohiva.play.silhouette.api.crypto._
import com.mohiva.play.silhouette.api.repositories.AuthInfoRepository
import com.mohiva.play.silhouette.api.services._
import com.mohiva.play.silhouette.api.util._
import com.mohiva.play.silhouette.crypto._
import com.mohiva.play.silhouette.impl.authenticators._
import com.mohiva.play.silhouette.impl.providers._
import com.mohiva.play.silhouette.impl.providers.oauth2._
import com.mohiva.play.silhouette.impl.providers.state._
import com.mohiva.play.silhouette.impl.util._
import com.mohiva.play.silhouette.impl.services._
import com.mohiva.play.silhouette.password.BCryptPasswordHasher
import net.ceedubs.ficus.Ficus._
import net.ceedubs.ficus.readers.ArbitraryTypeReader._
import net.codingwell.scalaguice.ScalaModule
import play.api.Configuration
import play.api.libs.concurrent.Execution.Implicits._
import play.api.libs.ws.WSClient
import play.api.mvc.DefaultCookieHeaderEncoding
import whatson.service._
import whatson.service.geocoder._
import whatson.auth._
import whatson.util._
import com.google.inject._
import com.mohiva.play.silhouette.api.Env


class SilhouetteModule extends AbstractModule with ScalaModule {
  override def configure() = {
    bind[Silhouette[AuthEnv]].to[SilhouetteProvider[AuthEnv]]

    bind[PasswordHasher].toInstance(new BCryptPasswordHasher())
    bind[FingerprintGenerator].toInstance(new DefaultFingerprintGenerator(false))
    bind[EventBus].toInstance(EventBus())
    bind[Clock].toInstance(Clock())
    bind[IDGenerator].toInstance(new SecureRandomIDGenerator())
    bind[AuthInfoRepository].to[AuthInfoService]
    bind[LoginService].to[LoginServiceImpl]
  }

  @Provides
  def provideHTTPLayer(client: WSClient): HTTPLayer = new PlayHTTPLayer(client)

  @Provides
  def provideEnvironment(
    authenticatorService: AuthenticatorService[JWTAuthenticator],
    eventBus: EventBus,
    loginService: LoginService
  ): Environment[AuthEnv] = {
    Environment[AuthEnv](loginService, authenticatorService, Seq.empty, eventBus)
  }

  @Provides
  def provideAuthenticatorCrypter(): Crypter = {
    val settings = JcaCrypterSettings("changeme")
    new JcaCrypter(settings)
  }

  @Provides
  def provideCrypterAuthenticatorEncoder(crypter: Crypter): CrypterAuthenticatorEncoder = {
    new CrypterAuthenticatorEncoder(crypter)
  }

  @Provides
  def provideCrypterAuthenticatorEncoder(encoder: CrypterAuthenticatorEncoder): AuthenticatorEncoder = encoder

  @Provides
  def provideJWTAuthenticatorSettings(): JWTAuthenticatorSettings = {
    JWTAuthenticatorSettings(sharedSecret = "changeme")
  }

  @Provides
  def provideJWTAuthenticatorService(
    encoder: CrypterAuthenticatorEncoder, encoding: DefaultCookieHeaderEncoding,
    fpg: FingerprintGenerator, idg: IDGenerator, config: Configuration,
    clock: Clock, settings: JWTAuthenticatorSettings
  ): JWTAuthenticatorService = {
    new JWTAuthenticatorService(settings,None,encoder,idg,clock)
  }

  @Provides
  def provideAuthenticatorService(
    jwt: JWTAuthenticatorService): AuthenticatorService[JWTAuthenticator] = jwt

  @Provides
  def provideCredentialsProvider(authInfoRepository: AuthInfoRepository, passwordHasher: PasswordHasher): CredentialsProvider = {
    val passwordHasherRegisty = PasswordHasherRegistry(passwordHasher)
    new CredentialsProvider(authInfoRepository, passwordHasherRegisty)
  }

  @Provides
  def provideAvatarService(httpLayer: HTTPLayer): AvatarService = new GravatarService(httpLayer)

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
  def provideSocialProviderRegistry(googleProvider: GoogleProvider,
    facebookProvider: FacebookProvider): SocialProviderRegistry = {
    SocialProviderRegistry(Seq(facebookProvider,googleProvider))
  }

   /**
   * Provides the Facebook provider.
   *
   * @param httpLayer The HTTP layer implementation.
   * @param stateProvider The OAuth2 state provider implementation.
   * @param configuration The Play configuration.
   * @return The Facebook provider.
   */
  @Provides
  def provideFacebookProvider(
    httpLayer: HTTPLayer,
    stateProvider: SocialStateHandler,
    configuration: Configuration): FacebookProvider = {

    new FacebookProvider(httpLayer, stateProvider,
                         configuration.underlying.as[OAuth2Settings]("silhouette.facebook"))
  }

  /**
    * Provides the Facebook provider.
    *
    * @param httpLayer The HTTP layer implementation.
    * @param stateProvider The OAuth2 state provider implementation.
    * @param configuration The Play configuration.
    * @return The Facebook provider.
    */
  @Provides
  def provideGoogleProvider(
    httpLayer: HTTPLayer,
    stateProvider: SocialStateHandler,
    configuration: Configuration): GoogleProvider = {

    new GoogleProvider(httpLayer, stateProvider,
                         configuration.underlying.as[OAuth2Settings]("silhouette.google"))
  }

  /**
    * Provides the SocialStateHandler.
    *
    */
  @Provides
  def provideSocialStateHandler(
    csrfHandler: CsrfStateItemHandler,
    signer: Signer,
    configuration: Configuration): SocialStateHandler = {
    new DefaultSocialStateHandler(Set(),signer)
  }

  /**
    * Provides the JcaSigner.
    */
  @Provides
  def provideJcaSigner(
    configuration: Configuration): Signer = {
    new JcaSigner(configuration.underlying.as[JcaSignerSettings]("silhouette.signer"))
  }

  /**
    * Provides the CsrfStateSettings.
    */
  @Provides
  def provideCsrfStateSettings(
    configuration: Configuration): CsrfStateSettings = {
    configuration.underlying.as[CsrfStateSettings]("silhouette.csrfState")
  }
}
