import { defineConfig, devices } from "@playwright/test";

// Base URLs - override via environment variables if needed
const FRONTEND_BASE_URL =
  process.env.FRONTEND_BASE_URL || "http://localhost:4200";
const BACKEND_BASE_URL =
  process.env.BACKEND_BASE_URL || "http://localhost:5257"; // default Kestrel port assumption

export default defineConfig({
  testDir: "./tests",
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI
    ? [["html", { outputFolder: "playwright-report" }], ["list"]]
    : "html",
  // Spin up dev servers automatically (Angular + Backend) unless we detect they're already running.
  // Adjust commands/ports if your actual startup commands differ.
  webServer: [
    {
      command: process.env.SKIP_FRONTEND_START
        ? 'echo "Frontend start skipped"'
        : "npm run start --prefix ../frontend/frontend",
      url: FRONTEND_BASE_URL,
      reuseExistingServer: true,
      timeout: 120_000,
    },
    {
      command: process.env.SKIP_BACKEND_START
        ? 'echo "Backend start skipped"'
        : "dotnet run --urls " +
          BACKEND_BASE_URL +
          " --project ../backend/backend.csproj",
      url: BACKEND_BASE_URL + "/api/hello",
      reuseExistingServer: true,
      timeout: 120_000,
    },
  ],
  use: {
    baseURL: FRONTEND_BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
  metadata: {
    frontend: FRONTEND_BASE_URL,
    backend: BACKEND_BASE_URL,
  },
  // Extra environment we can read inside tests
  globalSetup: require.resolve("./utils/global-setup"),
});
