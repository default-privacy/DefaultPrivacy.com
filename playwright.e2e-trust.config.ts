import { defineConfig, devices } from "@playwright/test"

/**
 * Temporary config for running trust e2e against an already-running dev server.
 * Points at port 3001 (or wherever the server is live) without launching a new one.
 * Delete after use or keep for CI convenience.
 */
export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  retries: 0,
  reporter: "line",
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
  },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
  ],
  // No webServer — assumes server is already running
})
