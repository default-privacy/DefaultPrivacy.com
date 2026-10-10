#!/usr/bin/env node
/**
 * Lighthouse launch gate — scores core public routes.
 * Requires dev server at BASE_URL (default http://localhost:3000).
 *
 * Usage: node scripts/lighthouse-gate.mjs
 * Output: reports/lighthouse-gate-summary.json + per-route JSON
 */

import { spawn } from "node:child_process"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000"
const ROUTES = [
  "/",
  "/protect",
  "/about",
  "/compare",
  "/tools",
  "/trusts",
  "/privacy",
  "/terms",
  "/llc-for-content-creators",
]

const THRESHOLDS = {
  performance: 0.75,
  accessibility: 0.9,
  "best-practices": 0.9,
  seo: 0.9,
}

function runLighthouse(url, outPath) {
  return new Promise((resolve, reject) => {
    const args = [
      url,
      "--output=json",
      `--output-path=${outPath}`,
      "--only-categories=performance,accessibility,best-practices,seo",
      "--chrome-flags=--headless --no-sandbox",
      "--quiet",
    ]
    const child = spawn("npx", ["lighthouse@12", ...args], {
      stdio: ["ignore", "pipe", "pipe"],
    })
    let stderr = ""
    child.stderr.on("data", (d) => {
      stderr += d.toString()
    })
    child.on("close", (code) => {
      if (code === 0) resolve()
      else reject(new Error(stderr || `lighthouse exit ${code}`))
    })
  })
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function main() {
  await mkdir("reports", { recursive: true })
  const summary = { baseURL: BASE_URL, generatedAt: new Date().toISOString(), routes: [] }

  for (const route of ROUTES) {
    const slug = route === "/" ? "home" : route.slice(1).replace(/\//g, "-")
    const url = `${BASE_URL}${route}`
    const outPath = join("reports", `lighthouse-${slug}.json`)
    process.stdout.write(`Lighthouse: ${url} ... `)
    try {
      await sleep(2000)
      await runLighthouse(url, outPath)
      const raw = JSON.parse(await readFile(outPath, "utf8"))
      const cats = raw.categories
      const scores = {
        performance: cats.performance?.score ?? null,
        accessibility: cats.accessibility?.score ?? null,
        bestPractices: cats["best-practices"]?.score ?? null,
        seo: cats.seo?.score ?? null,
      }
      const pass = Object.entries({
        performance: scores.performance,
        accessibility: scores.accessibility,
        "best-practices": scores.bestPractices,
        seo: scores.seo,
      }).every(([k, v]) => v == null || v >= THRESHOLDS[k])
      summary.routes.push({ route, url, scores, pass })
      console.log(pass ? "PASS" : "FAIL", scores)
    } catch (err) {
      summary.routes.push({ route, url, error: String(err.message ?? err), pass: false })
      console.log("ERROR")
    }
  }

  const allPass = summary.routes.every((r) => r.pass)
  summary.allPass = allPass
  await writeFile(
    "reports/lighthouse-gate-summary.json",
    JSON.stringify(summary, null, 2)
  )
  console.log(`\nWrote reports/lighthouse-gate-summary.json (allPass=${allPass})`)
  process.exit(allPass ? 0 : 1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
