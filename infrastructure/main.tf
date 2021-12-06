terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.0"
    }
  }

  backend "s3" {
    bucket = "terraform-event-planning-state"
  }
}

provider "aws" {
  region = "us-east-1"
}

locals {
  project_name  = "event_planning"
  repo_name     = "event_planning"
}

module vpc {
  source          = "./vpc"
  vpc_name        = local.project_name
  azs             = ["azs"]
  private_subnets = ["private_subnets"]
  public_subnets  = ["public_subnets"]
  env             = "PROD"
}

module app_image {
  source        = "./ecr"
  ecr_repo_name = local.repo_name
}

module ecs_deploy {
  source                       = "./ecs"
  cluster_name                 = local.repo_name
  image_url                    = module.app_image.image_url
  region                       = "us-east-1"
  task_definition_family_name  = local.project_name
  task_container_name          = local.project_name

  service_subnets              = ["subnets"]
  service_security_groups      = ["sg-name"]
}

module database {
  source                       = "./rds"
  private_subnets              = ["private-subnets"]
  database_identifier          = local.project_name
  database_instance_class      = "db.t2.micro"
  database_storage             = 2
  database_max_storage         = 2
  service_security_groups      = ["sg-name"]
}

