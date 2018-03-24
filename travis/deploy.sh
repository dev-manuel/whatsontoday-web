echo "Hello from deploy.sh"

cd $TRAVIS_BUILD_DIR
cd webapp
npm install
npm run build -- --env.API_BASE_URL=https://www.whats-on.today:3443/api/v1 --env.LOG_LEVEL=debug
cd ..
sbt dist
sshpass -p ${SSH_ROOT} scp ./target/universal/whatson-1.0-SNAPSHOT.zip root@whats-on.today:~

if [ $TRAVIS_BRANCH = "master" ]
then
    echo "Deploying new version to server"
fi
