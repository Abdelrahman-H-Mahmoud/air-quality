export const airQualityDocs = {
  '/api/air-quality': {
    get: {
      summary: 'Get current air quality for coordinates',
      tags: ['Air Quality'],
      parameters: [
        {
          in: 'query',
          name: 'lat',
          required: true,
          schema: { type: 'string' },
          description: 'Latitude coordinate',
          example: '48.856613'
        },
        {
          in: 'query',
          name: 'lon',
          required: true,
          schema: { type: 'string' },
          description: 'Longitude coordinate',
          example: '2.352222'
        }
      ],
      responses: {
        200: {
          description: 'Air quality data',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  result: {
                    type: 'object',
                    properties: {
                      pollution: {
                        type: 'object',
                        properties: {
                          ts: { 
                            type: 'string', 
                            example: '2025-02-28T11:00:00.000Z',
                            description: 'Timestamp of measurement'
                          },
                          aqius: { 
                            type: 'number', 
                            example: 54,
                            description: 'AQI value (US)'
                          },
                          mainus: { 
                            type: 'string', 
                            example: 'p2',
                            description: 'Main pollutant (US)'
                          },
                          aqicn: { 
                            type: 'number', 
                            example: 20,
                            description: 'AQI value (China)'
                          },
                          maincn: { 
                            type: 'string', 
                            example: 'p1',
                            description: 'Main pollutant (China)'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: 'Invalid coordinates',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { 
                    type: 'string',
                    example: 'Latitude must be between -90 and 90 degrees'
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  '/api/air-quality/most-polluted': {
    get: {
      summary: 'Get most polluted datetime for a city',
      tags: ['Air Quality'],
      parameters: [
        {
          in: 'query',
          name: 'city',
          required: true,
          schema: { type: 'string' },
          description: 'City name',
          example: 'Paris'
        }
      ],
      responses: {
        200: {
          description: 'Most polluted datetime',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  datetime: { 
                    type: 'string', 
                    example: '2025-02-28T11:00:00.000Z',
                    description: 'Timestamp of highest pollution'
                  },
                  pollution: { 
                    type: 'number', 
                    example: 56,
                    description: 'Highest AQI value recorded'
                  }
                }
              }
            }
          }
        },
        404: {
          description: 'City not found',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  error: { 
                    type: 'string',
                    example: 'No data found for city: NonExistentCity'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}; 