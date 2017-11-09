name := """WhatsOn"""
organization := "com.whatson"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala, SwaggerPlugin)

swaggerDomainNameSpaces := Seq("models")

scalaVersion := "2.12.2"

libraryDependencies += guice
libraryDependencies += "org.webjars" % "swagger-ui" % "2.2.0"
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "3.1.0" % Test
libraryDependencies ++= Seq(
  "org.postgresql" % "postgresql" % "9.4-1206-jdbc42",
  "com.typesafe.play" %% "play-slick" % "3.0.0",
  "com.typesafe.play" %% "play-slick-evolutions" % "3.0.0"
)

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.whatson.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.whatson.binders._"
