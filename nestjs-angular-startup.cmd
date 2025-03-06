@echo off
setlocal

echo ==============================================
echo Starting Docker services (docker-compose.nestjs.yml)...
echo ==============================================

cd /d "%~dp0"
docker-compose -f docker-compose.nestjs.yml up -d
if %errorlevel% neq 0 (
    echo Error: Failed to start Docker Compose. Exiting...
    exit /b %errorlevel%
)

echo Waiting for MySQL for [40 seconds] to be ready...
timeout /t 40 /nobreak >nul

echo ==============================================
echo Starting Angular UI and NestJS server...
echo ==============================================

cd /d "%~dp0server_nestjs"
npx concurrently "cd ../server_nestjs && npm run nest:start:dev" "cd ../ui && npm run angular:start"

echo ==============================================
echo All services are running!
echo ==============================================

pause
endlocal
