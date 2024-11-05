const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const checkInOutRoutes = require('./routes/checkInOutRoutes');
const parkingHistoryRoutes = require('./routes/parkingHistoryRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      'https://park-it-ashy.vercel.app',
      'http://localhost:3000',
      'https://api.data.gov.sg/v1/transport/carpark-availability',
    ], // List allowed origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // List allowed methods
    credentials: true, // If you need to allow cookies or authentication
  })
);
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', checkInOutRoutes);
app.use('/api', parkingHistoryRoutes);
app.use('/api', favoriteRoutes);
app.use('/api', expenseRoutes);
app.use('/api', feedbackRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
