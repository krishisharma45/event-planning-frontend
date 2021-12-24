variable "project_name" {}
variable "ecs_cluster_name" {}
variable "ecs_service_name" {}
variable "image_definition_file_path" {
  default = "imagedefinitions.json"
}
variable "deployment_timeout" {
  default = "15"
}
variable "codebuild_project_name" {}
variable "github_repo_name" {}