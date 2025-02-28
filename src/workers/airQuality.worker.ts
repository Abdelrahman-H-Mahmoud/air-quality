import mongoose from 'mongoose';
import { IQAirService } from '../services/iqair.service';
import { AirQualityModel } from '../models/airQuality.model';
import { config } from '../config/env.config';
import { CITY_COORDINATES } from '../config/cities.config';

export async function fetchAndSaveAirQuality() {
  try {
    console.log('Worker started');
    await mongoose.connect(config.database.url);
    const iqairService = new IQAirService();

    for (const [city, coordinates] of Object.entries(CITY_COORDINATES)) {
      const airQualityData = await iqairService.getCityAirQuality(city);
      await AirQualityModel.create(airQualityData.data);
    }
  } catch (error) {
    console.error('Error in worker:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Worker finished');
  }
}