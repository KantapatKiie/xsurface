#!/bin/bash

echo "🔧 Docker Reset & Cleanup Script"
echo "================================="
echo ""

echo "Step 1: Checking Docker daemon..."
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker daemon is not running"
    echo ""
    echo "Please start Docker Desktop manually:"
    echo "  1. Open Docker Desktop application"
    echo "  2. Wait for it to fully start (whale icon in menu bar should be steady)"
    echo "  3. Run this script again"
    exit 1
fi

echo "✅ Docker daemon is running"
echo ""

echo "Step 2: Stopping any running containers..."
docker stop $(docker ps -q) 2>/dev/null || echo "No running containers to stop"
echo ""

echo "Step 3: Removing PT2_3_WebApp containers..."
docker rm -f pt2_3_webapp-backend-1 pt2_3_webapp-frontend-1 pt2_3_webapp-mongodb-1 2>/dev/null || echo "No PT2_3_WebApp containers found"
echo ""

echo "Step 4: Cleaning up unused networks..."
docker network prune -f
echo ""

echo "Step 5: Removing orphaned volumes (if any)..."
docker volume ls -qf dangling=true | xargs docker volume rm 2>/dev/null || echo "No orphaned volumes"
echo ""

echo "Step 6: Killing processes on ports 6001 and 3000..."
lsof -ti:6001 | xargs kill -9 2>/dev/null || echo "Port 6001 is free"
lsof -ti:3000 | xargs kill -9 2>/dev/null || echo "Port 3000 is free"
echo ""

echo "✅ Docker reset complete!"
echo ""
echo "Next steps:"
echo "  1. Run: ./start.sh"
echo "  2. Or manually: docker compose up --build -d"
