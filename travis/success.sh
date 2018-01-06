if [ $TRAVIS_BRANCH = "develop" ]
then
    echo "Updating api documentation..."
    cd $TRAVIS_BUILD_DIR
    sbt swagger
    git clone git://${GH_REPO} $HOME/$REPO
    cp $TRAVIS_BUILD_DIR/target/swagger/swagger.json $HOME/$REPO/rest_doc
    cd $HOME/$REPO/rest_doc
    git remote
    git config user.email ${EMAIL}
    git config user.name ${USER}
    git add swagger.json
    git commit -m "Travis auto-commit"
    git push "https://${GH_TOKEN}@${GH_REPO}" master > /dev/null 2>&1
    echo "Done!"
else
    echo "Not updating api documentation because this is not a build of the develop branch"
fi