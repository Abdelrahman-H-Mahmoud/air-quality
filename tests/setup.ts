import { config } from '../src/config/env.config';

// Ensure we're using test environment
process.env.NODE_ENV = 'test';

// Mock environment variables for testing
process.env.PORT = '3000';
process.env.IQAIR_API_KEY = 'test-api-key';
process.env.DATABASE_URL = 'mongodb://test:test@localhost:27017/test'; 