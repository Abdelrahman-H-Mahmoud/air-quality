import { Request, Response, NextFunction } from 'express';

export class AirQualityValidation {
  static validateCoordinates = (req: Request, res: Response, next: NextFunction) => {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lon as string);

    if (isNaN(latitude) || isNaN(longitude)) {
      return res.status(400).json({ error: 'Latitude and longitude must be valid numbers' });
    }

    if (latitude < -90 || latitude > 90) {
      return res.status(400).json({ error: 'Latitude must be between -90 and 90 degrees' });
    }

    if (longitude < -180 || longitude > 180) {
      return res.status(400).json({ error: 'Longitude must be between -180 and 180 degrees' });
    }

    next();
  };

  static validateHistoricalParams = (req: Request, res: Response, next: NextFunction) => {
    const { limit } = req.query;

    if (limit) {
      const parsedLimit = parseInt(limit as string, 10);
      if (isNaN(parsedLimit) || parsedLimit < 1) {
        return res.status(400).json({ error: 'Limit must be a positive number' });
      }
      if (parsedLimit > 100) {
        return res.status(400).json({ error: 'Limit cannot exceed 100' });
      }
      req.validatedQuery = {
        ...req.validatedQuery,
        limit: parsedLimit
      };
    }

    next();
  };
} 