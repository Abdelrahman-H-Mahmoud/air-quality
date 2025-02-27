import axios from 'axios';
import { config } from './env.config';

export const iqairAxios = axios.create({
  baseURL: 'http://api.airvisual.com/v2',
  params: {
    key: config.iqair.apiKey
  }
});

// Add response interceptor for error handling
iqairAxios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      throw new Error(`IQAir API Error: ${error.response.data?.message || error.message}`);
    }
    throw error;
  }
); 