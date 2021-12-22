resource "aws_s3_bucket" "codepipeline_bucket" {
  bucket = "codepipeline-event-planning-us-east-1"
  acl = "private"
}

resource "aws_codestarconnections_connection" "github-connection" {
  name = "cp-github-connection"
  provider_type = "GitHub"
}

resource "aws_codepipeline" "codepipeline" {
  name = "${var.project_name}-pipeline"
  role_arn = aws_iam_role.codepipeline_role.arn

  artifact_store {
    location = aws_s3_bucket.codepipeline_bucket.bucket
    type     = "S3"
  }

  stage {
    name = "Source"
    action {
      name = "Source"
      category = "Source"
      owner = "AWS"
      provider = "CodeStarSourceConnection"
      version = "1"
      output_artifacts = ["source_output"]
      configuration = {
        ConnectionArn = aws_codestarconnections_connection.github-connection.arn
        FullRepositoryId = var.github_repo_name
        BranchName = "master"
        OutputArtifactFormat = "CODEBUILD_CLONE_REF"
      }
    }
  }

  stage {
    name = "Build"
    action {
      name = "Build"
      category = "Build"
      owner = "AWS"
      provider = "CodeBuild"
      version = "1"
      input_artifacts = ["source_output"]
      output_artifacts = ["build_output"]
      configuration = {
        ProjectName = var.codebuild_project_name
      }
    }
  }

  stage {
    name = "Deploy"
    action {
      name = "Deploy"
      category = "Deploy"
      owner = "AWS"
      provider = "ECS"
      version = "1"
      input_artifacts = ["build_output"]
      configuration = {
        "ClusterName" = var.ecs_cluster_name
        "ServiceName" = var.ecs_service_name
        "FileName" = var.image_definition_file_path
        "DeploymentTimeout" = var.deployment_timeout
      }
    }
  }

}