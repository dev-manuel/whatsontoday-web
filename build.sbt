name := """WhatsOn"""
organization := "com.whatson"

version := "1.0-SNAPSHOT"

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
  guice
)

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.whatson.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.whatson.binders._"
