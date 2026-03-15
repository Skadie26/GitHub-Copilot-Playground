# Start Full Stack Application
Write-Host "Starting Full Stack Application..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan

# Start Backend
Write-Host "1. Starting .NET Backend API..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-File", "start-backend.ps1"

# Wait a moment
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "2. Starting Angular Frontend..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-File", "start-frontend.ps1"

Write-Host ""
Write-Host "✅ Both applications are starting..." -ForegroundColor Green
Write-Host "🌐 Swagger API: http://localhost:5257/swagger" -ForegroundColor Yellow
Write-Host "🌐 Frontend App: http://localhost:4200/" -ForegroundColor Yellow
Write-Host ""
Write-Host "Both browsers should open automatically!" -ForegroundColor Cyan