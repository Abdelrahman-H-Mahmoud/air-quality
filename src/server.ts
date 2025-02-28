import express, { Express } from 'express';
import { config } from './config/env.config';
import airQualityRoutes from './routes/airQuality.routes';
import swaggerUi from 'swagger-ui-express';
import { specs } from './config/swagger.config';

const app: Express = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/air-quality', airQualityRoutes);

if (config.nodeEnv !== 'production') { 
  // Swagger docs
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

export function startServer(): void {
  app.listen(config.server.port, () => {
    console.log(`Server is running on port ${config.server.port}`);
  });
}

export default app;