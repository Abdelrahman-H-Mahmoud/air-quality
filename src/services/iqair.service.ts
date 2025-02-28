import { AirQualityData, IQAirResponse } from '../types/iqair.types';
import { iqairAxios } from '../config/axios';
import { AirQualityModel } from '../models/airQuality.model';
import { CITY_COORDINATES } from '../config/cities.config';


export class IQAirService {
  async getNearestCity(lat: number, lon: number): Promise<IQAirResponse> {
    try {
      const response = await iqairAxios.get('/nearest_city', {
        params: {
          lat,
          lon
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getCityAirQuality(city: string): Promise<IQAirResponse> {
    const coordinates = CITY_COORDINATES[city];
    if (!coordinates) {
      throw new Error(`Coordinates not found for city: ${city}`);
    }
    return this.getNearestCity(coordinates.lat, coordinates.lon);
  }
  
  async getMostPollutedDateTime(city: string): Promise<AirQualityData | null> {
    const mostPolluted = await AirQualityModel
      .findOne({ city })
      .sort({ 'current.pollution.aqius': -1 })
      .lean();

    if (!mostPolluted) {
      return null;
    }

    return mostPolluted as AirQualityData;
  }
} 