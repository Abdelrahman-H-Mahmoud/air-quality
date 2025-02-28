import cron from 'node-cron';
import { Worker } from 'worker_threads';
import path from 'path';

export function startAirQualityScheduler() {
  // Run every minute
  cron.schedule('* * * * *', () => {
    const workerPath = path.resolve(__dirname, '../workers');
    const worker = new Worker(
      require.resolve(workerPath)
    );

    worker.on('message', (message) => {
      console.log(`Worker message: ${message}`);
    });

    worker.on('error', (error) => {
      console.error('Worker error:', error);
    });

    worker.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Worker stopped with exit code ${code}`);
      }
    });
  });

  console.log('Air quality scheduler started');
} 