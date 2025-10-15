# Multi-stage Dockerfile for Portfolio Project

# Stage 1: Build Frontend
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# Stage 2: Build Backend
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend
COPY backend/service/package*.json ./
RUN npm ci
COPY backend/service/ ./
RUN npm run build

# Stage 3: Production Runtime
FROM node:18-alpine AS production
WORKDIR /app

# Install PM2 for process management
RUN npm install -g pm2

# Copy backend build and dependencies
COPY --from=backend-builder /app/backend/dist ./backend/dist
COPY --from=backend-builder /app/backend/node_modules ./backend/node_modules
COPY --from=backend-builder /app/backend/package*.json ./backend/
COPY --from=backend-builder /app/backend/src/graphql ./backend/src/graphql

# Copy frontend build (nginx will serve this via shared volume)
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Copy PM2 ecosystem file
COPY ecosystem.config.js ./

# Expose backend port only (nginx serves frontend)
EXPOSE 4000

# Install curl for health checks
RUN apk add --no-cache curl

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4000/graphql || exit 1

# Start backend service using PM2
CMD ["pm2-runtime", "start", "ecosystem.config.js"]
