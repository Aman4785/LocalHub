# IPM Backend - Service Provider Platform API

A Node.js and Express backend server for the Local Services Platform that connects users with service providers. This API handles authentication, user management, service provider management, and booking operations.

## 🚀 Features

- **User Authentication**: JWT-based authentication for customers and service providers
- **Dual User System**: Separate models for customers and service providers
- **Password Security**: Bcrypt password hashing
- **MongoDB Integration**: Mongoose ODM for data modeling
- **CORS Enabled**: Cross-origin resource sharing for frontend integration
- **RESTful API**: Clean API endpoints for all operations

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (v6 or higher) - Running locally or MongoDB Atlas
- [npm](https://www.npmjs.com/) (v9 or higher)

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express 5.2.1
- **Database**: MongoDB with Mongoose 9.1.4
- **Authentication**: JWT (jsonwebtoken 9.0.3)
- **Password Hashing**: Bcrypt 6.0.0
- **Middleware**: CORS, Cookie Parser, Express JSON/URL Encoded

## 📦 Installation

1. Navigate to the backend directory:

```bash
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of the Backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cons
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Ensure MongoDB is running:

```bash
# If using local MongoDB
mongod

# Or start MongoDB service (Windows)
net start MongoDB

# Or start MongoDB service (Linux/Mac)
sudo systemctl start mongod
```

## 🚀 Running the Application

### Development Mode

Start the server:

```bash
node app.js
```

Or with nodemon for auto-restart on file changes:

```bash
npm install -g nodemon
nodemon app.js
```

The server will be available at `http://localhost:5000`

### Production Mode

```bash
NODE_ENV=production node app.js
```

## 📁 Project Structure

```
Backend/
├── config/
│   └── db.js              # MongoDB connection configuration
├── controllers/
│   └── authController.js  # Authentication logic (signup, login)
├── models/
│   ├── User.js            # Customer/User schema
│   └── Serviceman.js      # Service Provider schema
├── middleware/            # Custom middleware (future)
├── routes/                # API routes (future)
├── public/                # Static assets
├── views/                 # EJS templates (if needed)
├── app.js                 # Main application entry point
├── package.json           # Project dependencies
└── README.md              # Project documentation
```

## 🗄️ Database Models

### User Model (Customer)

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'customer'),
  address: String,
  phone: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Serviceman Model (Provider)

```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  category: String (required) - ['Electrician', 'Plumber', 'Cleaner',
            'Mechanic', 'Helper', 'Home Tutor', 'Beauty & Salon',
            'Carpenter', 'Painter', 'Appliance Repair', 'Cook'],
  experience: Number (required, in years),
  isAvailable: Boolean (default: true),
  rating: Number (default: 0),
  hourlyRate: Number (required),
  verified: Boolean (default: false),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔌 API Endpoints

### Authentication

#### POST /signup

Register a new user (customer or service provider)

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "role": "customer", // or "provider"
  "phone": "+91 9876543210",
  "address": "Kolkata, West Bengal",

  // Additional fields for providers
  "category": "Plumber",
  "experience": 5,
  "hourlyRate": 500
}
```

**Response:**

```json
{
  "message": "Registration successful!"
}
```

#### POST /login

Authenticate user and receive JWT token

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65abc123def456...",
    "name": "John Doe",
    "role": "customer"
  }
}
```

### Coming Soon

- GET /api/services - Get all services
- GET /api/services/:id - Get service by ID
- POST /api/bookings - Create new booking
- GET /api/bookings - Get user bookings
- PUT /api/profile - Update user profile
- GET /api/providers - Get all service providers
- GET /api/providers/:id - Get provider details

## 🔐 Authentication & Authorization

The API uses JWT (JSON Web Tokens) for authentication. After successful login, the client receives a token that must be included in subsequent requests.

**Usage:**

```javascript
// Include in request headers
Authorization: Bearer YOUR_JWT_TOKEN_HERE
```

## 🌐 CORS Configuration

CORS is configured to allow requests from the frontend development server:

- **Allowed Origin**: `http://localhost:5173`
- **Credentials**: Enabled

Update CORS settings in [app.js](app.js) for production deployment.

## 🔧 Environment Variables

| Variable       | Description                          | Default                        |
| -------------- | ------------------------------------ | ------------------------------ |
| `PORT`         | Server port number                   | 5000                           |
| `MONGODB_URI`  | MongoDB connection string            | mongodb://localhost:27017/cons |
| `JWT_SECRET`   | Secret key for JWT signing           | your_secret_key                |
| `NODE_ENV`     | Environment (development/production) | development                    |
| `FRONTEND_URL` | Frontend application URL             | http://localhost:5173          |

## 🧪 Testing

Currently, no automated tests are implemented. To test the API manually:

1. Use tools like [Postman](https://www.postman.com/) or [Thunder Client](https://www.thunderclient.com/)
2. Test authentication endpoints
3. Verify database connections
4. Check error handling

### Example Test Flow:

```bash
# 1. Register a customer
POST http://localhost:5000/signup
Body: { name, email, password, role: "customer", ... }

# 2. Register a provider
POST http://localhost:5000/signup
Body: { name, email, password, role: "provider", category, ... }

# 3. Login
POST http://localhost:5000/login
Body: { email, password }

# 4. Get JWT token from response
# 5. Use token for authenticated requests
```

## 📝 Development Guidelines

- Follow REST API best practices
- Use async/await for asynchronous operations
- Implement proper error handling
- Validate all user inputs
- Keep controllers thin, move business logic to services
- Document all API endpoints
- Use meaningful commit messages
- Keep sensitive data in environment variables

## 🐛 Common Issues & Troubleshooting

### MongoDB Connection Failed

```bash
Error: MongooseServerSelectionError
```

**Solution**: Ensure MongoDB is running and the connection string is correct

### Port Already in Use

```bash
Error: listen EADDRINUSE: address already in use :::5000
```

**Solution**: Kill the process using port 5000 or change the PORT in .env

### JWT Secret Warning

```bash
Warning: Using default JWT secret
```

**Solution**: Set a strong JWT_SECRET in your .env file

## 🔒 Security Best Practices

- ✅ Passwords are hashed using bcrypt with salt rounds
- ✅ JWT tokens expire after 1 day
- ✅ Email validation on registration
- ⚠️ Add rate limiting for API endpoints (recommended)
- ⚠️ Implement input validation and sanitization (recommended)
- ⚠️ Add helmet.js for security headers (recommended)
- ⚠️ Use HTTPS in production (required)

## 🚀 Deployment

### Prerequisites

- Node.js hosting (Heroku, Render, AWS, DigitalOcean)
- MongoDB Atlas or hosted MongoDB instance
- Environment variables configured

### Steps:

1. Set up MongoDB Atlas cluster
2. Update MONGODB_URI in production environment
3. Set strong JWT_SECRET
4. Update CORS origin to production frontend URL
5. Set NODE_ENV=production
6. Deploy to hosting platform
7. Test all endpoints in production

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is part of the IPM (Internal Project Management) system.

## 📞 Support

For issues or questions:

- Check the troubleshooting section
- Review MongoDB connection logs
- Contact the development team

## 🔄 Future Enhancements

- [ ] Add booking management endpoints
- [ ] Implement service provider search and filters
- [ ] Add rating and review system
- [ ] Implement real-time chat functionality
- [ ] Add payment integration
- [ ] Implement email notifications
- [ ] Add profile image upload
- [ ] Create admin dashboard endpoints
- [ ] Add comprehensive API documentation (Swagger/OpenAPI)
- [ ] Implement unit and integration tests
- [ ] Add request validation middleware
- [ ] Implement rate limiting
- [ ] Add logging system (Winston/Morgan)

---

Built with ❤️ using Node.js + Express + MongoDB
