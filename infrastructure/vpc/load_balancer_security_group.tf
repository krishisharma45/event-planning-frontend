resource "aws_security_group" "allow_80" {
  name = "allow-80-tf"
  description = "Allow web server inbound traffic to port 80"
  vpc_id = module.vpc.vpc_id

  ingress {
    description = "Load Balancer IPv4 Ingress 80"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Load Balancer IPv6 Ingress 80"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    ipv6_cidr_blocks = ["::/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
    ipv6_cidr_blocks = ["::/0"]
  }

  tags = {
    name = "allow_80"
    terraform = "true"
    environment = var.env
  }
}