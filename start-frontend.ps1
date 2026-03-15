# Start Frontend with Auto-Open Browser
Write-Host "Starting Angular Frontend..." -ForegroundColor Green

# Get the directory where this script is located
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path

# Navigate to the frontend directory relative to the script location
Set-Location (Join-Path $ScriptDir "frontend\frontend")

# Verify we're in the correct directory
if (-not (Test-Path "package.json")) {
    Write-Error "package.json not found. Please ensure you're running this script from the project root directory."
    exit 1
}

# The Angular configuration already has open: true, so this will auto-open
npm start