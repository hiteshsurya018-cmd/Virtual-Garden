# Virtual Garden Backend API Documentation

## Overview

The Virtual Garden backend is a comprehensive REST API built with Node.js, Express, and Prisma. It provides all the functionality needed for the AI-powered virtual garden application.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation & Setup

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Set up environment variables:**

```bash
cp .env.example .env
# Edit .env with your database URL and other configuration
```

3. **Initialize database:**

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

4. **Start the server:**

```bash
npm run server        # Production
npm run server:dev    # Development with hot reload
npm run start:backend # Full setup (recommended for first time)
```

The API will be available at `http://localhost:3001`

## 📋 API Endpoints

### Authentication (`/api/auth`)

#### POST `/api/auth/register`

Register a new user account.

**Request Body:**

```json
{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response:**

```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "email": "user@example.com",
    "username": "username",
    "firstName": "John",
    "lastName": "Doe",
    "level": 1,
    "experience": 0,
    "coins": 100
  },
  "accessToken": "jwt_token",
  "refreshToken": "refresh_token"
}
```

#### POST `/api/auth/login`

Login with email and password.

**Request Body:**

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/google`

OAuth login with Google.

**Request Body:**

```json
{
  "googleId": "google_id",
  "email": "user@gmail.com",
  "firstName": "John",
  "lastName": "Doe",
  "avatar": "avatar_url"
}
```

#### POST `/api/auth/refresh`

Refresh access token.

**Request Body:**

```json
{
  "refreshToken": "refresh_token"
}
```

### User Management (`/api/user`)

#### GET `/api/user/profile`

Get current user profile. Requires authentication.

**Response:**

```json
{
  "id": "user_id",
  "email": "user@example.com",
  "username": "username",
  "firstName": "John",
  "lastName": "Doe",
  "level": 3,
  "experience": 2500,
  "coins": 1250,
  "gardens": [...],
  "achievements": [...],
  "stats": {
    "totalGardens": 4,
    "totalPlants": 15,
    "healthyPlants": 12,
    "successRate": 80
  }
}
```

#### PUT `/api/user/profile`

Update user profile. Requires authentication.

**Request Body:**

```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "username": "newusername"
}
```

#### GET `/api/user/achievements`

Get user achievements with progress.

#### GET `/api/user/stats`

Get detailed user statistics.

#### GET `/api/user/friends`

Get user's friends list.

#### POST `/api/user/reward`

Award coins or experience (internal use).

**Request Body:**

```json
{
  "type": "coins", // or "experience"
  "amount": 50,
  "reason": "Daily login bonus"
}
```

### Gardens (`/api/garden`)

#### GET `/api/garden`

Get all user's gardens. Requires authentication.

#### POST `/api/garden`

Create a new garden. Requires authentication.

**Request Body:**

```json
{
  "name": "My Rose Garden",
  "description": "A beautiful garden full of roses"
}
```

#### GET `/api/garden/:id`

Get specific garden details.

#### PUT `/api/garden/:id`

Update garden information.

#### DELETE `/api/garden/:id`

Delete a garden.

#### POST `/api/garden/plants`

Add a plant to a garden.

**Request Body:**

```json
{
  "gardenId": "garden_id",
  "speciesId": "species_id",
  "x": 150,
  "y": 200,
  "z": 0
}
```

#### POST `/api/garden/plants/:plantId/water`

Water a specific plant.

#### POST `/api/garden/plants/:plantId/harvest`

Harvest a mature plant.

#### DELETE `/api/garden/plants/:plantId`

Remove a plant from garden.

### Plants (`/api/plants`)

#### GET `/api/plants/species`

Get all available plant species.

**Query Parameters:**

- `category`: Filter by category (herb, flower, vegetable, etc.)
- `careLevel`: Filter by care difficulty (easy, medium, hard)
- `sunlight`: Filter by sunlight requirement (full, partial, shade)
- `search`: Search by name or description
- `limit`: Results per page (default: 20)
- `offset`: Page offset (default: 0)

#### GET `/api/plants/species/:id`

Get detailed information about a plant species.

#### GET `/api/plants/species/:id/care`

Get care instructions for a specific plant species.

#### GET `/api/plants/categories`

Get all plant categories with counts.

#### GET `/api/plants/my-plants`

Get all plants owned by the current user. Requires authentication.

#### GET `/api/plants/health-stats`

Get health statistics for user's plants. Requires authentication.

### Store (`/api/store`)

#### GET `/api/store/categories`

Get all store categories with items.

#### GET `/api/store/items`

Get store items with filtering.

**Query Parameters:**

- `category`: Filter by category ID
- `type`: Filter by item type (seed, plant, tool, decoration)
- `search`: Search by name or description
- `limit`: Results per page
- `offset`: Page offset

#### GET `/api/store/items/:id`

Get specific store item details.

#### POST `/api/store/purchase`

Purchase an item from the store. Requires authentication.

**Request Body:**

```json
{
  "itemId": "item_id",
  "quantity": 1
}
```

#### GET `/api/store/purchases`

Get user's purchase history. Requires authentication.

#### GET `/api/store/featured`

Get featured/recommended store items.

### AI Services (`/api/ai`)

#### POST `/api/ai/analyze-garden`

Upload and analyze a garden image. Requires authentication.

**Request:** Multipart form with image file.

**Response:**

```json
{
  "message": "Image uploaded successfully, analysis in progress",
  "analysisId": "analysis_id",
  "status": "processing"
}
```

#### GET `/api/ai/analysis/:id`

Get analysis results. Requires authentication.

**Response:**

```json
{
  "id": "analysis_id",
  "status": "completed",
  "confidence": 0.89,
  "gardenLayout": {
    "plants": [...],
    "objects": [...],
    "zones": [...],
    "recommendations": [...]
  },
  "processingTime": 2500
}
```

#### POST `/api/ai/identify-plant`

Identify a plant from an image. Requires authentication.

**Request:** Multipart form with image file.

#### POST `/api/ai/detect-objects`

Detect objects in a garden image. Requires authentication.

#### POST `/api/ai/segment-layout`

Perform spatial segmentation on a garden image. Requires authentication.

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens expire after 24 hours. Use the refresh token endpoint to get a new access token.

## 📊 Database Schema

The backend uses PostgreSQL with Prisma ORM. Key models include:

- **User**: User accounts with profile information
- **Garden**: Virtual gardens owned by users
- **PlantSpecies**: Available plant types and their properties
- **PlantInstance**: Individual plants in gardens
- **StoreCategory**: Store item categories
- **StoreItem**: Items available for purchase
- **Purchase**: User purchase history
- **Achievement**: Available achievements
- **UserAchievement**: User achievement progress
- **AIAnalysis**: AI processing results

## 🧪 Testing

### Manual Testing

1. **Health Check:**

```bash
curl http://localhost:3001/api/health
```

2. **Register User:**

```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","username":"testuser","password":"password123"}'
```

3. **Login:**

```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

4. **Get Plant Species:**

```bash
curl http://localhost:3001/api/plants/species
```

### Demo Credentials

For testing, you can use the demo login in the frontend:

- **Email:** `demo@garden.com`
- **Password:** `demo123`

## 🚀 Deployment

### Environment Variables for Production

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/virtual_garden"

# JWT Secrets (Generate secure random strings)
JWT_SECRET="your-production-jwt-secret-32-chars-minimum"
JWT_REFRESH_SECRET="your-production-refresh-secret-32-chars-minimum"

# Server
PORT=3001
NODE_ENV="production"
FRONTEND_URL="https://your-frontend-domain.com"

# AI Services (Optional)
PLANTNET_API_KEY="your-plantnet-api-key"
```

### Production Deployment Steps

1. **Build the application:**

```bash
npm run build
```

2. **Set up database:**

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

3. **Start the server:**

```bash
npm run server
```

## 🔧 Configuration

### Rate Limiting

- API endpoints are limited to 100 requests per 15 minutes per IP
- Adjust in `server/index.js` if needed

### File Uploads

- Image uploads limited to 10MB
- Supported formats: JPG, PNG, WEBP
- Configure in `server/routes/ai.js`

### CORS

- Configured to allow requests from frontend URL
- Update `FRONTEND_URL` environment variable for production

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Check `DATABASE_URL` in `.env`
   - Ensure PostgreSQL is running
   - Run `npm run db:push` to sync schema

2. **JWT Token Errors:**
   - Verify `JWT_SECRET` is set and at least 32 characters
   - Check token format in Authorization header

3. **File Upload Issues:**
   - Check file size (max 10MB)
   - Verify file type (images only)
   - Ensure multer middleware is working

4. **Seeding Failures:**
   - Run `npm run db:generate` first
   - Check database connectivity
   - Verify schema is up to date

### Debug Mode

Set `NODE_ENV=development` for detailed error messages and logging.

## 📈 Performance

### Optimization Tips

1. **Database Indexing:**
   - User email and username are indexed
   - Garden userId is indexed for fast queries

2. **Caching:**
   - Plant species data is relatively static
   - Consider Redis for frequently accessed data

3. **File Storage:**
   - Consider cloud storage (Cloudinary, AWS S3) for production
   - Implement CDN for static assets

## 🔄 API Versioning

Current API version: `v1`
All endpoints are prefixed with `/api/`

Future versions will be accessible via `/api/v2/`, etc.

## 📞 Support

For API issues or questions:

- Check this documentation
- Review error logs
- Test with provided curl examples
- Verify environment configuration

---

**Virtual Garden Backend API** - Built with ❤️ using Node.js, Express, and Prisma
