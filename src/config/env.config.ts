import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

interface Config {
  database: {
    url: string;
  };
  iqair: {
    apiKey: string;
  };
  server: {
    port: number;
  };
}

export const config: Config = {
  database: {
    url: process.env.DATABASE_URL || '',
  },
  iqair: {
    apiKey: process.env.IQAIR_API_KEY || '',
  },
  server: {
    port: parseInt(process.env.PORT || '3000', 10),
  },
};

// Validate required environment variables
const requiredEnvVars = [
  { key: 'DATABASE_URL', value: config.database.url },
  { key: 'IQAIR_API_KEY', value: config.iqair.apiKey },
];

for (const { key, value } of requiredEnvVars) {
  if (!value) {
    throw new Error(`${key} is not defined in environment variables`);
  }
} 