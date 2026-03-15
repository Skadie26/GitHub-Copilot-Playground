import type { FullConfig } from "@playwright/test";

// This can be extended later (e.g., seed database, ensure backend reachable, etc.)
async function globalSetup(config: FullConfig) {
  // Placeholder: we could attempt a simple fetch to backend to verify it's running.
  // Keep lightweight to avoid masking startup race; rely on test retries.
  console.log(
    "[globalSetup] Loaded. Backend:",
    process.env.BACKEND_BASE_URL || "http://localhost:5257"
  );
}

export default globalSetup;
