export const API_CONFIG = {
  BASE_URL: 'http://localhost:5257',
  ENDPOINTS: {
    TEST: '/api/hello',
    WEATHER: '/api/v1/Weather', // Changed: Now reads from database
    FETCH_FRESH_WEATHER: '/api/v1/Weather/openmeteo', // Added: For fetching fresh data
    SAVE_WEATHER: '/api/v1/Weather',
  },
} as const;
