output "ecr_repository_url" {
  value = aws_ecr_repository.api.repository_url
}
output "apprunner_service_url" {
  value = aws_apprunner_service.api.service_url
}
output "rds_endpoint" {
  value = aws_db_instance.postgres.address
}
output "rds_port" {
  value = aws_db_instance.postgres.port
}