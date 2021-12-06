resource "aws_ecs_task_definition" "ecs_task_def" {
  family                   = var.task_definition_family_name
  cpu                      = var.cpu_unit
  memory                   = var.memory_value
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]

  execution_role_arn = coalesce(aws_iam_role.execution_role.arn, var.execution_role_arn)
  task_role_arn      = coalesce(aws_iam_role.task_role.arn, var.task_role_arn)

  container_definitions = <<TASK_DEFINITION
    [
      {
        "name": "${var.task_container_name}",
        "image": "${var.image_url}",
        "environment": [
            {"name": "ENV", "value": "PROD"}
        ],
        "essential": true,
        "portMappings": [
          {
            "containerPort": 57000
          }
        ],
        "logConfiguration": {
          "logDriver": "awslogs",
          "options": {
            "awslogs-group": "${aws_cloudwatch_log_group.web_service_logs.name}",
            "awslogs-region": "${var.region}"
            "awslogs-stream-prefix": "ecs"
          }
        }
      }
    ]
TASK_DEFINITION
}

resource "aws_cloudwatch_log_group" "web_service_logs" {
  name = "/ecs/${var.task_definition_family_name}"

  tags = {
    Terraform = true
  }
}

