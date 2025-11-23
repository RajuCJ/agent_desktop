# Quick Start Script for Windows PowerShell

Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Accenture Banking Agent Desktop" -ForegroundColor Magenta
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Ollama is running
Write-Host "1. Checking Ollama..." -ForegroundColor Yellow
try {
    $ollamaCheck = Invoke-WebRequest -Uri "http://localhost:11434" -TimeoutSec 2 -UseBasicParsing -ErrorAction Stop
    Write-Host "   ✓ Ollama is running" -ForegroundColor Green
} catch {
    Write-Host "   ✗ Ollama is not running!" -ForegroundColor Red
    Write-Host "   Please start Ollama first" -ForegroundColor Red
    exit 1
}

# Check if llama3.2:1b model exists
Write-Host "2. Checking Llama3.2:1b model..." -ForegroundColor Yellow
$models = ollama list
if ($models -match "llama3.2:1b") {
    Write-Host "   ✓ Llama3.2:1b model found" -ForegroundColor Green
} else {
    Write-Host "   ✗ Llama3.2:1b model not found!" -ForegroundColor Red
    Write-Host "   Pulling model..." -ForegroundColor Yellow
    ollama pull llama3.2:1b
}

Write-Host ""
Write-Host "3. Starting Backend..." -ForegroundColor Yellow
Write-Host "   Building and starting Spring Boot application..." -ForegroundColor Gray

# Start backend in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\backend'; if (Test-Path '.\mvnw.cmd') { .\mvnw.cmd spring-boot:run } else { Write-Host 'Please build the backend manually using your IDE or Maven' -ForegroundColor Red }"

Write-Host "   ✓ Backend starting in new window..." -ForegroundColor Green
Write-Host ""

# Wait a moment for backend to start
Write-Host "4. Waiting for backend to start (30 seconds)..." -ForegroundColor Yellow
Start-Sleep -Seconds 30

Write-Host ""
Write-Host "5. Starting Frontend..." -ForegroundColor Yellow

# Check if node_modules exists
if (-not (Test-Path "$PSScriptRoot\frontend\node_modules")) {
    Write-Host "   Installing npm dependencies..." -ForegroundColor Gray
    cd frontend
    npm install
    cd ..
}

# Start frontend in a new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PSScriptRoot\frontend'; npm start"

Write-Host "   ✓ Frontend starting in new window..." -ForegroundColor Green
Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Application Starting!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend:  http://localhost:8080" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:4200" -ForegroundColor Cyan
Write-Host ""
Write-Host "Test Customers:" -ForegroundColor Yellow
Write-Host "  • CUST001 - John Smith" -ForegroundColor White
Write-Host "  • CUST002 - Sarah Johnson" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to open the application in your browser..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Start-Process "http://localhost:4200"
