# =====================================================
# Application Configuration
# =====================================================

variable "environment" {
  description = "Application environment (Development, Staging, Production)"
  type        = string
  default     = "Development"

  validation {
    condition     = contains(["Development", "Staging", "Production"], var.environment)
    error_message = "Environment must be one of: Development, Staging, Production."
  }
}

# =====================================================
# Docker Images Configuration
# =====================================================

variable "backend_image_name" {
  description = "Docker image name for the backend API"
  type        = string
  default     = "playground-backend:local"
}

variable "frontend_image_name" {
  description = "Docker image name for the frontend application"
  type        = string
  default     = "playground-frontend:local"
}

variable "no_cache_build" {
  description = "Disable Docker build cache (useful for debugging)"
  type        = bool
  default     = false
}

# =====================================================
# Container Configuration
# =====================================================

variable "backend_container_name" {
  description = "Name for the backend container"
  type        = string
  default     = "playground-backend"
}

variable "frontend_container_name" {
  description = "Name for the frontend container"
  type        = string
  default     = "playground-frontend"
}

# =====================================================
# Network Configuration
# =====================================================

variable "network_name" {
  description = "Name for the Docker network"
  type        = string
  default     = "playground-network"
}

variable "backend_host_port" {
  description = "Host port for backend API"
  type        = number
  default     = 5257

  validation {
    condition     = var.backend_host_port >= 1024 && var.backend_host_port <= 65535
    error_message = "Backend host port must be between 1024 and 65535."
  }
}

variable "frontend_host_port" {
  description = "Host port for frontend application"
  type        = number
  default     = 4200

  validation {
    condition     = var.frontend_host_port >= 1024 && var.frontend_host_port <= 65535
    error_message = "Frontend host port must be between 1024 and 65535."
  }
}

# =====================================================
# Storage Configuration
# =====================================================

variable "database_volume_name" {
  description = "Name for the database volume"
  type        = string
  default     = "playground-database"
}
