# =====================================================
# Application URLs
# =====================================================

output "frontend_url" {
  description = "URL to access the Angular frontend application"
  value       = "http://localhost:${var.frontend_host_port}"
}

output "backend_url" {
  description = "URL to access the ASP.NET Core backend API"
  value       = "http://localhost:${var.backend_host_port}"
}

output "swagger_url" {
  description = "URL to access the Swagger API documentation"
  value       = "http://localhost:${var.backend_host_port}/swagger"
}

# =====================================================
# Container Information
# =====================================================

output "container_names" {
  description = "Names of the created containers"
  value = {
    backend  = var.backend_container_name
    frontend = var.frontend_container_name
  }
}

output "network_name" {
  description = "Name of the Docker network"
  value       = docker_network.app_network.name
}

output "database_volume" {
  description = "Name of the database volume"
  value       = docker_volume.database_volume.name
}

# =====================================================
# Development & Debugging
# =====================================================

output "docker_commands" {
  description = "Useful Docker commands for development"
  value = {
    logs_backend     = "docker logs ${var.backend_container_name}"
    logs_frontend    = "docker logs ${var.frontend_container_name}"
    exec_backend     = "docker exec -it ${var.backend_container_name} /bin/bash"
    exec_frontend    = "docker exec -it ${var.frontend_container_name} /bin/sh"
    restart_backend  = "docker restart ${var.backend_container_name}"
    restart_frontend = "docker restart ${var.frontend_container_name}"
  }
}

output "build_info" {
  description = "Build context information"
  value = {
    backend_context  = abspath("${path.module}/../../backend")
    frontend_context = abspath("${path.module}/../../frontend/frontend")
    environment      = var.environment
  }
}
