import { z } from "zod"

const envSchema = z.object({
  // Core
  DATABASE_URL: z.string().min(1).optional(),
  NEXT_PUBLIC_URL: z.string().default("http://localhost:3000"),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),


  // Site privacy scanner — mock mode when true (no Playwright browsers, e.g. Vercel)
  DISABLE_PLAYWRIGHT_SCANNER: z
    .string()
    .default("false")
    .transform((v) => v === "true"),

  // DNS leak infrastructure (optional separate probe server)
  DNS_LEAK_SERVER_URL: z.string().optional(),
  DNS_LEAK_SERVER_SECRET: z.string().optional(),

  // Scanner worker: an optional separate server that can launch Chromium.
  // When both are set, real scans run on the box; unset => local Playwright / mock.
  SCAN_WORKER_URL: z.string().optional(),
  SCAN_WORKER_SECRET: z.string().optional(),
  // Cloudflare Browser Run: a remote Chromium reached over CDP. Replaces the
  // self-hosted worker box — there is no machine to maintain, and the Workers free
  // tier (10 browser-minutes/day) covers roughly 60 scans a day.
  CLOUDFLARE_ACCOUNT_ID: z.string().optional(),
  CLOUDFLARE_BROWSER_TOKEN: z.string().optional(),

  // WebMCP origin-trial token for this origin (Chrome). Empty => no <meta> tag; WebMCP still
  // works in browsers that enable it by flag.
  NEXT_PUBLIC_WEBMCP_OT_TOKEN: z.string().default(""),

  // Email (Resend) — optional notifications
  RESEND_API_KEY: z.string().optional(),
  ADMIN_EMAIL: z.string().email().optional(),
})

type Env = z.infer<typeof envSchema>

function validateEnv(): Env {
  const parsed = envSchema.safeParse(process.env)

  if (!parsed.success) {
    const formatted = parsed.error.flatten().fieldErrors
    console.error("\n[env] Invalid environment variables:")
    for (const [key, errors] of Object.entries(formatted)) {
      console.error(`  ${key}: ${errors?.join(", ")}`)
    }
    if (process.env.NODE_ENV === "production") {
      throw new Error("Invalid environment variables — aborting production build")
    }
    console.warn("[env] Continuing in development mode with defaults.\n")
    return envSchema.parse({})
  }

  // N28: NEXT_PUBLIC_URL keeps a localhost default for dev ergonomics, but a missing value
  // in production must NOT silently fall back to localhost — it feeds every canonical URL,
  // the sitemap, the robots host, and the whole MCP/agent citation surface.
  if (parsed.data.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_URL) {
    throw new Error("[env] NEXT_PUBLIC_URL must be set in production (no localhost fallback)")
  }

  logServiceStatus(parsed.data)
  return parsed.data
}

function logServiceStatus(env: Env) {
  const services = [
    { name: "Database", enabled: !!env.DATABASE_URL },
    { name: "Playwright Scanner", enabled: !env.DISABLE_PLAYWRIGHT_SCANNER },
    { name: "DNS Leak Server", enabled: !!env.DNS_LEAK_SERVER_URL },
    { name: "Scan Worker", enabled: !!env.SCAN_WORKER_URL && !!env.SCAN_WORKER_SECRET },
    { name: "Email (Resend)", enabled: !!env.RESEND_API_KEY },
  ]

  const maxLen = Math.max(...services.map((s) => s.name.length))
  console.log("\n[env] Service status:")
  for (const s of services) {
    const icon = s.enabled ? "+" : "-"
    console.log(`  [${icon}] ${s.name.padEnd(maxLen)}  ${s.enabled ? "ON" : "OFF"}`)
  }
  console.log()
}

export const env = validateEnv()

export const isServiceEnabled = {
  database: !!env.DATABASE_URL,
  playwright: !env.DISABLE_PLAYWRIGHT_SCANNER,
  remoteBrowser: !!env.CLOUDFLARE_ACCOUNT_ID && !!env.CLOUDFLARE_BROWSER_TOKEN,
  dnsLeak: !!env.DNS_LEAK_SERVER_URL,
  scanWorker: !!env.SCAN_WORKER_URL && !!env.SCAN_WORKER_SECRET,
  email: !!env.RESEND_API_KEY,
} as const
