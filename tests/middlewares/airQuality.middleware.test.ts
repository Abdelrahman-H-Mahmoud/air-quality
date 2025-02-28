import { Request, Response, NextFunction } from 'express';
import { AirQualityValidation } from '../../src/middlewares/airQuality.middleware';
import { validationTestCases, testCoordinates } from '../fixtures/validation.fixtures';

describe('AirQuality Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;

  beforeEach(() => {
    mockRequest = { query: {} };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    nextFunction = jest.fn();
  });

  describe('validateCoordinates', () => {
    it('should call next() for valid coordinates', () => {
      mockRequest.query = testCoordinates;

      AirQualityValidation.validateCoordinates(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
    });

    test.each(validationTestCases)(
      'should return 400 for $scenario',
      ({ query, expectedError }) => {
        mockRequest.query = query;
        
        AirQualityValidation.validateCoordinates(
          mockRequest as Request,
          mockResponse as Response,
          nextFunction
        );

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: expectedError });
        expect(nextFunction).not.toHaveBeenCalled();
      }
    );
  });
}); 