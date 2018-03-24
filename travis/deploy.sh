echo "Hello from deploy.sh"

if [ $TRAVIS_BRANCH = "master" ] && [ $TRAVIS_PULL_REQUEST -eq false ]
then
    echo "Deploying new version to server"

    cd $TRAVIS_BUILD_DIR
    cd webapp
    npm install
    npm run build -- --env.API_BASE_URL=https://www.whats-on.today:3443/api/v1 --env.LOG_LEVEL=debug
    cd ..
    sbt dist
    export SSHPASS=$DEPLOY_PASS
    sshpass -e scp -o stricthostkeychecking=no ./target/universal/whatson-1.0-SNAPSHOT.zip $DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH
    sshpass -e ssh -o stricthostkeychecking=no $DEPLOY_USER@$DEPLOY_HOST $DEPLOY_PATH/start.sh
fi
