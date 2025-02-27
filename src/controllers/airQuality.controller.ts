import { Request, Response } from 'express';
import { IQAirService } from '../services/iqair.service';
import { NearestCityResponse } from '../types/iqair.types';

export class AirQualityController {
  constructor(
    private readonly iqairService: IQAirService
  ) {}

  getNearestCityAirQuality = async (req: Request, res: Response)=> {
    try {
      const { lat, lon } = req.query;

      const latitude = +(lat as string);
      const longitude = +(lon as string);

      const airQualityData = await this.iqairService.getNearestCity(latitude, longitude);

      const mappedData: NearestCityResponse = {
        result: {
          pollution: airQualityData.data.current.pollution
        }
      };

     return res.json(mappedData);
    } catch (error) {
      console.error('Error fetching air quality:', error);
      res.status(500).json({ error: 'Failed to fetch air quality data' });
    }
  };

  getMostPollutedDateTime = async (req: Request, res: Response) => {
    try {
      const { city } = req.query;
      const mostPolluted = await this.iqairService.getMostPollutedDateTime(city as string);
      if(!mostPolluted) {
        return res.status(404).json({ error: 'No data found for Paris' });
      }
      return res.json({
        datetime: mostPolluted.current.pollution.ts,
        pollution: mostPolluted.current.pollution.aqius
      });
    } catch (error) {
      console.error('Error fetching most polluted datetime:', error);
      return res.status(500).json({ error: 'Failed to fetch pollution data' });
    }
  };
} 
