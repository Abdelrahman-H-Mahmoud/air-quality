export interface Pollution {
  ts: string;
  aqius: number;
  mainus: string;
  aqicn: number;
  maincn: string;
}
export interface Weather { 
  ts: string;
  tp: number;
  pr: number;
  hu: number;
  ws: number;
  wd: number;
  ic: string;
}
export interface AirQualityData {
  city: string;
  state: string;
  country: string;
  location: {
    type: string;
    coordinates: number[];
  };
  current: {
    pollution: Pollution
    weather: Weather
  };
};
export interface IQAirResponse {
  status: string;
  data: AirQualityData
}
export interface NearestCityResponse {
  result:{
    pollution: Pollution;
  }
} 