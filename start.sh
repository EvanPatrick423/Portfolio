#!/bin/bash

# Portfolio Docker Startup Script
# This script provides easy commands to manage your portfolio application

set -e

echo "🚀 Portfolio Application Docker Manager"
echo "======================================"

case "$1" in
  "build")
    echo "🔨 Building Docker image..."
    docker compose build --no-cache
    echo "✅ Build complete!"
    ;;
  
  "start")
    echo "🚀 Starting portfolio application..."
    docker compose up -d
    echo "✅ Application started!"
    echo "🌐 Frontend: http://localhost (port 80 via nginx)"
    echo "🔗 GraphQL API: http://localhost/graphql (proxied via nginx)"
    echo "🔗 Direct API: http://localhost:4000/graphql"
    ;;
  
  "stop")
    echo "🛑 Stopping portfolio application..."
    docker compose down
    echo "✅ Application stopped!"
    ;;
  
  "restart")
    echo "🔄 Restarting portfolio application..."
    docker compose restart
    echo "✅ Application restarted!"
    ;;
  
  "logs")
    echo "📋 Showing application logs..."
    docker compose logs -f
    ;;
  
  "status")
    echo "📊 Application status:"
    docker compose ps
    ;;
  
  "clean")
    echo "🧹 Cleaning up Docker resources..."
    docker compose down --volumes --remove-orphans
    docker system prune -f
    echo "✅ Cleanup complete!"
    ;;
  
  *)
    echo "Usage: $0 {build|start|stop|restart|logs|status|clean}"
    echo ""
    echo "Commands:"
    echo "  build    - Build the Docker image"
    echo "  start    - Start the application (nginx + backend)"
    echo "  stop     - Stop the application"
    echo "  restart  - Restart the application"
    echo "  logs     - Show application logs"
    echo "  status   - Show container status"
    echo "  clean    - Clean up Docker resources"
    exit 1
    ;;
esac
