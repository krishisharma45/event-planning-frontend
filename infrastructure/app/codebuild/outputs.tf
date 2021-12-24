output "codebuild_role_arn" {
  value = aws_iam_role.codebuild_role.arn
}

output "master_project_name" {
  value = module.master_project.codebuild_project_name
}