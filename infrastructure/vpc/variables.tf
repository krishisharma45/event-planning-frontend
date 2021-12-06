variable "vpc_name" {
  type        = string
  definition  = "The name of the VPC"
}

variable "azs" {
  type        = list(string)
  definition  = "The Availability Zones in which the VPC is in"
}

variable "private_subnets" {
  type        = list(string)
  definition  = "The private subnets in the VPC"
}

variable "public_subnets" {
  type        = list(string)
  definition  = "The public subnets in the VPC"
}

variable "env" {
  type        = string
  definition  = "The environment for which the resource is being provisioned for"
}