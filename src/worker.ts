import { startAirQualityScheduler } from './schedulers/airQuality.scheduler';

console.log('Starting Air Quality Worker...');
startAirQualityScheduler();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Worker shutting down...');
  process.exit();
}); 