#!/bin/bash

# Portfolio Application Deployment Script
# This script automates the deployment process

set -e  # Exit on any error

echo "🚀 Starting Portfolio Application Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    echo "Run: curl -fsSL https://get.docker.com -o get-docker.sh && sh get-docker.sh"
    exit 1
fi

# Check if Docker Compose is installed (v2 or v1)
if ! command -v docker compose &> /dev/null && ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Use the correct docker compose command
if command -v docker compose &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    DOCKER_COMPOSE="docker-compose"
fi

print_status "Docker and Docker Compose are installed ✓"

# Check if .env file exists
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from template..."
    cat > .env << 'EOF'
# Application Settings
NODE_ENV=production
PORT=4000
FRONTEND_PORT=3000

# Email Settings (configure these for contact form to work)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM=your_email@gmail.com
ADMIN_EMAIL=your_contact_email@gmail.com

# Security
CORS_ORIGIN=http://localhost
EOF
    print_warning "Please edit .env file with your actual configuration before running this script again."
    exit 1
fi

print_status ".env file found ✓"

# Create logs directory
mkdir -p logs
print_status "Created logs directory ✓"

# Pull latest images (if any)
print_status "Pulling latest base images..."
$DOCKER_COMPOSE pull --ignore-pull-failures || true

# Stop existing containers
print_status "Stopping existing containers..."
$DOCKER_COMPOSE down || true

# Build and start containers
print_status "Building and starting containers..."
$DOCKER_COMPOSE up --build -d

# Wait for services to be ready
print_status "Waiting for services to start..."
sleep 10

# Check if services are running
if $DOCKER_COMPOSE ps | grep -q "Up"; then
    print_status "Services are running ✓"
    
    # Display running services
    echo
    echo "=== Running Services ==="
    $DOCKER_COMPOSE ps
    
    echo
    echo "=== Application URLs ==="
    echo "Frontend: http://localhost (port 80)"
    echo "GraphQL API: http://localhost:4000/graphql"
    echo "GraphQL Playground: http://localhost:4000/graphql"
    echo "Nginx: http://localhost (serves frontend + proxies /graphql)"
    
    # Show logs
    echo
    print_status "Showing recent logs (press Ctrl+C to exit)..."
    $DOCKER_COMPOSE logs --tail=50 -f
    
else
    print_error "Some services failed to start. Checking logs..."
    $DOCKER_COMPOSE logs
    exit 1
fi
