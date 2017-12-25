cd ./webapp/
npm install
npm run build
cd ../
sbt ++$TRAVIS_SCALA_VERSION test
