terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = "~> 3.36.0"
    }
  }

  backend "s3" {
    bucket = "event-planning-terraform-state"
    key = "all"
    region = "us-east-1"
  }
}

provider "aws" {
  region = "us-east-1"
}

locals {
  env = "PROD"
  snake_project_name = "event_planning"
  dash_project_name = "event-planning"
  database_name = "${local.dash_project_name}-db"
}

module "networking" {
  source = "./vpc"
  env = local.env
  project_name = local.snake_project_name
}


resource "aws_ecs_cluster" "ep_app" {
  name = local.snake_project_name
  setting {
    name = "containerInsights"
    value = "enabled"
  }
}

module "event_planning_db" {
  source  = "./rds"
  pg_secret_arn = "arn:aws:secretsmanager:us-east-1:527761931337:secret:rds/event-planning-db-Lc3jfe"
  database_name = local.database_name
  private_subnet_ids = module.networking.network.public_subnets #change to private subnets later
  security_group_ids = [module.networking.postgres_db_security_group_id]
}

module "event_planning_app" {
  source  = "./app"

  # ECS
  aws_cluster = aws_ecs_cluster.ep_app

  region      = "us-east-1"
  vpc_id      = module.networking.network.vpc_id

  service_subnets = module.networking.network.public_subnets
  service_security_groups     = [module.networking.web_server_security_group_id]

  load_balancer_security_groups = [module.networking.load_balancer_security_group_id]
  load_balancer_subnets       = module.networking.network.public_subnets

  # CodeBuild
  codebuild_security_group_id = module.networking.web_server_security_group_id
  codebuild_subnet_ids        = module.networking.network.private_subnets

  github_token_arn = "arn:aws:secretsmanager:us-east-1:527761931337:secret:codebuild/github_token-5Lllge"
}