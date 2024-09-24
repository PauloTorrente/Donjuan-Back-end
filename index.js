import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import router from './src/api/router.js'; // This should include users.router
import cors from 'cors'; // Add CORS for cross-origin requests
import helmet from 'helmet'; // Add Helmet for security
import './src/api/users/cleanUnconfirmedUsers.js'; // cleanUnconfirmedUsers.js


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors()); // Enable CORS
app.use(helmet()); // Use Helmet for security

// Setting up routes
app.use('/api', router); // Ensure '/api' prefix is applied to your routes

// Log the environment variables for debugging
console.log('MONGO_URL:', process.env.MONGO_URL);
console.log('MONGO_DB_NAME:', process.env.MONGO_DB_NAME);

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Database connection error:', err);
  process.exit(1); // Exit the application in case of a database connection error
});
