import express, { Express } from 'express';
import { config } from './config/env.config';
import airQualityRoutes from './routes/airQuality.routes';

const app: Express = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/air-quality', airQualityRoutes);

export function startServer(): void {
  app.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`);
  });
}

export default app;