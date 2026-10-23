import { readFileSync } from "fs"
import { join } from "path"
import { describe, expect, it } from "vitest"

// The scanner was down in production 10-17 to 10-23: a lockfile refresh took
// playwright 1.58 → 1.64, whose core loads browsers.json through a computed path the
// file tracer can't see. Bumping playwright means a live scan after deploy.
describe("scanner packaging", () => {
  const root = process.cwd()

  it("pins playwright to an exact version", () => {
    const pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"))
    expect(pkg.dependencies.playwright).toMatch(/^\d+\.\d+\.\d+$/)
  })

  it("ships playwright-core's browsers.json with every route", () => {
    const config = readFileSync(join(root, "next.config.ts"), "utf8")
    expect(config).toContain('"/**": ["./node_modules/playwright-core/browsers.json"]')
  })
})
