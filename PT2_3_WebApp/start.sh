#!/bin/bash

echo "🚀 Starting XSurface Application..."
echo "=================================="

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker daemon is not running. Please start Docker Desktop first."
    exit 1
fi

echo "🧹 Cleaning up existing processes..."
echo "  Stopping processes on port 6001 and 3000..."
sudo lsof -ti:6001 | xargs sudo kill -9 2>/dev/null || true
sudo lsof -ti:3000 | xargs sudo kill -9 2>/dev/null || true
sleep 1

echo "🛑 Stopping any running containers..."
docker compose -f docker-compose.yml down 2>/dev/null || true
sleep 2

echo ""
echo "📦 Building and starting containers..."
docker compose -f docker-compose.yml up --build -d

echo ""
echo "⏳ Waiting for MongoDB to be ready..."
MONGO_TIMEOUT=30
MONGO_ELAPSED=0
until docker compose logs mongodb 2>&1 | grep -q "Waiting for connections" || [ $MONGO_ELAPSED -ge $MONGO_TIMEOUT ]; do
  printf '.'
  sleep 2
  MONGO_ELAPSED=$((MONGO_ELAPSED + 2))
done

if [ $MONGO_ELAPSED -ge $MONGO_TIMEOUT ]; then
  echo ""
  echo "⚠️  MongoDB timeout"
  docker compose logs --tail=20 mongodb
  exit 1
fi
echo " MongoDB is ready! ✓"

echo ""
echo "⏳ Waiting for Backend to be ready..."
BACKEND_TIMEOUT=60
BACKEND_ELAPSED=0
until docker compose logs backend 2>&1 | grep -q "Server is running" || [ $BACKEND_ELAPSED -ge $BACKEND_TIMEOUT ]; do
  printf '.'
  sleep 2
  BACKEND_ELAPSED=$((BACKEND_ELAPSED + 2))
done

if [ $BACKEND_ELAPSED -ge $BACKEND_TIMEOUT ]; then
  echo ""
  echo "⚠️  Backend timeout, but continuing..."
  echo "📋 Backend logs:"
  docker compose logs --tail=20 backend
else
  echo " Backend is ready! ✓"
fi

echo ""
echo "🌱 Seeding database with mock products..."
if docker compose exec -T backend npx ts-node src/seed.ts; then
  echo "✅ Database seeded successfully!"
else
  echo "⚠️  Seeding failed, but continuing..."
fi

echo ""
echo "⏳ Waiting for Frontend to be ready..."
FRONTEND_TIMEOUT=30
FRONTEND_ELAPSED=0
until docker compose logs frontend 2>&1 | grep -q "Ready in" || [ $FRONTEND_ELAPSED -ge $FRONTEND_TIMEOUT ]; do
  printf '.'
  sleep 2
  FRONTEND_ELAPSED=$((FRONTEND_ELAPSED + 2))
done

if [ $FRONTEND_ELAPSED -ge $FRONTEND_TIMEOUT ]; then
  echo ""
  echo "⚠️  Frontend timeout, but may still be starting..."
else
  echo " Frontend is ready! ✓"
fi

echo ""
echo "✅ Application is running!"
echo "=================================="
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:6001/api"
echo "🍃 MongoDB: mongodb://localhost:27017"
echo "=================================="
echo ""
echo "📊 Container Status:"
docker compose ps
echo ""
echo "📝 To view logs: ./logs.sh"
echo "🛑 To stop: ./stop.sh"
echo "🗑️  To stop and remove volumes: docker compose down -v"
