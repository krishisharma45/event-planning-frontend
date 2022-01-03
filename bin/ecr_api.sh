aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 527761931337.dkr.ecr.us-east-1.amazonaws.com
docker build -t practice-ecr -f ./services/api/Dockerfile .
docker tag practice-ecr:latest 527761931337.dkr.ecr.us-east-1.amazonaws.com/practice-ecr:latest
docker push 527761931337.dkr.ecr.us-east-1.amazonaws.com/practice-ecr:latest