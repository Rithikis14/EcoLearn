import dotenv from 'dotenv';
// 1. Load environment variables first
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';

const app = express();

// 2. Configure CORS to allow requests from your Vite frontend
const allowedOrigins = [
  'http://localhost:5173',
  'eco-learn-95de3umwo-rithik-v-kumars-projects.vercel.app' // Add your live Vercel URL
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);


// 3. Body parser middleware
app.use(express.json());

// 4. API Routes
app.use('/api/auth', authRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EcoLearn Server Running' });
});

// 5. Database Connection and Server Startup
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecolearn';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('[Database] Connected successfully to MongoDB');
    app.listen(PORT, () => {
      console.log(`[Server] Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('[Database] Connection failed:', err);
    process.exit(1);
  });