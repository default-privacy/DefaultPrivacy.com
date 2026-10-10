import { defineConfig } from "drizzle-kit"

import { getMigrateDatabaseUrl } from "./scripts/db-migrate-url"

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: getMigrateDatabaseUrl(),
  },
})
