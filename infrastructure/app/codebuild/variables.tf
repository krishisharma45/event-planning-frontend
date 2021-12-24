variable "github_token_arn" {}
variable "codebuild_project_name" {}
variable "github_url" {}
variable "project_description" {}
variable "codebuild_service_role_arn" {
  default = ""
}
variable "vpc_config" {}
variable "vpc_id" {
  default = null
}
variable "private_subnet_ids" {
  default = null
}
variable "security_group_ids" {
  default = null
}