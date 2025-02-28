import { validateCoordinates } from '../../src/utils/validation';

describe('Validation Utils', () => {
  describe('validateCoordinates', () => {
    it('should return invalid when coordinates are missing', () => {
      expect(validateCoordinates(undefined, undefined)).toEqual({
        isValid: false,
        message: 'Latitude and longitude are required'
      });
    });

    it('should return invalid for non-numeric values', () => {
      expect(validateCoordinates('abc', '123')).toEqual({
        isValid: false,
        message: 'Latitude and longitude must be valid numbers'
      });
    });

    it('should return invalid for out-of-range latitude', () => {
      expect(validateCoordinates('91', '100')).toEqual({
        isValid: false,
        message: 'Latitude must be between -90 and 90 degrees'
      });
    });

    it('should return invalid for out-of-range longitude', () => {
      expect(validateCoordinates('45', '181')).toEqual({
        isValid: false,
        message: 'Longitude must be between -180 and 180 degrees'
      });
    });

    it('should return valid for correct coordinates', () => {
      expect(validateCoordinates('48.856613', '2.352222')).toEqual({
        isValid: true
      });
    });
  });
}); 