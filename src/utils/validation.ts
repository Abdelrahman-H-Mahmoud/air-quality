interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function validateCoordinates(lat: string | undefined, lon: string | undefined): ValidationResult {
  if (!lat || !lon) {
    return {
      isValid: false,
      message: 'Latitude and longitude are required'
    };
  }

  const latitude = parseFloat(lat);
  const longitude = parseFloat(lon);

  if (isNaN(latitude) || isNaN(longitude)) {
    return {
      isValid: false,
      message: 'Latitude and longitude must be valid numbers'
    };
  }

  if (latitude < -90 || latitude > 90) {
    return {
      isValid: false,
      message: 'Latitude must be between -90 and 90 degrees'
    };
  }

  if (longitude < -180 || longitude > 180) {
    return {
      isValid: false,
      message: 'Longitude must be between -180 and 180 degrees'
    };
  }

  return { isValid: true };
} 