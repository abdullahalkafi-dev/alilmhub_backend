# AlilmHub Backend

A sophisticated job matching platform for the soccer industry, connecting candidates (players, coaches, staff) with employers (clubs, academies, agents).

## 🚀 Quick Start

### Using Docker (Recommended)
```bash
# Start all services (Backend, Redis, Elasticsearch, Kibana)
docker compose -f docker-compose.dev.yml up -d

# Check logs
docker logs alilmhub-backend_dev --tail 50

# Stop services
docker compose -f docker-compose.dev.yml down
```

### Local Development
```bash
# Install dependencies
bun install

# Run development server
bun run dev
```

## 📍 Access Points

- **Backend API:** http://localhost:5013
- **Health Check:** http://localhost:5013/health
- **API Base:** http://localhost:5013/api/v1
- **Kibana:** http://localhost:5601 (when using Docker)

## 📚 Documentation

- **[Complete Project Analysis](./PROJECT_ANALYSIS.md)** - In-depth project documentation
- **[Postman Collection](./alilmhub-backend-complete.postman_collection.json)** - All API endpoints

## 🔌 API Endpoints Summary

### Authentication (`/api/v1/auth`)
- `POST /signup` - User registration
- `POST /login` - User login
- `POST /verify-email` - Email verification
- `POST /forgot-password` - Password reset request
- `POST /reset-password` - Reset password
- `POST /change-password` - Change password (auth required)
- `POST /resend-otp` - Resend OTP
- `DELETE /delete-account` - Delete account (auth required)

### User Management (`/api/v1/user`)
- `GET /` - Get all users (with pagination)
- `GET /me` - Get current user (auth required)
- `GET /:id` - Get user by ID
- `PATCH /:id` - Update user profile
- `PATCH /:id/status` - Update activation status
- `PATCH /:id/role` - Update user role

## 🛠️ Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB Atlas
- **Caching:** Redis
- **Search:** Elasticsearch
- **Auth:** JWT, bcrypt
- **Validation:** Zod
- **File Upload:** Multer, Sharp
- **Email:** Nodemailer
- **Real-time:** Socket.io
- **Logging:** Winston
- **Container:** Docker

## 🔐 Environment Setup

Create a `.env` file in `alilmhub_backend/` directory:

```env
NODE_ENV=development
PORT=5013
IP_ADDRESS=localhost
DATABASE_URL=mongodb+srv://user:pass@cluster.mongodb.net/alilmhub
BCRYPT_SALT_ROUNDS=12
JWT_SECRET=your_jwt_secret
JWT_EXPIRE_IN=1d
JWT_REFRESH_SECRET=your_refresh_secret
JWT_REFRESH_EXPIRE_IN=30d
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_password
REDIS_HOST=localhost
REDIS_PORT=6381
```

## 🧪 Testing with Postman

1. Import `alilmhub-backend-complete.postman_collection.json` into Postman
2. Set environment variable `base_url` to `http://localhost:5013`
3. Start with the Health Check endpoint
4. Sign up a new user
5. Login to get JWT token (auto-saved)
6. Use authenticated endpoints

## 📦 Docker Services

When running with Docker Compose:

| Service | Port | Description |
|---------|------|-------------|
| Backend | 5013 | Main API server |
| Redis | 6381 | Caching service |
| Elasticsearch | 9200 | Search & logging |
| Kibana | 5601 | Elasticsearch UI |

## 🔍 Health Check

```bash
curl http://localhost:5013/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2025-10-25T08:49:18.960Z"
}
```

## 📖 API Documentation

For complete API documentation with request/response examples, see [PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md)

## 🐛 Troubleshooting

### Check Docker logs
```bash
docker logs alilmhub-backend_dev --tail 100
```

### Check running containers
```bash
docker ps
```

### Restart services
```bash
docker compose -f docker-compose.dev.yml restart
```

## 📝 Development Commands

```bash
# Install dependencies
bun install

# Development mode with hot reload
bun run dev

# Build TypeScript
bun run build

# Production mode
bun start

# Docker commands
docker compose -f docker-compose.dev.yml up -d    # Start
docker compose -f docker-compose.dev.yml down     # Stop
docker compose -f docker-compose.dev.yml logs -f  # View logs
```

## 🤝 Contributing

1. Follow the existing code structure
2. Use TypeScript for type safety
3. Validate inputs with Zod schemas
4. Handle errors with custom error classes
5. Add proper logging
6. Write tests for new features

## 📄 License

[Your License Here]

## 👥 Team

[Your Team Information]

---

**Status:** ✅ Development - Fully Operational  
**Version:** 1.0.0  
**Last Updated:** October 25, 2025
