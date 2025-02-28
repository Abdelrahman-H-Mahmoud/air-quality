import swaggerJsdoc from 'swagger-jsdoc';
import { airQualityDocs } from '../docs/airQuality.docs';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Air Quality API',
      version: '1.0.0',
      description: 'API for monitoring air quality in different cities'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    paths: {
      ...airQualityDocs
    }
  },
  apis: []
};

export const specs = swaggerJsdoc(options); 