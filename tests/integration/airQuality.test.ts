import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import request from 'supertest';
import app from '../../src';
import { AirQualityModel } from '../../src/models/airQuality.model';
import { iqairAxios } from '../../src/config/axios';
import { 
  mockAirQualityResponse, 
  mockAirQualityDocument,
  testCoordinates 
} from '../fixtures/airQuality.fixtures';

jest.mock('../../src/config/axios');

describe.only('Air Quality API Integration Tests', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    await AirQualityModel.deleteMany({});
    jest.clearAllMocks();
  });

  describe('GET /api/air-quality', () => {
    it('should return air quality data for valid coordinates', async () => {
      (iqairAxios.get as jest.Mock).mockResolvedValueOnce(mockAirQualityResponse);

      const response = await request(app)
        .get('/api/air-quality')
        .query(testCoordinates);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('result.pollution');
      expect(response.body.result.pollution.aqius).toBe(50);
    });

    it('should return 400 for invalid coordinates', async () => {
      const response = await request(app)
        .get('/api/air-quality')
        .query({ lat: '91', lon: '2.352222' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/air-quality/most-polluted', () => {
    it('should return most polluted datetime for a city', async () => {
      await AirQualityModel.create(mockAirQualityDocument);

      const response = await request(app)
        .get('/api/air-quality/most-polluted')
        .query({ city: 'Paris' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('datetime');
      expect(response.body).toHaveProperty('pollution');
      expect(response.body.pollution).toBe(75);
    });

    it('should return 404 for non-existent city', async () => {
      const response = await request(app)
        .get('/api/air-quality/most-polluted')
        .query({ city: 'NonExistentCity' });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
}); 