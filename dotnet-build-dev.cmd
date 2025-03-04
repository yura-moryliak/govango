@echo off
setlocal

if "%~1"=="" (
    echo ==============================================
    echo  Please enter the version for the build:
    echo ==============================================
    set /p VERSION=Version:
) else (
    set VERSION=%~1
)

if "%VERSION%"=="" (
    echo Error: No version specified. Exiting...
    exit /b 1
)

echo ==============================================
echo 1. Start to build development mode for GoVanGo appliance
echo ==============================================

cd /d "%~dp0ui"

echo.
echo ==============================================
echo 2. Installing dependencies (clean install)
echo ==============================================

call npm ci
if %errorlevel% neq 0 (
    echo Error: npm ci failed. Exiting...
    exit /b %errorlevel%
)

echo.
echo ==============================================
echo 3. Building the UI
echo ==============================================

call npm run build:production
if %errorlevel% neq 0 (
    echo Error: UI build failed. Exiting...
    exit /b %errorlevel%
)

echo.
echo ==============================================
echo UI build completed successfully!
echo ==============================================

echo.
echo ==============================================
echo 4. Preparing to publish Server (Version: %VERSION%)
echo ==============================================

cd /d "%~dp0"
cd /d "%~dp0server_asp_net"

if not exist "WebAPI/WebAPI.csproj" (
    echo Error: Project file WebAPI/WebAPI.csproj not found!
    exit /b 1
)

call dotnet publish WebAPI/WebAPI.csproj -c Debug -f net8.0 -r win-x64 --self-contained true -p:PublishSingleFile=true -o ../local-debug-releases/%VERSION%
if %errorlevel% neq 0 (
    echo Error: Server publish failed. Exiting...
    exit /b %errorlevel%
)

echo.
echo ==============================================
echo Build process completed successfully! Version: %VERSION%
echo ==============================================

pause
endlocal
