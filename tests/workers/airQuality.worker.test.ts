import mongoose from 'mongoose';
import { IQAirService } from '../../src/services/iqair.service';
import { AirQualityModel } from '../../src/models/airQuality.model';
import { fetchAndSaveAirQuality } from '../../src/workers/airQuality.worker';
import { mockWorkerResponse } from '../fixtures/worker.fixtures';
jest.mock('mongoose');
jest.mock('../../src/services/iqair.service');
jest.mock('../../src/models/airQuality.model', () => ({
  AirQualityModel: {
    create: jest.fn().mockResolvedValue({})
  }
}));
jest.mock('../../src/config/cities.config', () => ({
  CITY_COORDINATES: {
    'Paris': { lat: 48.856613, lon: 2.352222 }
  }
}));
jest.mock('../../src/config/env.config', () => ({
  config: {
    port: 3000,
    nodeEnv: 'test',
    database: {
      url: 'mongodb://test:test@localhost:27017/test'
    },
    iqair: {
      apiKey: 'test-api-key'
    },
    worker: {
      interval: '*/1 * * * *'
    }
  }
}));

describe('Air Quality Worker', () => {
  let mockIQAirService: { getCityAirQuality: jest.Mock };
  
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    
    (mongoose.connect as jest.Mock).mockResolvedValue(undefined);
    (mongoose.disconnect as jest.Mock).mockResolvedValue(undefined);

    mockIQAirService = {
      getCityAirQuality: jest.fn().mockResolvedValue(mockWorkerResponse)
    };

    (IQAirService as jest.Mock).mockImplementation(() => mockIQAirService);
  });

  it('should connect to database and fetch air quality data', async () => {
    await fetchAndSaveAirQuality();

    expect(mongoose.connect).toHaveBeenCalledWith('mongodb://test:test@localhost:27017/test');
    expect(mockIQAirService.getCityAirQuality).toHaveBeenCalledWith('Paris');
    expect(AirQualityModel.create).toHaveBeenCalled();
    expect(mongoose.disconnect).toHaveBeenCalled();
  });
}); 