@echo off
setlocal

echo  Portfolio Development Server Manager
echo =======================================

if "%1"=="start" (
    echo Starting development servers...
    echo.
    echo Starting backend server...
    start "Backend Server" cmd /k "cd backend\service && npm run dev"
    timeout /t 3 /nobreak > nul
    echo Starting frontend server...
    start "Frontend Server" cmd /k "cd frontend && npm run dev"
    echo.
    echo Development servers started!
    echo Frontend: http://localhost:5173 (Vite dev server)
    echo GraphQL API: http://localhost:4000/graphql
    goto :end
)

if "%1"=="stop" (
    echo 🛑 Stopping development servers...
    taskkill /f /im node.exe 2>nul
    echo ✅ Development servers stopped!
    goto :end
)

echo Usage: %0 {start^|stop}
echo.
echo Commands:
echo   start  - Start both development servers
echo   stop   - Stop all Node.js processes

:end
endlocal
