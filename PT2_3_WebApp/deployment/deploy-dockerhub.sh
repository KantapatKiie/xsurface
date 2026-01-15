#!/bin/bash

echo "🚀 Building and pushing to Docker Hub..."

cd "$(dirname "$0")/.."

echo "📦 Building backend image..."
docker build -t kantapatkie/xsurface-backend:latest -t kantapatkie/xsurface-backend:v1.0.0 ./backend

echo "📦 Building frontend image..."
docker build -t kantapatkie/xsurface-frontend:latest -t kantapatkie/xsurface-frontend:v1.0.0 ./frontend

echo "🔐 Login to Docker Hub..."
docker login

echo "⬆️  Pushing backend images..."
docker push kantapatkie/xsurface-backend:latest
docker push kantapatkie/xsurface-backend:v1.0.0

echo "⬆️  Pushing frontend images..."
docker push kantapatkie/xsurface-frontend:latest
docker push kantapatkie/xsurface-frontend:v1.0.0

echo "✅ Successfully pushed all images to Docker Hub!"
echo "📍 Backend: https://hub.docker.com/r/kantapatkie/xsurface-backend"
echo "📍 Frontend: https://hub.docker.com/r/kantapatkie/xsurface-frontend"
