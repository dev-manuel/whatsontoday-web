name := """WhatsOn"""
organization := "com.whatson"

version := "1.0-SNAPSHOT"

scalaVersion in ThisBuild := "2.12.2"

lazy val root = (project in file(".")).enablePlugins(PlayScala, SwaggerPlugin)

swaggerDomainNameSpaces := Seq("whatson.model")

scalaVersion := "2.12.2"

libraryDependencies ++= Seq(
  "org.webjars" % "swagger-ui" % "2.2.0",
  "org.postgresql" % "postgresql" % "9.4-1206-jdbc42",
  "com.typesafe.play" %% "play-slick" % "3.0.0",
  "com.typesafe.play" %% "play-slick-evolutions" % "3.0.0",
  "org.mindrot" % "jbcrypt" % "0.3m",
  "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.0" % Test,
  guice,
  "com.mohiva" %% "play-silhouette" % "5.0.0",
  "com.mohiva" %% "play-silhouette-password-bcrypt" % "5.0.0",
  "com.mohiva" %% "play-silhouette-crypto-jca" % "5.0.0",
  "com.mohiva" %% "play-silhouette-persistence" % "5.0.0",
  "com.mohiva" %% "play-silhouette-testkit" % "5.0.0" % "test",
  "net.codingwell" %% "scala-guice" % "4.1.1",
  ehcache,
  "com.iheart" %% "ficus" % "1.4.3",
  "com.typesafe.play" %% "play-mailer" % "6.0.1",
  "com.typesafe.play" %% "play-mailer-guice" % "6.0.1"
)

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.whatson.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.whatson.binders._"

javaOptions in Test += "-Dconfig.file=conf/application.test.conf"
