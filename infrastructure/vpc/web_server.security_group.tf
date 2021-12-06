resource "aws_security_group" "allow_web_server" {
  name        = "allow_web_server"
  description = "Allow web server inbound traffic"
  vpc_id      = module.vpc.vpc_id

  ingress {
    description = "Web server ingress 8080"
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = [module.vpc.vpc_cidr_block]
  }

  ingress {
    description = "Web server ingress 80"
    from_port   = 80
    to_port     = 80
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
    Name      = "allow_web_server"
    Terraform = true
    Env       = var.env
  }
}

