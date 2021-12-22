locals {
  cluster_name = var.cluster_resource.name
}

resource "aws_lb" "load_balancer" {
  name = "${var.api_lb_name}-lb"
  internal = false
  load_balancer_type = "application"

  subnets = var.load_balancer_subnets
  security_groups = var.load_balancer_security_groups

  enable_deletion_protection = false

  tags = {
    terraform = true
  }
}

resource "aws_lb_listener" "load_balancer_listener" {
  load_balancer_arn = aws_lb.load_balancer.arn
  port = "80"
  protocol = "HTTP"

  default_action {
    type = "forward"
    target_group_arn = aws_alb_target_group.target_group.arn
  }
}

resource "aws_alb_target_group" "target_group" {
  name = "${var.tg_name}-tg"
  port = 80
  protocol = "HTTP"
  vpc_id = var.target_group_vpc_id
  target_type = "ip"

  health_check {
    enabled = true
    path = "/health"
    interval = 60
    protocol = "HTTP"
  }

  tags = {
    terraform = true
  }
}

