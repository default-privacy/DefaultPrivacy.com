import { env, isServiceEnabled } from "@/lib/env"
import type { ScanResult } from "./types"

/**
 * True when a remote scan worker is configured (both URL and secret set). When on,
 * real scans run on the offshore "DP Toolbox" box that can actually launch Chromium
 * — see worker/scan-server.ts. When off, the app uses local Playwright or the mock.
 */
export const isScanWorkerEnabled = isServiceEnabled.scanWorker

const WORKER_TIMEOUT_MS = 30_000

/**
 * Run a scan on the remote worker and return its ScanResult.
 *
 * HARD-FAILS on any problem (unconfigured, network error, non-2xx, or a simulated
 * payload) by throwing. Callers let that throw propagate to their catch, which turns
 * it into `success:false` ("Scan failed"). This NEVER substitutes mock data: a worker
 * outage must surface as a failure, not a fabricated grade about a named site.
 */
export async function fetchScanFromWorker(safeUrl: string): Promise<ScanResult> {
  if (!env.SCAN_WORKER_URL || !env.SCAN_WORKER_SECRET) {
    throw new Error("scan worker is not configured")
  }

  const res = await fetch(`${env.SCAN_WORKER_URL}/scan`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.SCAN_WORKER_SECRET}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ url: safeUrl }),
    signal: AbortSignal.timeout(WORKER_TIMEOUT_MS),
  })

  if (!res.ok) {
    throw new Error(`scan worker responded ${res.status}`)
  }

  const result = (await res.json()) as ScanResult

  // Defense in depth: the worker never emits simulated data, but if it somehow did,
  // refuse it rather than pass a fabricated grade through as a real measurement.
  if (result.simulated) {
    throw new Error("scan worker returned a simulated result")
  }

  return result
}
