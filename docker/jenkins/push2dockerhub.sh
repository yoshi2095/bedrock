#!/bin/bash
# Needs DOCKER_USERNAME, DOCKER_PASSWORD, DOCKER_REPOSITORY
# environment variables.
#
# To set them go to Job -> Configure -> Build Environment -> Inject
# passwords and Inject env variables
#
set -ex

docker login -u $DOCKER_USERNAME -p $DOCKER_PASSWORD -e $DOCKER_USERNAME@example.com

# If pull request use $ghprbActualCommit otherwise use $GIT_COMMIT
COMMIT="${ghprbActualCommit:=$GIT_COMMIT}"
IMAGE=`echo jenkins${JOB_NAME}${BUILD_NUMBER}| sed s/_//g`_web

docker tag -f $IMAGE $DOCKER_REPOSITORY:$COMMIT
docker push $DOCKER_REPOSITORY:$COMMIT

if [[ "$GIT_BRANCH" == "origin/master" ]]; then
    docker tag -f $IMAGE $DOCKER_REPOSITORY:latest
    docker push $DOCKER_REPOSITORY:latest
fi
