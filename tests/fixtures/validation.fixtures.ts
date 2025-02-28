export const testCoordinates = {
  lat: '48.856613',
  lon: '2.352222'
};

export const validationTestCases = [
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
]; 