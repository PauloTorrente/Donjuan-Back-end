import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import router from './src/api/router.js';
import cors from 'cors';
import helmet from 'helmet';
import './src/api/users/cleanUnconfirmedUsers.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use('/api', router);

console.log('MONGO_URL:', process.env.MONGO_URL);
console.log('MONGO_DB_NAME:', process.env.MONGO_DB_NAME);

mongoose.connect(process.env.MONGO_URL, {
  dbName: process.env.MONGO_DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
}).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Database connection error:', err);
  process.exit(1);
});
