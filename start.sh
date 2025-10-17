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
    echo "🚀 Starting portfolio application (production mode)..."
    docker compose up -d
    echo "✅ Application started!"
    echo "🌐 Frontend (Next.js): http://localhost (port 80 via nginx)"
    echo "🔗 GraphQL API: http://localhost/graphql (proxied via nginx)"
    echo "🔗 Direct Frontend: http://localhost:3000"
    echo "🔗 Direct Backend: http://localhost:4000/graphql"
    ;;
  
  "dev")
    echo "🔥 Starting portfolio application (development mode with hot reload)..."
    docker compose -f docker-compose.dev.yml up -d
    echo "✅ Development environment started!"
    echo "🔥 Hot reload enabled - changes will auto-refresh!"
    echo "🌐 Frontend (Next.js): http://localhost (port 80 via nginx)"
    echo "🔗 GraphQL API: http://localhost/graphql (proxied via nginx)"
    echo "🔗 Direct Frontend: http://localhost:3000"
    echo "🔗 Direct Backend: http://localhost:4000/graphql"
    echo ""
    echo "💡 Tip: Use './start.sh logs' to watch live logs"
    ;;
  
  "dev:build")
    echo "🔨 Building Docker images for development..."
    docker compose -f docker-compose.dev.yml build --no-cache
    echo "✅ Development build complete!"
    ;;
  
  "stop")
    echo "🛑 Stopping portfolio application..."
    docker compose down 2>/dev/null || true
    docker compose -f docker-compose.dev.yml down 2>/dev/null || true
    echo "✅ Application stopped!"
    ;;
  
  "restart")
    echo "🔄 Restarting portfolio application..."
    docker compose restart
    echo "✅ Application restarted!"
    ;;
  
  "dev:restart")
    echo "🔄 Restarting development environment..."
    docker compose -f docker-compose.dev.yml restart
    echo "✅ Development environment restarted!"
    ;;
  
  "logs")
    # Try dev compose first, fall back to production
    if docker compose -f docker-compose.dev.yml ps -q 2>/dev/null | grep -q .; then
      echo "📋 Showing development logs..."
      docker compose -f docker-compose.dev.yml logs -f
    else
      echo "📋 Showing application logs..."
      docker compose logs -f
    fi
    ;;
  
  "status")
    echo "📊 Application status:"
    echo ""
    echo "Production containers:"
    docker compose ps
    echo ""
    echo "Development containers:"
    docker compose -f docker-compose.dev.yml ps
    ;;
  
  "clean")
    echo "🧹 Cleaning up Docker resources..."
    docker compose down --volumes --remove-orphans 2>/dev/null || true
    docker compose -f docker-compose.dev.yml down --volumes --remove-orphans 2>/dev/null || true
    docker system prune -f
    echo "✅ Cleanup complete!"
    ;;
  
  *)
    echo "Usage: $0 {build|start|dev|dev:build|stop|restart|dev:restart|logs|status|clean}"
    echo ""
    echo "Commands:"
    echo "  build        - Build the Docker images for production"
    echo "  start        - Start the application in production mode"
    echo "  dev          - Start the application in development mode with hot reload 🔥"
    echo "  dev:build    - Build the Docker images for development"
    echo "  stop         - Stop the application (both prod and dev)"
    echo "  restart      - Restart the production application"
    echo "  dev:restart  - Restart the development environment"
    echo "  logs         - Show application logs (auto-detects mode)"
    echo "  status       - Show container status"
    echo "  clean        - Clean up Docker resources"
    echo ""
    echo "💡 Quick start for development: ./start.sh dev:build && ./start.sh dev"
    exit 1
    ;;
esac
