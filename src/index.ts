import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';
import { config } from './config/env.config';
import airQualityRoutes from './routes/airQuality.routes';
import { startAirQualityScheduler } from './schedulers/airQuality.scheduler';

const app: Express = express();
const port = config.server.port;

// Connect to MongoDB
mongoose.connect(config.database.url)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from TypeScript Express API!' });
});

// Mount Air Quality routes
app.use('/api/air-quality', airQualityRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  // Start the scheduler after the server is running
  startAirQualityScheduler();
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await mongoose.disconnect();
  process.exit();
}); 