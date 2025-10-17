# Multi-stage Dockerfile for Portfolio Project (Next.js)

# Stage 1: Build Frontend (Next.js)
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

# Development Stage: Frontend (Hot Reload)
FROM node:18-alpine AS frontend-development
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/next.config.js ./
# Source code will be mounted as volume
EXPOSE 3000
CMD ["npm", "run", "dev"]

# Development Stage: Backend (Hot Reload)
FROM node:18-alpine AS backend-development
WORKDIR /app/backend
RUN apk add --no-cache curl
COPY backend/service/package*.json ./
RUN npm ci
# Source code will be mounted as volume
EXPOSE 4000
CMD ["npm", "run", "dev"]

# Stage 3: Frontend Production Runtime
FROM node:18-alpine AS frontend-production
WORKDIR /app/frontend

# Copy Next.js build artifacts
COPY --from=frontend-builder /app/frontend/.next ./.next
COPY --from=frontend-builder /app/frontend/public ./public
COPY --from=frontend-builder /app/frontend/package*.json ./
COPY --from=frontend-builder /app/frontend/next.config.js ./

# Install production dependencies only
RUN npm ci --production

# Expose Next.js port
EXPOSE 3000

# Start Next.js
CMD ["npm", "start"]

# Stage 4: Backend Production Runtime
FROM node:18-alpine AS backend-production
WORKDIR /app/backend

# Copy backend build and dependencies
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/node_modules ./node_modules
COPY --from=backend-builder /app/backend/package*.json ./
COPY --from=backend-builder /app/backend/src/graphql ./src/graphql

# Expose backend port
EXPOSE 4000

# Install curl for health checks
RUN apk add --no-cache curl

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:4000/graphql || exit 1

# Start backend service
CMD ["node", "dist/server.js"]
