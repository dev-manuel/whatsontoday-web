echo "Hello from deploy.sh"

if [[ $TRAVIS_BRANCH = "master"  &&  $TRAVIS_PULL_REQUEST = false ]]
then
    echo "Deploying new version to server"

    cd $TRAVIS_BUILD_DIR
    cd webapp
    npm install
    npm run build -- --env.API_BASE_URL=https://www.whats-on.today:443/api/v1 --env.LOG_LEVEL=debug
    cd ..
    sbt dist
    export SSHPASS=$DEPLOY_PASS
    sshpass -e scp -o stricthostkeychecking=no ./target/universal/whatson-1.0-SNAPSHOT.zip $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
    sshpass -e ssh -o stricthostkeychecking=no $DEPLOY_USER@$DEPLOY_HOST $DEPLOY_PATH/start.sh
fi

if [[ $TRAVIS_BRANCH = "develop"  &&  $TRAVIS_PULL_REQUEST = false ]]
then
    echo "Deploying new test version to server"

    cd $TRAVIS_BUILD_DIR
    cd webapp
    npm install
    npm run build -- --env.API_BASE_URL=https://www.whats-on.today:3443/api/v1 --env.LOG_LEVEL=debug
    cd ..
    sbt dist
    export SSHPASS=$DEPLOY_PASS
    mv ./target/universal/whatson-1.0-SNAPSHOT.zip ./target/universal/whatson-1.0-QA.zip
    sshpass -e scp -o stricthostkeychecking=no ./target/universal/whatson-1.0-QA.zip $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
    sshpass -e ssh -o stricthostkeychecking=no $DEPLOY_USER@$DEPLOY_HOST $DEPLOY_PATH/qa.sh
fi
