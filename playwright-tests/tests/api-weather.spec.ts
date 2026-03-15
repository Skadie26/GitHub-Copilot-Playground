/// <reference types="node" />
import { test, expect } from '@playwright/test';
import { z } from 'zod';

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------
const DEFAULT_BACKEND_URL = 'http://localhost:5257';
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || DEFAULT_BACKEND_URL;

// ---------------------------------------------------------------------------
// Schemas (camelCase based on ASP.NET default System.Text.Json policy)
// ---------------------------------------------------------------------------
const WeatherDtoSchema = z.object({
  cityName: z.string().min(1).optional(),
  temperature: z.number().or(z.string().transform(Number)),
  weatherDescription: z.string().optional().nullable(),
  date: z.string().optional().nullable()
}).passthrough();

const WeatherArraySchema = z.array(WeatherDtoSchema);

// ---------------------------------------------------------------------------
// Backend readiness helper (retry to avoid flakiness on cold start)
// ---------------------------------------------------------------------------
async function waitForBackend(request: any, attempts = 10, intervalMs = 500) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await request.get(`${BACKEND_BASE_URL}/api/hello`, { timeout: 3000 });
      if (res.ok()) return true;
    } catch { /* ignore */ }
    await new Promise(r => setTimeout(r, intervalMs));
  }
  return false;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
test.describe('Weather API', () => {
  test.beforeAll(async ({ request }) => {
    const ready = await waitForBackend(request);
    if (!ready) {
      test.skip(true, `Backend not reachable at ${BACKEND_BASE_URL}. Start API or set BACKEND_BASE_URL.`);
    }
  });

  test('GET /api/hello returns hello world message', async ({ request }) => {
    const res = await request.get(`${BACKEND_BASE_URL}/api/hello`);
    expect(res.status(), 'Expected 200 from /api/hello').toBe(200);
    const json = await res.json();
    expect(json).toEqual({ message: 'Hello World!' });
  });

  test('GET /api/v1/Weather returns array (may be empty initially)', async ({ request }) => {
    const res = await request.get(`${BACKEND_BASE_URL}/api/v1/Weather`);
    expect(res.status()).toBe(200);
    const json = await res.json();
    if (!Array.isArray(json)) {
      throw new Error(`Expected array for weather list, got: ${JSON.stringify(json).slice(0,200)}`);
    }
    WeatherArraySchema.parse(json);
  });

  test('POST /api/v1/Weather can add a record', async ({ request }) => {
    const payload = {
      cityName: 'Test City',
      temperature: 20,
      weatherDescription: 'Sunny',
      date: new Date().toISOString()
    };
    const res = await request.post(`${BACKEND_BASE_URL}/api/v1/Weather`, { data: payload });
    expect(res.status(), 'Expected 201 Created when posting weather').toBe(201);
    const body: any = await res.json();
    expect(body.cityName).toBe(payload.cityName);
  });
});
