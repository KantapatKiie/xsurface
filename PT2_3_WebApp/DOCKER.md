# Docker Setup Guide

## Quick Start

```bash
cd PT2_WebApp

./start.sh
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:6001/api
- MongoDB: mongodb://localhost:27017

## Available Scripts

### Start Application

```bash
./start.sh
```

### Stop Application

```bash
./stop.sh
```

### View Logs

```bash
./logs.sh
```

### Stop and Remove All Data

```bash
docker-compose down -v
```

## Manual Docker Commands

### Build and Start

```bash
docker-compose up --build -d
```

### Stop

```bash
docker-compose down
```

### View Logs

```bash
docker-compose logs -f

docker-compose logs -f backend

docker-compose logs -f frontend
```

### Rebuild Specific Service

```bash
docker-compose up --build -d backend

docker-compose up --build -d frontend
```

## Docker Services

### MongoDB

- **Image:** mongo:latest
- **Port:** 27017
- **Volume:** mongodb_data (persistent storage)
- **Database:** xsurface

### Backend

- **Build:** ./backend/Dockerfile
- **Port:** 5000
- **Depends on:** MongoDB
- **Volume:** ./backend/uploads (persistent file uploads)

### Frontend

- **Build:** ./frontend/Dockerfile
- **Port:** 3000
- **Depends on:** Backend
- **Optimization:** Multi-stage build with standalone output

## Troubleshooting

### Port Already in Use

```bash
lsof -ti:3000 | xargs kill -9
lsof -ti:5000 | xargs kill -9
lsof -ti:27017 | xargs kill -9
```

### Container Issues

```bash
docker-compose restart

docker-compose down && docker-compose up -d
```

### Clean Everything

```bash
docker-compose down -v
docker system prune -a
```

### Check Container Status

```bash
docker-compose ps

docker stats
```

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/xsurface
NODE_ENV=production
```

### Frontend (.env.local)

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Production Deployment

For production, update the environment variables:

```yaml
services:
  backend:
    environment:
      NODE_ENV: production
      MONGODB_URI: your-production-mongo-uri
    
  frontend:
    environment:
      NEXT_PUBLIC_API_URL: https://your-api-domain.com/api
```

## Performance Tips

- MongoDB data persists in Docker volume
- Uploaded images persist in backend/uploads
- Frontend uses Next.js standalone build for smaller image size
- Multi-stage builds reduce final image size
- Health checks ensure services are ready before starting dependents

## Development vs Production

### Development (without Docker)

```bash
cd backend && npm run dev
cd frontend && npm run dev
```

### Production (with Docker)

```bash
./start.sh
```
