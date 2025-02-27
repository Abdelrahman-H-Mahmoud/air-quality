import mongoose from 'mongoose';
import { config } from '../config/env.config';
import { IQAirService } from '../services/iqair.service';
import { AirQualityModel } from '../models/airQuality.model';

const MONITORED_CITY = 'Paris'; // Can be made configurable through env variables

async function fetchAndSaveAirQuality() {
  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(config.database.url);
    }

    const iqairService = new IQAirService();
    const airQualityData = await iqairService.getCityAirQuality(MONITORED_CITY);

    await AirQualityModel.create({
      city: airQualityData.data.city,
      state: airQualityData.data.state,
      country: airQualityData.data.country,
      location: airQualityData.data.location,
      current: airQualityData.data.current
    });

    console.log(`Air quality data saved successfully for ${MONITORED_CITY}`);
  } catch (error) {
    console.error('Error in worker:', error);
  } finally {
    await mongoose.disconnect();
  }
}

fetchAndSaveAirQuality();