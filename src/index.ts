import { connectDB, disconnectDB } from './config/database';
import app, { startServer } from './server';

async function bootstrap() {
  await connectDB();
  startServer();

  process.on('SIGINT', async () => {
    await disconnectDB();
    process.exit();
  });
}

if (require.main === module) {
  bootstrap();
}

export default app;