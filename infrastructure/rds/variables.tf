variable "private_subnets" {
  type        = list(string)
  definition  = "The private subnets in the VPC"
}

variable "database_identifier" {
  type        = string
  definition  = "The database identifier for the RDS instance"
}

variable "database_instance_class" {
  type        = string
  definition  = "The instance class for the RDS instance"
}

variable "database_storage" {
  type        = number
  definition  = "The amount, in GBs, of allocated storage for the RDS instance"
}

variable "database_max_storage" {
  type        = number
  definition  = "The maximum amount, in GBs, of allocated storage for the RDS instance"
}

variable "service_security_groups" {
  type        = list(string)
  definition  = "The security groups for the RDS instance"
}






