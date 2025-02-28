import { Request, Response, NextFunction } from 'express';
import { validateCoordinates } from '../utils/validation';

export class AirQualityValidation {
  static validateCoordinates = (req: Request, res: Response, next: NextFunction) => {
    const { lat, lon } = req.query;
    const validationResult = validateCoordinates(lat as string, lon as string);

    if (!validationResult.isValid) {
      return res.status(400).json({ error: validationResult.message });
    }

    next();
  };
} 