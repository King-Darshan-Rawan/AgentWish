import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Load env vars
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
import authRoutes from './routes/auth.js';
import agentRoutes from './routes/agentRoutes.js'; 
import taskRoutes from './routes/taskRoutes.js';  // Use this for task-related routes

app.use('/api/auth', authRoutes);
console.log("Auth routes loaded");

app.use('/api/agents', agentRoutes);
console.log("Agent routes loaded");

// Mount all task-related routes here
app.use('/api', taskRoutes);
console.log("Task routes loaded");

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
