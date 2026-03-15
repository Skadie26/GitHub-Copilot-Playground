# =====================================================
# Terraform Configuration for Full-Stack Application
# =====================================================

terraform {
  required_version = ">= 1.6.0"

  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

# =====================================================
# Provider Configuration
# =====================================================

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

# =====================================================
# Infrastructure Resources
# =====================================================

# Application network for container communication
resource "docker_network" "app_network" {
  name   = var.network_name
  driver = "bridge"
}

# Persistent volume for SQLite database
resource "docker_volume" "database_volume" {
  name = var.database_volume_name
}

# =====================================================
# Docker Images
# =====================================================

# ASP.NET Core Backend API
resource "docker_image" "backend" {
  name = var.backend_image_name

  build {
    context    = abspath("${path.module}/../../backend")
    dockerfile = "Dockerfile"
    no_cache   = var.no_cache_build

    build_args = {
      ASPNETCORE_ENVIRONMENT = var.environment
    }
  }

  triggers = {
    dockerfile_changes = filemd5("${path.module}/../../backend/Dockerfile")
    source_changes     = filemd5("${path.module}/../../backend/backend.csproj")
  }
}

# Angular Frontend Application
resource "docker_image" "frontend" {
  name = var.frontend_image_name

  build {
    context    = abspath("${path.module}/../../frontend/frontend")
    dockerfile = "Dockerfile"
    no_cache   = var.no_cache_build
  }

  triggers = {
    dockerfile_changes   = filemd5("${path.module}/../../frontend/frontend/Dockerfile")
    package_json_changes = filemd5("${path.module}/../../frontend/frontend/package.json")
  }
}

# =====================================================
# Application Containers
# =====================================================

# Backend API Container
resource "docker_container" "backend" {
  name         = var.backend_container_name
  image        = docker_image.backend.image_id
  restart      = "unless-stopped"
  must_run     = true

  # Network configuration
  networks_advanced {
    name = docker_network.app_network.name
    aliases = ["backend-api"]
  }

  # Port mapping: Host -> Container
  ports {
    internal = 8080
    external = var.backend_host_port
    protocol = "tcp"
  }

  # Database volume mount
  mounts {
    target = "/app/data"
    source = docker_volume.database_volume.name
    type   = "volume"
  }

  # Environment variables
  env = [
    "ASPNETCORE_ENVIRONMENT=${var.environment}",
    "ASPNETCORE_URLS=http://+:8080",
    "ConnectionStrings__DefaultConnection=Data Source=/app/data/playground.db",
    "CORS__AllowedOrigins=http://localhost:${var.frontend_host_port}",
    "Logging__LogLevel__Default=Information",
    "Logging__LogLevel__Microsoft.AspNetCore=Warning",
    "Logging__LogLevel__backend.Weather.Weather.API.Services.OpenWeatherService=Debug"
  ]

  # Health check
  healthcheck {
    test         = ["CMD", "curl", "-f", "http://localhost:8080/health"]
    interval     = "30s"
    timeout      = "10s"
    retries      = 3
    start_period = "60s"
  }
}

# Frontend Application Container
resource "docker_container" "frontend" {
  name         = var.frontend_container_name
  image        = docker_image.frontend.image_id
  restart      = "unless-stopped"
  must_run     = true

  # Ensure backend starts first
  depends_on = [docker_container.backend]

  # Network configuration
  networks_advanced {
    name = docker_network.app_network.name
    aliases = ["frontend-app"]
  }

  # Port mapping: Host -> Container
  ports {
    internal = 8080
    external = var.frontend_host_port
    protocol = "tcp"
  }

  # Environment variables for runtime configuration
  env = [
    "BACKEND_URL=http://localhost:${var.backend_host_port}",
    "NODE_ENV=production"
  ]

  # Health check
  healthcheck {
    test         = ["CMD", "curl", "-f", "http://localhost:8080/"]
    interval     = "30s"
    timeout      = "10s"
    retries      = 3
    start_period = "60s"
  }
}
