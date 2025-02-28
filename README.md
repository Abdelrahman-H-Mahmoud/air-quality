# Air Quality API

A RESTful API for monitoring air quality in different cities.

## Features

- Get current air quality by coordinates
- Track most polluted datetime for cities
- Automated data collection worker
- MongoDB integration
- Swagger API documentation

## Prerequisites

- Node.js (v14+)
- MongoDB
- IQAir API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with:
```env
PORT=3000
NODE_ENV=development
IQAIR_API_KEY=your_api_key
DATABASE_URL=your_mongodb_url
WORKER_INTERVAL="*/1 * * * *"
```

## Running the Application

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm run build
npm start
```

## API Documentation

Access Swagger documentation at: `http://localhost:3000/api-docs`

### Endpoints

- GET `/api/air-quality`
  - Get current air quality by coordinates
  - Query params: `lat`, `lon`

- GET `/api/air-quality/most-polluted`
  - Get most polluted datetime for a city
  - Query params: `city`

## Testing

Run tests:
```bash
npm test
```

Run tests with coverage:
```bash
npm run test:coverage
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── middlewares/    # Express middlewares
├── models/         # Database models
├── routes/         # Route definitions
├── services/      # Business logic
├── workers/       # Background workers
└── index.ts       # Application entry point
```

## License

ISC