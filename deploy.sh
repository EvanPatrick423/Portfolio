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

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
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
SMTP_PASSWORD=your_app_password
EMAIL_FROM=your_email@gmail.com
EMAIL_TO=your_contact_email@gmail.com

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
docker-compose pull --ignore-pull-failures || true

# Stop existing containers
print_status "Stopping existing containers..."
docker-compose down || true

# Build and start containers
print_status "Building and starting containers..."
docker-compose up --build -d

# Wait for services to be ready
print_status "Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    print_status "Services are running ✓"
    
    # Display running services
    echo
    echo "=== Running Services ==="
    docker-compose ps
    
    echo
    echo "=== Application URLs ==="
    echo "Frontend: http://localhost:3000"
    echo "GraphQL API: http://localhost:4000/graphql"
    echo "GraphQL Playground: http://localhost:4000/graphql"
    
    # Show logs
    echo
    print_status "Showing recent logs (press Ctrl+C to exit)..."
    docker-compose logs --tail=50 -f
    
else
    print_error "Some services failed to start. Checking logs..."
    docker-compose logs
    exit 1
fi
