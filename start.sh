#!/bin/bash

# Portfolio Docker Startup Script
# This script provides easy commands to manage your portfolio application

set -e

echo "🚀 Portfolio Application Docker Manager"
echo "======================================"

case "$1" in
  "build")
    echo "🔨 Building Docker image..."
    docker-compose build --no-cache
    echo "✅ Build complete!"
    ;;
  
  "start")
    echo "🚀 Starting portfolio application..."
    docker-compose up -d
    echo "✅ Application started!"
    echo "📱 Frontend: http://localhost:3000"
    echo "🔗 GraphQL API: http://localhost:4000/graphql"
    ;;
  
  "start-with-nginx")
    echo "🚀 Starting portfolio with Nginx reverse proxy..."
    docker-compose --profile nginx up -d
    echo "✅ Application started with Nginx!"
    echo "🌐 Application: http://localhost"
    echo "🔗 GraphQL API: http://localhost/graphql"
    ;;
  
  "stop")
    echo "🛑 Stopping portfolio application..."
    docker-compose down
    echo "✅ Application stopped!"
    ;;
  
  "restart")
    echo "🔄 Restarting portfolio application..."
    docker-compose restart
    echo "✅ Application restarted!"
    ;;
  
  "logs")
    echo "📋 Showing application logs..."
    docker-compose logs -f
    ;;
  
  "status")
    echo "📊 Application status:"
    docker-compose ps
    ;;
  
  "clean")
    echo "🧹 Cleaning up Docker resources..."
    docker-compose down --volumes --remove-orphans
    docker system prune -f
    echo "✅ Cleanup complete!"
    ;;
  
  *)
    echo "Usage: $0 {build|start|start-with-nginx|stop|restart|logs|status|clean}"
    echo ""
    echo "Commands:"
    echo "  build             - Build the Docker image"
    echo "  start             - Start the application"
    echo "  start-with-nginx  - Start with Nginx reverse proxy"
    echo "  stop              - Stop the application"
    echo "  restart           - Restart the application"
    echo "  logs              - Show application logs"
    echo "  status            - Show container status"
    echo "  clean             - Clean up Docker resources"
    exit 1
    ;;
esac
