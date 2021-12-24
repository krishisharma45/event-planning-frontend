variable "cluster_resource" {}
variable "api_lb_name" {}
variable "tg_name" {}
variable "region" {}
variable "service_security_groups" {}
variable "service_allowable_subnets" {}
variable "task_container_name" {}
variable "task_definition_family_name" {}
variable "docker_image_url" {}
variable "memory_value" {
  type = number
  description = "The memory value to apply to a task for how much it likely needs to function."
  default = 512
}

variable "cpu_unit" {
  type = number
  description = "The CPU unit to apply to a task for much it needs to function."
  default = 256
}

variable "task_role_arn" {
  type = string
  description = "The role of the application you deploy."
  default = ""
}

variable "execution_role_arn" {
  type = string
  description = "The ECS Execution while provisioning and deploying your service."
  default = ""
}
variable "load_balancer_subnets" {}
variable "load_balancer_security_groups" {}
variable "target_group_vpc_id" {}

variable "desired_task_count" {
  default = 1
  type = number
  description = "The desired count of tasks when we deploy the service."
}