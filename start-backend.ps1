# Start Backend with Auto-Open Swagger
Write-Host "Starting .NET Backend API..." -ForegroundColor Green

# Get the current script directory and backend path
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendPath = Join-Path $scriptDir "backend"

# Start the backend in background
$backendJob = Start-Job -ScriptBlock {
    param($path)
    Set-Location $path
    dotnet run --launch-profile http
} -ArgumentList $backendPath

# Wait a moment for the backend to start
Start-Sleep -Seconds 5

# Open Swagger in default browser
Write-Host "Opening Swagger UI..." -ForegroundColor Yellow
Start-Process "http://localhost:5257/swagger"

# Keep the job running and show output
Write-Host "Backend is running. Press Ctrl+C to stop." -ForegroundColor Green
try {
    while ($true) {
        Receive-Job $backendJob -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 1
    }
} finally {
    Stop-Job $backendJob -ErrorAction SilentlyContinue
    Remove-Job $backendJob -ErrorAction SilentlyContinue
}