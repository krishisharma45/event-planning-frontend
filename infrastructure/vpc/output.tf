output "network" {
  value = module.vpc
}

output "web_server_security_group_id" {
  value = aws_security_group.allow_web_server.id
}

output "allow_postgres_db_id" {
  value = aws_security_group.allow_postgres_db.id
}