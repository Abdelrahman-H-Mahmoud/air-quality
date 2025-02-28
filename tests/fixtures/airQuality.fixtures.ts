export const mockAirQualityResponse = {
  data: {
    status: 'success',
    data: {
      city: 'Paris',
      state: 'Ile-de-France',
      country: 'France',
      location: {
        type: 'Point',
        coordinates: [2.352222, 48.856613]
      },
      current: {
        pollution: {
          ts: '2024-03-11T12:00:00.000Z',
          aqius: 50
        }
      }
    }
  }
};

export const mockAirQualityDocument = {
  city: 'Paris',
  state: 'Ile-de-France',
  country: 'France',
  location: {
    type: 'Point',
    coordinates: [2.352222, 48.856613]
  },
  current: {
    pollution: {
      ts: '2024-03-11T12:00:00.000Z',
      aqius: 75
    }
  }
};

export const testCoordinates = {
  lat: '48.856613',
  lon: '2.352222'
}; 