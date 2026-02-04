variable "aws_region" {
  type = string
  default = "us-east-1"
}
variable "project" {
  type = string
  default = "marked-here"
}
variable "db_name" {
  type = string
  default = "markedhere"
}
variable "db_username" {
  type = string
  default = "markedhere_app"
}
variable "db_password" {
  type = string
  sensitive = true
}
# Current public IP in CIDR form
variable "admin_ip_cidr" {
  type = string
}
# Db security toggle to set to false for Phase 2
variable "db_open_to_world" {
  type = bool
  default = true
}

