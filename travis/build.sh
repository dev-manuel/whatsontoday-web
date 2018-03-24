#cd ./webapp/ &&
#npm install &&
#npm run testCov &&
#npm run build -- --env.API_BASE_URL=http://localhost:9000 &&
#cd ../ &&
#sbt ++$TRAVIS_SCALA_VERSION coverage test coverageReport swagger
