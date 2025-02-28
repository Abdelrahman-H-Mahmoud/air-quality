import { Request, Response } from 'express';
import { AirQualityController } from '../../src/controllers/airQuality.controller';
import { IQAirService } from '../../src/services/iqair.service';
import { AirQualityData, IQAirResponse } from '../../src/types/iqair.types';

jest.mock('../../src/services/iqair.service');

describe('AirQualityController', () => {
  let controller: AirQualityController;
  let mockIQAirService: jest.Mocked<IQAirService>;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockIQAirService = {
      getNearestCity: jest.fn(),
      getCityAirQuality: jest.fn(),
      getMostPollutedDateTime: jest.fn()
    } as any;

    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    mockResponse = {
      json: mockJson,
      status: mockStatus
    };

    controller = new AirQualityController(mockIQAirService);
  });

  describe('getNearestCityAirQuality', () => {
    it('should return air quality data for valid coordinates', async () => {
      const mockAirQualityData = {
        data: {
          current: {
            pollution: {
              ts: '2024-03-11T12:00:00.000Z',
              aqius: 50
            }
          }
        }
      };

      mockRequest = {
        query: { lat: '48.856613', lon: '2.352222' }
      };

      mockIQAirService.getNearestCity.mockResolvedValueOnce(mockAirQualityData as IQAirResponse);

      await controller.getNearestCityAirQuality(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockJson).toHaveBeenCalledWith({
        result: {
          pollution: mockAirQualityData.data.current.pollution
        }
      });
    });
  });

  describe('getMostPollutedDateTime', () => {
    it('should return most polluted datetime for a city', async () => {
      const mockPollutionData = {
        current: {
          pollution: {
            ts: '2024-03-11T12:00:00.000Z',
            aqius: 75
          }
        }
      };

      mockRequest = {
        query: { city: 'Paris' }
      };

      mockIQAirService.getMostPollutedDateTime.mockResolvedValueOnce(mockPollutionData as AirQualityData);

      await controller.getMostPollutedDateTime(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(mockJson).toHaveBeenCalledWith({
        datetime: mockPollutionData.current.pollution.ts,
        pollution: mockPollutionData.current.pollution.aqius
      });
    });
  });
});