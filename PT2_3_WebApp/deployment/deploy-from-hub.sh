#!/bin/bash

echo "🚀 Deploying from Docker Hub..."

cd "$(dirname "$0")"

echo "⬇️  Pulling latest images..."
docker pull kantapatkie/xsurface-backend:latest
docker pull kantapatkie/xsurface-frontend:latest
docker pull mongo:latest

echo "🛑 Stopping existing containers..."
docker-compose -f docker-compose.hub.yml down

echo "🚀 Starting services..."
docker-compose -f docker-compose.hub.yml up -d

echo "⏳ Waiting for MongoDB to be ready..."
sleep 10

echo "🌱 Seeding database..."
docker exec xsurface-backend npx ts-node src/seed.ts

echo "✅ Deployment complete!"
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend: http://localhost:6001"
