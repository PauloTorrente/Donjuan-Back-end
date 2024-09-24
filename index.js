import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import router from './src/api/router.js';
import './src/api/users/cleanup.js'; 

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Setting up routes
app.use('/api', router);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Database connection error:', err);
  process.exit(1); // Exit the application in case of a database connection error
});
