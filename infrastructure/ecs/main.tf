resource "aws_ecs_service" "ecs_service" {
  name            = "${var.task_definition_family_name}_service"
  cluster         = aws_ecs_cluster.ecs_cluster.id
  task_definition = aws_ecs_task_definition.ecs_task_def.arn
  desired_count   = var.desired_task_count
  depends_on      = [aws_iam_role_policy.execution_policy]

  force_new_deployment = false
  launch_type          = "FARGATE"

  network_configuration {
    subnets            = var.service_subnets
    security_groups    = var.service_security_groups
    assign_public_ip   = true
  }

  tags = {
    Terraform = true
  }
}


