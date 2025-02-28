import { IQAirService } from '../../src/services/iqair.service';
import { AirQualityModel } from '../../src/models/airQuality.model';
import { iqairAxios } from '../../src/config/axios';

jest.mock('../../src/config/axios');
jest.mock('../../src/models/airQuality.model');

describe('IQAirService', () => {
  let service: IQAirService;

  beforeEach(() => {
    service = new IQAirService();
    jest.clearAllMocks();
  });

  describe('getNearestCity', () => {
    it('should fetch air quality data for given coordinates', async () => {
      const mockResponse = {
        data: {
          status: 'success',
          data: {
            city: 'Paris',
            state: 'Ile-de-France',
            country: 'France',
            location: { type: 'Point', coordinates: [2.352222, 48.856613] },
            current: {
              pollution: {
                ts: '2024-03-11T12:00:00.000Z',
                aqius: 50,
                mainus: 'p2',
                aqicn: 17,
                maincn: 'p2'
              }
            }
          }
        }
      };

      (iqairAxios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await service.getNearestCity(48.856613, 2.352222);
      expect(result).toEqual(mockResponse.data);
      expect(iqairAxios.get).toHaveBeenCalledWith('/nearest_city', {
        params: { lat: 48.856613, lon: 2.352222 }
      });
    });


    it('should handle network errors', async () => {
      const networkError = new Error('Network Error');
      (iqairAxios.get as jest.Mock).mockRejectedValueOnce(networkError);

      await expect(service.getNearestCity(48.856613, 2.352222))
        .rejects.toThrow('Network Error');
    });

    it('should handle rate limiting', async () => {
      const rateLimitError = new Error('Too Many Requests');

      (iqairAxios.get as jest.Mock).mockRejectedValueOnce(rateLimitError);

      await expect(service.getNearestCity(48.856613, 2.352222))
        .rejects.toThrow('Too Many Requests');
    });
  });

  describe('getMostPollutedDateTime', () => {
    it('should return most polluted data for given city', async () => {
      const mockData = {
        city: 'Paris',
        state: 'Ile-de-France',
        country: 'France',
        current: {
          pollution: {
            ts: '2024-03-11T12:00:00.000Z',
            aqius: 75
          }
        }
      };

      (AirQualityModel.findOne as jest.Mock).mockReturnValueOnce({
        sort: () => ({
          lean: () => mockData
        })
      });

      const result = await service.getMostPollutedDateTime('Paris');
      expect(result).toEqual(mockData);
    });
  });

  describe('getCityAirQuality', () => {
    it('should fetch air quality data for valid city', async () => {
      const mockResponse = {
        data: {
          status: 'success',
          data: {
            city: 'Paris',
            current: {
              pollution: {
                ts: '2024-03-11T12:00:00.000Z',
                aqius: 50
              }
            }
          }
        }
      };

      (iqairAxios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      const result = await service.getCityAirQuality('Paris');
      expect(result).toEqual(mockResponse.data);
    });

    it('should throw error for invalid city', async () => {
      await expect(service.getCityAirQuality('InvalidCity'))
        .rejects.toThrow('Coordinates not found for city: InvalidCity');
      
      expect(iqairAxios.get).not.toHaveBeenCalled();
    });

    it('should throw error for undefined city', async () => {
      await expect(service.getCityAirQuality(undefined as any))
        .rejects.toThrow('Coordinates not found for city: undefined');
      
      expect(iqairAxios.get).not.toHaveBeenCalled();
    });
  });
}); 