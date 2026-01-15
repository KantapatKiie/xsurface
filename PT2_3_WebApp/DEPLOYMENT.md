# Deployment Guide - XSurface Web Application

## Overview
This document outlines the deployment strategy for the XSurface full-stack web application, including Docker Hub image distribution and deployment to various hosting providers.

---

## Architecture
- **Frontend**: Next.js 16.1.2 (React 19)
- **Backend**: Node.js + Express + TypeScript
- **Database**: MongoDB
- **Containerization**: Docker + Docker Compose

---

## 1. Docker Hub Deployment

### 1.1 Build and Tag Images

```bash
cd PT2_3_WebApp

# Build backend image
docker build -t kantapatkie/xsurface-backend:latest -t kantapatkie/xsurface-backend:v1.0.0 ./backend

# Build frontend image
docker build -t kantapatkie/xsurface-frontend:latest -t kantapatkie/xsurface-frontend:v1.0.0 ./frontend
```

### 1.2 Login to Docker Hub

```bash
docker login
# Enter your Docker Hub username and password/token
```

### 1.3 Push Images to Docker Hub

```bash
# Push backend images
docker push kantapatkie/xsurface-backend:latest
docker push kantapatkie/xsurface-backend:v1.0.0

# Push frontend images
docker push kantapatkie/xsurface-frontend:latest
docker push kantapatkie/xsurface-frontend:v1.0.0
```

### 1.4 Verify Images

Visit: https://hub.docker.com/r/kantapatkie/xsurface-backend
Visit: https://hub.docker.com/r/kantapatkie/xsurface-frontend

---

## 2. Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://mongodb:27017/xsurface
NODE_ENV=production
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:6001/api
```

### Production Frontend (.env.production)
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api
```

---

## 3. Deployment Options

### Option 1: Docker Compose (VPS/Cloud)

#### 3.1 Prepare Server
```bash
# Install Docker and Docker Compose on Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose -y
sudo systemctl enable docker
sudo systemctl start docker
```

#### 3.2 Clone Repository
```bash
git clone https://github.com/KantapatKiie/xsurface.git
cd xsurface/PT2_3_WebApp
```

#### 3.3 Update Environment Variables
```bash
# Update frontend/.env.local with production API URL
echo "NEXT_PUBLIC_API_URL=http://your-server-ip:6001/api" > frontend/.env.local
```

#### 3.4 Deploy
```bash
# Start all services
./start.sh

# Or manually
docker-compose up -d --build
```

#### 3.5 Nginx Reverse Proxy (Optional)
```nginx
# /etc/nginx/sites-available/xsurface
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:6001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

---

### Option 2: Railway.app

#### 2.1 Create New Project
1. Visit https://railway.app
2. Create new project
3. Add MongoDB database from marketplace

#### 2.2 Deploy Backend
```bash
# Add Railway remote
railway login
railway init

# Deploy backend
cd backend
railway up

# Set environment variables in Railway dashboard:
# PORT=5000
# MONGODB_URI=(from Railway MongoDB service)
# NODE_ENV=production
```

#### 2.3 Deploy Frontend
```bash
cd ../frontend
railway up

# Set environment variables:
# NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api
```

#### 2.4 Automatic Seed
```bash
# In Railway backend service, add build command:
# npm install && npm run build && npx ts-node src/seed.ts
```

---

### Option 3: Render.com

#### 3.1 Create MongoDB Atlas Account
1. Visit https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string

#### 3.2 Deploy Backend (Web Service)
- Repository: https://github.com/KantapatKiie/xsurface
- Root Directory: `PT2_3_WebApp/backend`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment Variables:
  ```
  PORT=5000
  MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/xsurface
  NODE_ENV=production
  ```

#### 3.3 Deploy Frontend (Web Service)
- Root Directory: `PT2_3_WebApp/frontend`
- Build Command: `npm install && npm run build`
- Start Command: `npm start`
- Environment Variables:
  ```
  NEXT_PUBLIC_API_URL=https://xsurface-backend.onrender.com/api
  ```

---

### Option 4: AWS ECS (Elastic Container Service)

#### 4.1 Push to ECR (Elastic Container Registry)
```bash
# Login to ECR
aws ecr get-login-password --region ap-southeast-1 | docker login --username AWS --password-stdin your-account-id.dkr.ecr.ap-southeast-1.amazonaws.com

# Create repositories
aws ecr create-repository --repository-name xsurface-backend
aws ecr create-repository --repository-name xsurface-frontend

# Tag and push
docker tag kantapatkie/xsurface-backend:latest your-account-id.dkr.ecr.ap-southeast-1.amazonaws.com/xsurface-backend:latest
docker push your-account-id.dkr.ecr.ap-southeast-1.amazonaws.com/xsurface-backend:latest

docker tag kantapatkie/xsurface-frontend:latest your-account-id.dkr.ecr.ap-southeast-1.amazonaws.com/xsurface-frontend:latest
docker push your-account-id.dkr.ecr.ap-southeast-1.amazonaws.com/xsurface-frontend:latest
```

#### 4.2 Create ECS Cluster
```bash
aws ecs create-cluster --cluster-name xsurface-cluster
```

#### 4.3 Create Task Definitions
Create `task-definition-backend.json`:
```json
{
  "family": "xsurface-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "backend",
      "image": "your-account-id.dkr.ecr.ap-southeast-1.amazonaws.com/xsurface-backend:latest",
      "portMappings": [{"containerPort": 5000, "protocol": "tcp"}],
      "environment": [
        {"name": "PORT", "value": "5000"},
        {"name": "MONGODB_URI", "value": "mongodb+srv://..."},
        {"name": "NODE_ENV", "value": "production"}
      ]
    }
  ]
}
```

#### 4.4 Deploy Services
```bash
aws ecs create-service \
  --cluster xsurface-cluster \
  --service-name xsurface-backend \
  --task-definition xsurface-backend \
  --desired-count 1 \
  --launch-type FARGATE
```

---

### Option 5: DigitalOcean App Platform

#### 5.1 Connect Repository
1. Go to https://cloud.digitalocean.com/apps
2. Click "Create App"
3. Connect GitHub repository: `KantapatKiie/xsurface`

#### 5.2 Configure Components

**Backend:**
- Source Directory: `PT2_3_WebApp/backend`
- Dockerfile Path: `PT2_3_WebApp/backend/Dockerfile`
- HTTP Port: 5000
- Environment Variables:
  ```
  PORT=5000
  MONGODB_URI=${db.DATABASE_URL}
  NODE_ENV=production
  ```

**Frontend:**
- Source Directory: `PT2_3_WebApp/frontend`
- Dockerfile Path: `PT2_3_WebApp/frontend/Dockerfile`
- HTTP Port: 3000
- Environment Variables:
  ```
  NEXT_PUBLIC_API_URL=${backend.PUBLIC_URL}/api
  ```

**Database:**
- Add MongoDB from marketplace

---

## 4. Using Docker Hub Images

### Pull and Run from Docker Hub

```bash
# Create network
docker network create xsurface-network

# Run MongoDB
docker run -d \
  --name mongodb \
  --network xsurface-network \
  -v mongodb_data:/data/db \
  mongo:latest

# Run Backend
docker run -d \
  --name backend \
  --network xsurface-network \
  -p 6001:5000 \
  -e PORT=5000 \
  -e MONGODB_URI=mongodb://mongodb:27017/xsurface \
  -e NODE_ENV=production \
  kantapatkie/xsurface-backend:latest

# Seed database
docker exec backend npx ts-node src/seed.ts

# Run Frontend
docker run -d \
  --name frontend \
  --network xsurface-network \
  -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=http://localhost:6001/api \
  kantapatkie/xsurface-frontend:latest
```

### Docker Compose with Hub Images

Create `docker-compose.hub.yml`:
```yaml
services:
  mongodb:
    image: mongo:latest
    container_name: xsurface-mongodb
    restart: unless-stopped
    volumes:
      - mongodb_data:/data/db
    networks:
      - xsurface-network

  backend:
    image: kantapatkie/xsurface-backend:latest
    container_name: xsurface-backend
    restart: unless-stopped
    ports:
      - "6001:5000"
    environment:
      - PORT=5000
      - MONGODB_URI=mongodb://mongodb:27017/xsurface
      - NODE_ENV=production
    depends_on:
      - mongodb
    networks:
      - xsurface-network

  frontend:
    image: kantapatkie/xsurface-frontend:latest
    container_name: xsurface-frontend
    restart: unless-stopped
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://localhost:6001/api
    depends_on:
      - backend
    networks:
      - xsurface-network

volumes:
  mongodb_data:

networks:
  xsurface-network:
    driver: bridge
```

Deploy:
```bash
docker-compose -f docker-compose.hub.yml up -d
```

---

## 5. CI/CD Pipeline

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:
```yaml
name: Build and Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-push:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Login to Docker Hub
        uses: docker/login-action@v2
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
      
      - name: Build and Push Backend
        uses: docker/build-push-action@v4
        with:
          context: ./PT2_3_WebApp/backend
          push: true
          tags: |
            kantapatkie/xsurface-backend:latest
            kantapatkie/xsurface-backend:${{ github.sha }}
      
      - name: Build and Push Frontend
        uses: docker/build-push-action@v4
        with:
          context: ./PT2_3_WebApp/frontend
          push: true
          tags: |
            kantapatkie/xsurface-frontend:latest
            kantapatkie/xsurface-frontend:${{ github.sha }}
```

---

## 6. Health Checks & Monitoring

### Backend Health Endpoint
Add to `backend/src/index.ts`:
```typescript
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});
```

### Docker Health Check
Add to `backend/Dockerfile`:
```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "require('http').get('http://localhost:5000/health', (r) => r.statusCode === 200 ? process.exit(0) : process.exit(1))"
```

### Monitoring Tools
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Logs**: Datadog, Logtail, CloudWatch
- **APM**: New Relic, Sentry

---

## 7. SSL/HTTPS Setup

### Let's Encrypt with Certbot (Nginx)
```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Cloudflare (Free SSL)
1. Add domain to Cloudflare
2. Update nameservers
3. Enable SSL/TLS (Full mode)
4. Create DNS records pointing to server IP

---

## 8. Scaling Strategies

### Horizontal Scaling
```bash
# Scale backend to 3 replicas
docker-compose up -d --scale backend=3

# Use load balancer (Nginx)
upstream backend_servers {
    server localhost:6001;
    server localhost:6002;
    server localhost:6003;
}
```

### Database Replication
```yaml
# MongoDB Replica Set
services:
  mongodb-primary:
    image: mongo:latest
    command: mongod --replSet rs0 --bind_ip_all
  
  mongodb-secondary:
    image: mongo:latest
    command: mongod --replSet rs0 --bind_ip_all
```

---

## 9. Backup Strategy

### Database Backup
```bash
# Automated daily backup
0 2 * * * docker exec mongodb mongodump --out /backup/$(date +\%Y\%m\%d) && find /backup -mtime +7 -delete
```

### Restore
```bash
docker exec -i mongodb mongorestore /backup/20260115
```

---

## 10. Troubleshooting

### Check Container Logs
```bash
docker logs backend -f
docker logs frontend -f
docker logs mongodb -f
```

### Common Issues

**Frontend cannot connect to backend:**
- Verify NEXT_PUBLIC_API_URL is correct
- Check CORS settings in backend
- Ensure backend is running on correct port

**Database connection failed:**
- Check MONGODB_URI format
- Verify MongoDB container is running
- Check network connectivity

**Port conflicts:**
- Use `lsof -ti:6001 | xargs kill -9` to free port
- Or change port in docker-compose.yml

---

## 11. Cost Estimation

| Provider | Monthly Cost | Specs |
|----------|--------------|-------|
| Railway | $5-20 | 512MB RAM, shared CPU |
| Render | $7-25 | 512MB RAM, 0.5 CPU |
| DigitalOcean | $12-24 | 1GB RAM, 1 vCPU |
| AWS ECS | $15-40 | Fargate 0.5vCPU, 1GB |
| VPS (Linode) | $5-10 | 1GB RAM, 1 Core |

---

## 12. Production Checklist

- [ ] Environment variables set correctly
- [ ] Database backups configured
- [ ] SSL/HTTPS enabled
- [ ] Monitoring and alerting set up
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Error logging enabled
- [ ] Health checks implemented
- [ ] Auto-scaling rules defined
- [ ] Disaster recovery plan documented

---

## Support
For issues and questions:
- GitHub: https://github.com/KantapatKiie/xsurface/issues
- Email: kantapat.sangjan@example.com

---

**Last Updated**: January 15, 2026
**Version**: 1.0.0
