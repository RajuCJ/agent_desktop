@echo off
echo ========================================
echo Accenture Banking Agent Desktop
echo ========================================
echo.

echo Checking Ollama...
curl -s http://localhost:11434 >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Ollama is not running!
    echo Please start Ollama first.
    pause
    exit /b 1
)
echo [OK] Ollama is running

echo.
echo Checking llama3.2:1b model...
ollama list | find "llama3.2:1b" >nul
if errorlevel 1 (
    echo [WARNING] llama3.2:1b not found. Pulling model...
    ollama pull llama3.2:1b
) else (
    echo [OK] llama3.2:1b model found
)

echo.
echo ========================================
echo Starting Application
echo ========================================
echo.
echo Backend will start in a new window...
echo Frontend will start in a new window...
echo.
echo Please use your IDE to start the backend:
echo 1. Open 'backend' folder in IntelliJ/Eclipse/VS Code
echo 2. Run AgentDesktopApplication.java
echo.
echo OR use Maven if installed:
echo   cd backend
echo   mvn spring-boot:run
echo.
pause

echo Starting Frontend...
start cmd /k "cd frontend && npm install && npm start"

echo.
echo ========================================
echo Application Starting!
echo ========================================
echo.
echo Backend:  http://localhost:8080
echo Frontend: http://localhost:4200
echo.
echo Test Customers:
echo   CUST001 - John Smith
echo   CUST002 - Sarah Johnson
echo.
echo Press Ctrl+C in the windows to stop.
pause
