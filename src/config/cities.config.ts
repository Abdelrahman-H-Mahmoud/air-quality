export interface Coordinates {
    lat: number;
    lon: number;
  }
  
export const CITY_COORDINATES: Record<string, Coordinates> = {
  'Paris': { lat: 48.856613, lon: 2.352222 },
  'London': { lat: 51.507351, lon: -0.127758 },
  // Add more cities as needed
};