resource "aws_security_group" "allow_postgres_db" {
  name        = "allow_postgres_db"
  description = "Allow postgres inbound traffic"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description = "Postgres database ingress"
    from_port   = 5432
    to_port     = 5432
    protocol    = "tcp"
    cidr_blocks = [module.vpc.vpc_cidr_block]
  }

  egress {
    from_port        = 0
    to_port          = 0
    protocol         = "-1"
    cidr_blocks      = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    Name      = "allow_postgres_db"
    Terraform = true
  }
}
