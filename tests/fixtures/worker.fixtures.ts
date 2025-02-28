export const mockWorkerResponse = {
  status: 'success',
  data: {
    city: 'Paris',
    state: 'Ile-de-France',
    country: 'France',
    location: { type: 'Point', coordinates: [2.352222, 48.856613] },
    current: {
      pollution: {
        ts: '2024-03-11T12:00:00.000Z',
        aqius: 50
      }
    }
  }
};