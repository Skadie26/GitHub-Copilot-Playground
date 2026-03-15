# Playwright Test Suite (Isolated)

This folder contains an isolated Playwright setup for both backend API and frontend UI tests.

## Structure

```
playwright-tests/
  package.json
  playwright.config.ts
  tests/
    api-weather.spec.ts
    ui-app.spec.ts
  fixtures/
  utils/
    global-setup.ts
```

## Prerequisites

- Node.js 18+ LTS
- Backend running locally (default assumed: http://localhost:5257)
- Angular frontend running on http://localhost:4200

## Install & Run

```powershell
cd playwright-tests
npm install
npx playwright install
npx playwright test
```

### UI Mode (Visual Test Explorer)

```powershell
npx playwright test --ui
```

### Headed mode

```powershell
npx playwright test --headed
```

### Debug a single test

```powershell
npx playwright test tests/api-weather.spec.ts:1 --debug
```

## Environment Variables

| Variable          | Purpose              | Default               |
| ----------------- | -------------------- | --------------------- |
| FRONTEND_BASE_URL | Angular app base URL | http://localhost:4200 |
| BACKEND_BASE_URL  | Backend API base URL | http://localhost:5282 |

Set them inline in PowerShell:

```powershell
$env:BACKEND_BASE_URL='http://localhost:5282'; $env:FRONTEND_BASE_URL='http://localhost:4200'; npx playwright test
```
