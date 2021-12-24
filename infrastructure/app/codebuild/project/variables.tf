variable "codebuild_project_name" {}
variable "github_url" {}
variable "project_description" {}
variable "codebuild_service_role_arn" {}

variable "buildspec_file_name" {
  default = "buildspec.master.yml"
}

variable "vpc_config" {
  type = object({
    security_group_ids = set(string),
    subnets = set(string),
    vpc_id = string
  })
}

variable "compute_type" {
  default = "BUILD_GENERAL1_SMALL"
}

variable "image" {
  default = "aws/codebuild/amazonlinux2-x86_64-standard:3.0"
}