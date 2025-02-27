# Air Quality Monitoring API

A Node.js application that monitors and tracks air quality data for cities using the IQAir API. Built with Express, MongoDB, and Docker.

## Features

- Real-time air quality data fetching from IQAir API
- Background worker process for automated data collection
- MongoDB for data persistence
- Docker containerization for easy deployment
- RESTful API endpoints

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- IQAir API Key (get from [IQAir API](https://www.iqair.com/air-pollution-data-api))

## Quick Start

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd air-quality-api
   ```

2. Create `.env` file:
   ```env
   # Application Configuration
   PORT=3000
   NODE_ENV=development

   # API Keys
   IQAIR_API_KEY="your-iqair-api-key"

   # Database Configuration
   MONGO_USERNAME=admin
   MONGO_PASSWORD=password
   MONGO_PORT=27017
   DATABASE_URL="mongodb://admin:password@mongodb:27017/air-quality?authSource=admin"

   # Worker Configuration
   WORKER_INTERVAL="*/1 * * * *"  # Every minute
   ```

3. Start the application:
   ```bash
   # Build and start containers
   docker-compose up -d

   # View logs
   docker-compose logs -f
   ```

## Project Structure

```
.
├── docker-compose.yml      # Docker services configuration
├── Dockerfile.dev         # Development Docker configuration
├── src/
│   ├── config/
│   │   ├── axios.ts           # Axios client configuration
│   │   ├── cities.config.ts   # City coordinates configuration
│   │   └── env.config.ts      # Environment configuration
│   ├── controllers/
│   │   └── airQuality.controller.ts
│   ├── models/
│   │   └── airQuality.model.ts
│   ├── routes/
│   │   └── airQuality.routes.ts
│   ├── schedulers/
│   │   └── airQuality.scheduler.ts
│   ├── services/
│   │   └── iqair.service.ts
│   ├── types/
│   │   └── iqair.types.ts
│   └── workers/
│       └── airQuality.worker.ts
```

## API Endpoints

### Get Nearest City Air Quality
```http
GET /api/air-quality/nearest?lat={latitude}&lon={longitude}
```

Parameters:
- `lat`: Latitude (required)
- `lon`: Longitude (required)

Response:
```json
{
  "result": {
    "pollution": {
      "ts": "2024-03-11T12:00:00.000Z",
      "aqius": 50,
      "mainus": "p2",
      "aqicn": 17,
      "maincn": "p2"
    }
  }
}
```

### Get Most Polluted DateTime
```http
GET /api/air-quality/most-polluted?city={cityName}
```

Parameters:
- `city`: City name (required)

Response:
```json
{
  "datetime": "2024-03-11T12:00:00.000Z",
  "pollution": 75
}
```

## Docker Services

The application runs in three containers:

1. **API Server (air-quality-api)**:
   - Express application
   - Handles API requests
   - Development hot-reload enabled

2. **Worker (air-quality-worker)**:
   - Background process
   - Fetches air quality data periodically
   - Stores data in MongoDB

3. **MongoDB (air-quality-mongodb)**:
   - Database server
   - Persistent data storage
   - Authentication enabled

## Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run only the server
npm run dev:server

# Run only the worker
npm run dev:worker
```

## Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f app
docker-compose logs -f worker

# Stop all services
docker-compose down

# Rebuild containers
docker-compose up -d --build

# Remove volumes
docker-compose down -v
```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| PORT | Application port | Yes | 3000 |
| NODE_ENV | Environment mode | No | development |
| IQAIR_API_KEY | IQAir API key | Yes | - |
| MONGO_USERNAME | MongoDB username | Yes | admin |
| MONGO_PASSWORD | MongoDB password | Yes | password |
| MONGO_PORT | MongoDB port | No | 27017 |
| DATABASE_URL | MongoDB connection string | Yes | - |
| WORKER_INTERVAL | Cron schedule for worker | No | "*/1 * * * *" |

## Adding New Cities

To add a new city for monitoring, update `src/config/cities.config.ts`:

```typescript
export const CITY_COORDINATES: Record<string, Coordinates> = {
  'Paris': { lat: 48.856613, lon: 2.352222 },
  // Add new cities here
};
```

## Troubleshooting

1. If containers keep restarting:
   - Check MongoDB connection
   - Verify environment variables
   - View container logs

2. If data isn't being collected:
   - Check worker logs
   - Verify IQAir API key
   - Check MongoDB connection

## License

ISC
```

The README is now properly formatted with:
1. Correct markdown syntax
2. Proper code block language highlighting
3. Consistent spacing and indentation
4. Clear section hierarchy
5. Better readability for code examples and commands
