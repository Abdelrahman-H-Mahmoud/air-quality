import { Router } from 'express';
import { createAirQualityController } from '../factories/airQuality.factory';
import { AirQualityValidation } from '../middlewares/airQuality.middleware';

const router = Router();
const airQualityController = createAirQualityController();

// Air Quality Routes
router.get(
  '/',
  AirQualityValidation.validateCoordinates,
  airQualityController.getNearestCityAirQuality
);

router.get(
  '/most-polluted',
  airQualityController.getMostPollutedDateTime
);

export default router; 