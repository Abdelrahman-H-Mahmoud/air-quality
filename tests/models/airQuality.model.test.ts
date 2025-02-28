import mongoose from 'mongoose';
import { AirQualityModel } from '../../src/models/airQuality.model';

describe('Air Quality Model', () => {
  it('should be a valid mongoose model', () => {
    expect(mongoose.models).toHaveProperty('AirQuality');
  });

  it('should have required fields', () => {
    const schema = AirQualityModel.schema.obj;

    expect(schema).toHaveProperty('city');
    expect(schema).toHaveProperty('state');
    expect(schema).toHaveProperty('country');
    expect(schema).toHaveProperty('location');
    expect(schema).toHaveProperty('current');
  });

  it('should validate a valid document', async () => {
    const validDoc = new AirQualityModel({
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
          aqius: 50,
          mainus: 'p2',
          aqicn: 17,
          maincn: 'p2'
        }
      }
    });

    const err = validDoc.validateSync();
    expect(err).toBeUndefined();
  });
}); 