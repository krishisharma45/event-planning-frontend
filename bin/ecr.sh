sh ./bin/login.sh
docker build -t luvandkrishi .
sh ./bin/tag.sh
sh ./bin/push.sh
echo 'pushed new version of image to ECR'