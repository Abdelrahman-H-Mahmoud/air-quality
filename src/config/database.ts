import mongoose from 'mongoose';
import { config } from './env.config';

export async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(config.database.url);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
}

export async function disconnectDB(): Promise<void> {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
} 