import mongoose, { Schema, Document } from 'mongoose';

interface Location {
  type: string;
  coordinates: number[];
}

interface Weather {
  ts: string;
  tp: number;
  pr: number;
  hu: number;
  ws: number;
  wd: number;
  ic: string;
}

interface Pollution {
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}

interface Current {
  pollution: Pollution;
  weather: Weather;
}

export interface IAirQualityData extends Document {
  city: string;
  state: string;
  country: string;
  location: Location;
  current: Current;
  timestamp: Date;
}

const AirQualitySchema = new Schema<IAirQualityData>({
  city: { type: String, required: true },
  state: { type: String, required: true },
  country: { type: String, required: true },
  location: {
    type: { type: String, required: true },
    coordinates: [Number]
  },
  current: {
    pollution: {
      ts: String,
      aqius: Number,
      mainus: String,
      aqicn: Number,
      maincn: String
    },
    weather: {
      ts: String,
      tp: Number,
      pr: Number,
      hu: Number,
      ws: Number,
      wd: Number,
      ic: String
    }
  },
  timestamp: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Add indexes
AirQualitySchema.index({ city: 1, state: 1, country: 1 });
AirQualitySchema.index({ timestamp: -1 });

export const AirQualityModel = mongoose.model<IAirQualityData>('AirQuality', AirQualitySchema); 