# ParkIT Backend

The backend of ParkIT is built with Node.js, Express.js, and MongoDB, providing robust API endpoints for the frontend application.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Express Validator for input validation

## Project Structure

```
backend/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   └── server.js
├── tests/
└── package.json
```

## Endpoints

### Authentication

- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - User login

### User Management

- PUT `/users/:id/change-password` - Change user password
- POST `/users/:id/complete-tutorial` - Tutorial completion

### Car Parks

- GET `/api/carparks` - Get all car parks
- GET `/api/carparks/:id` - Get specific car park

### Favorites Car Parks

- POST `/favorites/add` - Add to favorites
- POST `/favorites/remove` - Remove to favorites
- GET `/favorites/:userId` - Get user's favorites

### Parking Sessions

- POST `/api/checkin` - Check in to car park
- GET `/api/checkins/:userId` - Get check-in history for a user
- POST `/api/checkout` - Check out from car park
- GET `/checkin/:userId/:carparkId` - Get check-in status
- GET `/parking-history/:userId` - Get parking history for a user

### Expenses

- GET `/api/expenses/:userId` - Get user parking expenses

### Expenses

- POST `/feedbacks` - User feedbacks

## Available Scripts

```bash
# Install dependencies
npm install

# Start development server
npm run dev

```

## Environment Variables

Create a `.env` file in backend directories. The following variables are required:

### Backend (.env)

```
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Environment Setup

1. Create a `.env` file in the backend root directory
2. Add required environment variables (see Environment Variables section above)
3. Install dependencies using `npm install`
4. Ensure MongoDB is running locally or update MONGODB_URI with your cloud database URL
