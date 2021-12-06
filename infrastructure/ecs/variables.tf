variable "cluster_name" {
  description = "ECS Cluster name"
  type        = string
}

variable "region" {
  description = "AWS Region to build the resource - e.g. us-east-1"
}

variable "service_security_groups" {
  description = "Security group name used to deploy this service"
  type        = list(string)
}

variable "service_subnets" {
  description = "A list of subnet names that the service may provision tasks under"
  type        = list(string)
}

variable "task_container_name" {
  description = "The name of the container when running as a task in ECS"
  type        = string
}

variable "task_definition_family_name" {
  description = "The ECS task definition name"
  type        = string
}

variable "image_url" {
  description = "Docker Image URL that the ECS task will pull down for the service"
  type        = string
}

variable "memory_value" {
  type        = number
  default     = 512
  description = "The memory value to apply to a task for how much it likely needs to function. e.g. 512, 1024, 2048. Must be in range of cpu unit values"
}

variable "cpu_unit" {
  type        = number
  default     = 256
  description = "The CPU unit to apply to a task for much it needs it function. e.g. 256(.25 vCPU), 512(.5 vCPU), 1024(1 CPU)"
}

variable "task_role_arn" {
  type        = string
  description = "The role of the application when you deploy. If you do not add a permission here, the application cannot ask for anything for an AWS service."
  default     = ""
}

variable "execution_role_arn" {
  type        = string
  description = "The ECS Execution while provisioning and deploying your service."
  default     = ""
}

variable "desired_task_count" {
  type        = number
  default     = 1
  description = "The desired count of tasks when we deploy the service. Defaults to 1."
}

variable "execution_policy_name" {
  default     = "event_planning"
  type        = string
}

variable "task_role_name" {
  default     = "event_planning"
  type        = string
}