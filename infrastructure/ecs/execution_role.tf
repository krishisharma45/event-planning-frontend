resource "aws_iam_role" "execution_role" {
  name                = var.execution_policy_name
  assume_role_policy  = <<EOF
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": "ecs-tasks.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
        }
      ]
    }
    EOF

  tags = {
    Terraform = true
  }
}

resource "aws_iam_role_policy" "execution_policy" {
  name    = var.execution_policy_name
  role    = aws_iam_role.execution_role.name

  policy  = <<POLICY
    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Action": [
            "logs:CreateLogStream",
            "logs:PutLogEvents",
            "ecr:BatchCheckLayerAvailability",
            "ecr:BatchGetImage",
            "ecr:GetAuthorizationToken",
            "ecr:GetDownloadUrlForLayer"
          ],
          "Resource": [
            "*"
          ]
        }
      ]
    }
POLICY
}