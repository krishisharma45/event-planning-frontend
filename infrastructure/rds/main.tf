data "aws_secretsmanager_secret" "by-arn" {
  arn = "put_arn_for_db_here"
}

data "aws_secretsmanager_secret_version" "this" {
  secret_id = data.aws_secretsmanager_secret.by-arn.id
}

locals {
  username = jsondecode(data.aws_secretsmanager_secret_version.this.secret_string)["username"]
  password = jsondecode(data.aws_secretsmanager_secret_version.this.secret_string)["password"]
}

resource "aws_db_parameter_group" "this" {
  name     = "rds-pg"
  family   = "postgres12"

  parameter {
    name  = "log_connections"
    value = "1"
  }

  parameter {
    name  = "autovacuum"
    value = 1
  }

  parameter {
    name  = "client_encoding"
    value = "utf8"
  }
}

resource "aws_db_subnet_group" "this" {
  name       = "pg-private-subnet-group"
  subnet_ids = var.private_subnets
}

module "db" {
  source                    = "terraform-aws-modules/rds/aws"
  version                   = "~>3.0"

  identifier                = var.database_identifier

  create_db_option_group    = false
  create_db_parameter_group = false

  engine                    = "postgres"
  engine_version            = "12"
  family                    = "postgres12"
  instance_class            = var.database_instance_class
  allocated_storage         = var.database_storage
  max_allocated_storage     = var.database_max_storage

  name                      = var.database_identifier
  username                  = local.username
  password                  = local.password
  port                      = "5432"

  multi_az                  = false

  iam_database_authentication_enabled = false

  vpc_security_group_ids    = var.service_security_groups

  maintenance_window        = "Mon:00:00-Mon:03:00"
  backup_window             = "03:00-06:00"

  monitoring_interval       = "30"
  monitoring_role_name      = "MyRDSMonitoringRole"
  create_monitoring_role    = true

  tags = {
    Terraform = "True"
  }

  subnet_ids = var.private_subnets

  deletion_protection = true
}