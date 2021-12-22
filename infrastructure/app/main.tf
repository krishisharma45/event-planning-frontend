locals {
  snake_project_name = "event_planning"
  dash_project_name = "event-planning"
  ecr_repo_name = local.dash_project_name
  api_lb_name = local.dash_project_name
  tg_name     = local.dash_project_name
}

module "docker_repo_to_push" {
  source   = "./ecr"
  ecr_docker_repo_name = local.dash_project_name
}


module "ecs_deploy" {
  source  = "./ecs"

  cluster_resource   = var.aws_cluster
  docker_image_url   = module.docker_repo_to_push.image_url
  region             = var.region
  task_definition_family_name = local.snake_project_name
  task_container_name = local.snake_project_name

  service_allowable_subnets = var.service_subnets
  service_security_groups   = var.service_security_groups

  api_lb_name        = local.api_lb_name
  tg_name            = local.tg_name
  load_balancer_subnets =  var.load_balancer_subnets
  load_balancer_security_groups = var.load_balancer_security_groups

  target_group_vpc_id = var.vpc_id
}

module "ci_project_setup" {
  source = "./codebuild"
  github_token_arn = var.github_token_arn
  codebuild_project_name = local.snake_project_name
  project_description = "Event planning application for Krishi + Luv's wedding"
  github_url          = "https://github.com/krishisharma45/event-planning-frontend/"

  vpc_config = {
    vpc_id  = var.vpc_id
    subnets = var.codebuild_subnet_ids
    security_group_ids = [var.codebuild_security_group_id]
  }
}

module "pipeline" {
  source = "./codepipeline"

  project_name = local.snake_project_name
  codebuild_project_name = module.ci_project_setup.master_project_name
  ecs_cluster_name = var.aws_cluster.name
  ecs_service_name = module.ecs_deploy.ecs_service_name
  github_repo_name = "krishisharma45/event-planning-frontend"
}

