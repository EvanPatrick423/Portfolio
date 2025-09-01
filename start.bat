@echo off
setlocal

echo 🚀 Portfolio Application Docker Manager
echo ======================================

if "%1"=="build" (
    echo 🔨 Building Docker image...
    docker-compose build --no-cache
    echo ✅ Build complete!
    goto :end
)

if "%1"=="start" (
    echo 🚀 Starting portfolio application...
    docker-compose up -d
    echo ✅ Application started!
    echo 📱 Frontend: http://localhost:3000
    echo 🔗 GraphQL API: http://localhost:4000/graphql
    goto :end
)

if "%1"=="start-with-nginx" (
    echo 🚀 Starting portfolio with Nginx reverse proxy...
    docker-compose --profile nginx up -d
    echo ✅ Application started with Nginx!
    echo 🌐 Application: http://localhost
    echo 🔗 GraphQL API: http://localhost/graphql
    goto :end
)

if "%1"=="stop" (
    echo 🛑 Stopping portfolio application...
    docker-compose down
    echo ✅ Application stopped!
    goto :end
)

if "%1"=="restart" (
    echo 🔄 Restarting portfolio application...
    docker-compose restart
    echo ✅ Application restarted!
    goto :end
)

if "%1"=="logs" (
    echo 📋 Showing application logs...
    docker-compose logs -f
    goto :end
)

if "%1"=="status" (
    echo 📊 Application status:
    docker-compose ps
    goto :end
)

if "%1"=="clean" (
    echo 🧹 Cleaning up Docker resources...
    docker-compose down --volumes --remove-orphans
    docker system prune -f
    echo ✅ Cleanup complete!
    goto :end
)

echo Usage: %0 {build^|start^|start-with-nginx^|stop^|restart^|logs^|status^|clean}
echo.
echo Commands:
echo   build             - Build the Docker image
echo   start             - Start the application
echo   start-with-nginx  - Start with Nginx reverse proxy
echo   stop              - Stop the application
echo   restart           - Restart the application
echo   logs              - Show application logs
echo   status            - Show container status
echo   clean             - Clean up Docker resources

:end
endlocal
