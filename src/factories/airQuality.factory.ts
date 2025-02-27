import { AirQualityController } from '../controllers/airQuality.controller';
import { IQAirService } from '../services/iqair.service';

export function createAirQualityController(): AirQualityController {
  const iqairService = new IQAirService();
  return new AirQualityController(iqairService);
} 