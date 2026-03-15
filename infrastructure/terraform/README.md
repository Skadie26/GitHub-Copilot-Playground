<img src="/images/Terraform-logo.png" alt="Terraform Infrastructure Diagram" height="50">

# Terraform Infrastructure Setup for WSL

Deploys containerized full-stack application: ASP.NET Core backend + Angular frontend with SQLite database.

## Complete Setup Guide

### 1. Install WSL (Run as Administrator on Windows)

```cmd
wsl --install
```

### 2.Initial WSL Setup

After WSL installation and first boot, update the system:

```bash
sudo apt update && sudo apt upgrade -y
```

### 3. Install Zscaler Certificate

```bash
# Copy certificate to trusted certificates directory
sudo cp /mnt/c/_Git/copilot-playground/backend/zscaler.crt /usr/local/share/ca-certificates/

# Update system's trusted certificates
sudo update-ca-certificates
```

### 4. Install Terraform

```bash
# Get HashiCorp GPG Key
wget -O- https://apt.releases.hashicorp.com/gpg | gpg --dearmor | sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null

# Add HashiCorp repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(grep -oP '(?<=UBUNTU_CODENAME=).*' /etc/os-release || lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list

# Update package list and install Terraform
sudo apt update
sudo apt-get install terraform

# Initialize Terraform (from your project directory)
sudo terraform init
```

### 5. Install Docker

```bash
# Install prerequisites
sudo apt install apt-transport-https curl

# Add Docker GPG key
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# Add Docker repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Update package list and install Docker
sudo apt update
sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify Docker installation
sudo systemctl is-active docker
```

## Prerequisites Summary

- WSL 2 installed and configured
- Ubuntu/Debian with updated packages
- Zscaler certificate installed (if applicable)
- Terraform installed via HashiCorp repository
- Docker CE with compose plugin installed

## Quick Start

```bash
# Navigate to terraform directory (from project root)
cd copilot-playground/infrastructure/terraform

# Initialize Terraform (if not done during installation)
terraform init

# Deploy infrastructure
sudo terraform apply
```

> **Note**: You may need to use `sudo` with terraform commands depending on your Docker configuration.

**Access URLs:**

- Frontend: http://localhost:4200
- Backend API: http://localhost:5257
- Swagger: http://localhost:5257/swagger

## Configuration

```bash
# Custom environment/ports
terraform apply -var="environment=Production" -var="frontend_host_port=3000"

# Force rebuild (after code changes)
terraform apply -var="no_cache_build=true"

# Using terraform.tfvars
cat > terraform.tfvars << EOF
environment = "Development"
frontend_host_port = 4200
backend_host_port = 5257
no_cache_build = false
EOF
```

## Management

```bash
# View resources and outputs
terraform show
terraform output

# Container logs and access
docker logs playground-backend
docker logs playground-frontend
docker exec -it playground-backend /bin/bash

# Restart containers
docker restart playground-backend playground-frontend

# Update after code changes
terraform apply -var="no_cache_build=true"

# Cleanup
terraform destroy
```

if needed

```bash
#stop containers and remove network manually
docker ps -q --filter "network=playground-network" | xargs docker stop
docker ps -aq --filter "network=playground-network" | xargs docker rm
docker network rm playground-network
```
