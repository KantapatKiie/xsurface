# Part 2: Web Application with React, Node.js, and MongoDB

## Overview

Full-stack product catalog system built with Next.js, Node.js (Express), TypeScript, and MongoDB. Features include product listing, search functionality, upload system, and detailed product views.

## 🚀 Quick Start with Docker

```bash
cd PT2_WebApp
./start.sh
```

Access the application:

- Frontend: http://localhost:3000
- Backend: http://localhost:6001/api
- MongoDB: mongodb://localhost:27017

Stop the application:

```bash
./stop.sh
```

View logs:

```bash
./logs.sh
```

See [DOCKER.md](DOCKER.md) for detailed Docker documentation.

## Tech Stack

### Frontend

- **Next.js 16** (App Router)
- **TypeScript** - Type safety
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend

- **Node.js + Express** - REST API server
- **TypeScript** - Type-safe backend
- **MongoDB + Mongoose** - Database & ODM
- **Multer** - File upload handling
- **CORS** - Cross-origin resource sharing

## Project Structure

```
PT2_WebApp/
├── frontend/                 # Next.js Frontend
│   ├── app/
│   │   ├── layout.tsx       # Root layout with Navbar & Footer
│   │   ├── page.tsx         # Landing page
│   │   ├── products/
│   │   │   ├── page.tsx     # Product list with search
│   │   │   └── [id]/
│   │   │       └── page.tsx # Product detail page
│   │   ├── upload/
│   │   │   └── page.tsx     # Upload product page
│   │   └── registry.tsx     # Styled Components registry
│   ├── components/
│   │   ├── Navbar.tsx       # Navigation bar
│   │   ├── Footer.tsx       # Footer component
│   │   └── ProductCard.tsx  # Product card component
│   ├── lib/
│   │   └── api.ts           # API client functions
│   ├── types/
│   │   └── product.ts       # TypeScript interfaces
│   └── .env.local           # Environment variables
│
└── backend/                  # Express Backend
    ├── src/
    │   ├── models/
    │   │   └── Product.ts    # Mongoose schema
    │   ├── controllers/
    │   │   └── productController.ts  # Business logic
    │   ├── routes/
    │   │   └── productRoutes.ts      # API routes
    │   └── index.ts          # Server entry point
    ├── uploads/              # Uploaded images
    ├── .env                  # Environment variables
    └── tsconfig.json         # TypeScript config
```

## Database Schema

### Product Model

```typescript
{
  name: String (required)           // Product name
  code: String (required, unique)   // Product code
  price: Number (required, min: 0)  // Product price
  category: String (optional)       // Product category
  description: String (optional)    // Product description
  image: String (required)          // Main product image path
  images: [String] (optional)       // Additional images
  createdAt: Date (auto)            // Creation timestamp
  updatedAt: Date (auto)            // Update timestamp
}
```

**Indexes:**

- Text index on `name` and `code` for search functionality
- Unique index on `code`

## API Endpoints

### Products API (`/api/products`)

| Method | Endpoint        | Description        | Query Params                                  |
| ------ | --------------- | ------------------ | --------------------------------------------- |
| GET    | `/`           | Get all products   | `search`, `category`, `page`, `limit` |
| GET    | `/categories` | Get all categories | -                                             |
| GET    | `/:id`        | Get product by ID  | -                                             |
| POST   | `/`           | Create new product | -                                             |
| PUT    | `/:id`        | Update product     | -                                             |
| DELETE | `/:id`        | Delete product     | -                                             |

### Request/Response Examples

**GET /api/products**

```json
{
  "products": [
    {
      "_id": "...",
      "name": "Product Name",
      "code": "xsf0001",
      "price": 1000,
      "category": "Tile",
      "description": "...",
      "image": "/uploads/...",
      "createdAt": "2026-01-15T...",
      "updatedAt": "2026-01-15T..."
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  }
}
```

**POST /api/products** (multipart/form-data)

```
name: Product Name
code: xsf0001
price: 1000
category: Tile (optional)
description: ... (optional)
image: <file>
```

## Setup Instructions

### Option 1: Docker (Recommended) 🐳

**Prerequisites:**

- Docker
- Docker Compose

**Steps:**

```bash
cd PT2_WebApp
./start.sh
```

That's it! The application will be running with MongoDB, Backend, and Frontend.

See [DOCKER.md](DOCKER.md) for more Docker commands and troubleshooting.

### Option 2: Manual Setup

**Prerequisites:**

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

```bash
cd PT2_WebApp/backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env and set MONGODB_URI

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

**Environment Variables (.env):**

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/xsurface
NODE_ENV=development
```

### Frontend Setup

```bash
cd PT2_WebApp/frontend

# Install dependencies
npm install

# Configure environment
cp .env.local.example .env.local
# Edit .env.local

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

**Environment Variables (.env.local):**

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Database Setup

1. **Local MongoDB:**

```bash
# Start MongoDB
mongod

# Create database (automatic on first connection)
```

2. **MongoDB Atlas:**

```bash
# Get connection string from Atlas
# Update MONGODB_URI in backend/.env
```

## Running the Application

### Development Mode

1. **Start MongoDB:**

```bash
mongod
```

2. **Start Backend:**

```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

3. **Start Frontend:**

```bash
cd frontend
npm run dev
# App runs on http://localhost:3000
```

4. **Access the application:**

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health check: http://localhost:5000/api/health

### Production Mode

```bash
# Build backend
cd backend
npm run build
npm start

# Build frontend
cd frontend
npm run build
npm start
```

## Features

### ✅ Implemented Features

1. **Landing Page**

   - Hero banner section
   - Category grid with icons
   - Featured products slider
   - Responsive design
2. **Product List Page**

   - Grid layout for products
   - Search by name or code
   - Pagination
   - Category filtering
   - Product cards with hover effects
3. **Upload Product Page**

   - Image upload with drag & drop
   - Image preview
   - Form validation
   - File size limit (50MB)
   - Success/error messaging
4. **Product Detail Page** (Optional Feature)

   - Full product information
   - Large image display
   - Add to cart button
   - Wishlist button
   - Back navigation
5. **Navigation**

   - Persistent navbar
   - Active page highlighting
   - Responsive menu
   - Footer with links

### 🎨 Design Features

- **Styled Components** for all styling
- **Responsive design** (mobile, tablet, desktop)
- **Gradient backgrounds**
- **Hover animations**
- **Loading states**
- **Error handling**
- **Image optimization** with Next.js Image

### 🔍 Search Functionality

- Search by product name
- Search by product code
- Case-insensitive search
- Real-time search results
- Pagination with search

## API Testing

### Using cURL

```bash
# Get all products
curl http://localhost:5000/api/products

# Search products
curl "http://localhost:5000/api/products?search=tile"

# Get product by ID
curl http://localhost:5000/api/products/[PRODUCT_ID]

# Create product
curl -X POST http://localhost:5000/api/products \
  -F "name=Test Product" \
  -F "code=xsf0001" \
  -F "price=1000" \
  -F "category=Tile" \
  -F "image=@/path/to/image.jpg"

# Delete product
curl -X DELETE http://localhost:5000/api/products/[PRODUCT_ID]
```

### Using Postman

1. Import collection or create requests
2. Set base URL: `http://localhost:5000/api`
3. For file uploads, use form-data with `image` field

## Troubleshooting

### Common Issues

**Port already in use:**

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or change PORT in .env
```

**MongoDB connection failed:**

```bash
# Check if MongoDB is running
mongod --version

# Check connection string in .env
```

**CORS errors:**

```bash
# Backend CORS is configured for all origins in development
# Update cors configuration in src/index.ts for production
```

**Image upload fails:**

```bash
# Check uploads directory exists
mkdir -p uploads

# Check file permissions
chmod 755 uploads
```

## Database Explanation

The application uses a simple yet effective schema:

- **Products Collection** stores all product data
- **Text indexes** enable fast search on name and code
- **Timestamps** automatically track creation and updates
- **File paths** are stored as strings (images saved to disk)
- **Categories** are stored as strings for flexibility

**Scalability considerations:**

- Add separate Categories collection for validation
- Add Users collection for authentication
- Add Orders collection for e-commerce
- Implement image CDN for better performance
- Add Redis for caching frequently accessed data

## Technologies Used

### Frontend Technologies

- Next.js 16 - React framework
- TypeScript - Type safety
- Styled Components - CSS-in-JS
- Axios - HTTP client
- React Icons - Icon library
- React Hooks - State management

### Backend Technologies

- Node.js - Runtime
- Express - Web framework
- TypeScript - Type safety
- Mongoose - MongoDB ODM
- Multer - File upload
- CORS - Cross-origin support
- Dotenv - Environment variables

### Development Tools

- ESLint - Code linting
- Nodemon - Auto-restart
- ts-node - TypeScript execution

## Performance Optimizations

- Image optimization with Next.js Image component
- Lazy loading for product cards
- Pagination to limit data transfer
- MongoDB indexing for fast queries
- Static file serving for uploads
- CSS-in-JS for component-scoped styles

## Security Features

- Input validation on backend
- File type validation for uploads
- File size limits
- Unique product codes
- CORS configuration
- Environment variable protection

---

**Developer:** XSF Candidate
**Date:** January 15, 2026
**Test:** XSF FullStack Developer Test - Part 2
**Status:** ✅ Complete
