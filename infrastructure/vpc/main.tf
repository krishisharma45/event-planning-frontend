module "vpc" {
  source   = "terraform-aws-modules/vpc/aws"
  version  = "2.78.0"

  name = var.vpc_name
  cidr = "10.0.0.0/16"

  azs                     = var.azs
  private_subnets         = var.private_subnets
  public_subnets          = var.public_subnets

  enable_nat_gateway      = true
  enable_vpn_gateway      = false
  single_nat_gateway      = true
  one_nat_gateway_per_az  = false

  enable_dns_hostnames    = true
  enable_dns_support      = true

  tags = {
    Terraform   = true
    Environment = var.env
  }
}