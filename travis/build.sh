cd ./webapp/
npm install
npm test
npm run build
cd ../
sbt ++$TRAVIS_SCALA_VERSION test
