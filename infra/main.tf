terraform {
  required_version = ">= 1.6.0"
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version = ">= 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

data "aws_caller_identity" "current" {}

# --- Default VPC for phase 1 ---
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

# --- ECR for API image ---
resource "aws_ecr_repository" "api" {
  name = "${var.project}-api"
}

# --- RDS Postgres (public for phase 1) ---
resource "aws_security_group" "rds" {
  name = "${var.project}-rds-sg"
  description = "Public RDS (phase 1). Restrict to admin IP only."
  vpc_id = data.aws_vpc.default.id

  # If open-to-world: allow 5432 from anywhere (phase 1)
  dynamic "ingress" {
    for_each = var.db_open_to_world ? [1] : []
    content {
      description = "TEMP: Postgres from anywhere"
      from_port = 5432
      to_port = 5432
      protocol = "tcp"
      cidr_blocks = ["0.0.0.0/0"]
    }
  }

  # If not open-to-world: allow 5432 only from your admin IP (phase 2)
  dynamic "ingress" {
    for_each = var.db_open_to_world ? [] : [1]
    content {
      description = "Postgres from admin IP"
      from_port = 5432
      to_port = 5432
      protocol = "tcp"
      cidr_blocks = [var.admin_ip_cidr]
    }
  }

  # Allow outbound
  egress {
    from_port = 0
    to_port = 0
    protocol = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_db_subnet_group" "default" {
  name = "${var.project}-db-subnets"
  subnet_ids = data.aws_subnets.default.ids
}

resource "aws_db_instance" "postgres" {
  identifier = "${var.project}-postgres"
  engine = "postgres"
  engine_version = "18"
  instance_class = "db.t4g.micro"
  allocated_storage = 20
  storage_type = "gp3"

  db_name = var.db_name
  username = var.db_username
  password = var.db_password

  publicly_accessible = true
  vpc_security_group_ids = [aws_security_group.rds.id]
  db_subnet_group_name = aws_db_subnet_group.default.name

  backup_retention_period = 7
  skip_final_snapshot = true

  # Quality of life settings
  deletion_protection = false
  apply_immediately = true
}

# --- App Runner ECR access role ---
resource "aws_iam_role" "apprunner_ecr_access" {
  name = "${var.project}-apprunner-ecr-access"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Effect = "Allow",
      Principal = { Service = "build.apprunner.amazonaws.com"},
      Action = "sts:AssumeRole"
    }]
  })
}

resource "aws_iam_role_policy_attachment" "apprunner_ecr_access" {
  role = aws_iam_role.apprunner_ecr_access.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSAppRunnerServicePolicyForECRAccess"
}

# --- App Runner Service ---
resource "aws_apprunner_service" "api" {
  service_name = "${var.project}-api"

  source_configuration {
    auto_deployments_enabled = true
    authentication_configuration {
      access_role_arn = aws_iam_role.apprunner_ecr_access.arn
    }

    image_repository {
      image_repository_type = "ECR"
      image_identifier      = "${aws_ecr_repository.api.repository_url}:latest"

      image_configuration {
        port = "8080"

        runtime_environment_variables = {
          ASPNETCORE_ENVIRONMENT = "Production"
          ConnectionStrings__DefaultConnection = "Host=${aws_db_instance.postgres.address};Port=5432;Database=${var.db_name};Username=${var.db_username};Password=${var.db_password};Ssl Mode=Require;Trust Server Certificate=true"
        }
      }
    }
  }
}