import { Request, Response, NextFunction } from 'express';
import { AirQualityValidation } from '../../src/middlewares/airQuality.middleware';

describe('AirQuality Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = {
      query: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  describe('validateCoordinates', () => {
    it('should call next() for valid coordinates', () => {
      mockRequest.query = { lat: '48.856613', lon: '2.352222' };

      AirQualityValidation.validateCoordinates(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    test.each([
      {
        scenario: 'missing coordinates',
        query: {},
        expectedError: 'Latitude and longitude are required'
      },
      {
        scenario: 'invalid latitude',
        query: { lat: '91', lon: '2.352222' },
        expectedError: 'Latitude must be between -90 and 90 degrees'
      },
      {
        scenario: 'invalid longitude',
        query: { lat: '48.856613', lon: '181' },
        expectedError: 'Longitude must be between -180 and 180 degrees'
      },
      {
        scenario: 'non-numeric values',
        query: { lat: 'abc', lon: 'def' },
        expectedError: 'Latitude and longitude must be valid numbers'
      }
    ])('should return 400 for $scenario', ({ query, expectedError }) => {
      mockRequest.query = query;
      AirQualityValidation.validateCoordinates(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: expectedError });
      expect(nextFunction).not.toHaveBeenCalled();
    });
  });
}); 