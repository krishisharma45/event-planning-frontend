sh ./bin/aws_login.sh
sh ./bin/docker_build.sh
sh ./bin/tag_image.sh
sh ./bin/push_image.sh
echo 'pushed new version of image to ECR'