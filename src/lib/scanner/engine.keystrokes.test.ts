/**
 * Keystroke probe: type into a page, see where the text goes. Runs a real headless
 * Chromium against a routed fixture, no network. Skipped where no browser is installed.
 */
import { afterAll, beforeAll, describe, expect, it } from "vitest"
import { chromium, type Browser } from "playwright"
import { findMarker, probeKeystrokes } from "./engine"
import { createHash } from "node:crypto"

const PAGE = "https://fixture.test/"

// A search box that fires every keystroke at the site's own API, a session recorder
// that logs that web address, and an analytics beacon that never sees the text.
const HTML = `<!doctype html><html><body>
<input id="q" type="search">
<input type="hidden" value="x">
<script>
  const q = document.getElementById("q")
  q.addEventListener("input", () => {
    const own = "https://api.fixture.test/search?q=" + encodeURIComponent(q.value)
    fetch(own, { method: "POST", body: "" })
    fetch("https://recorder.example/collect", { method: "POST", body: JSON.stringify({ net: [own] }) })
    fetch("https://hashed.example/collect", { method: "POST", body: "__SHA__" })
    fetch("https://beacon.example/collect", { method: "POST", body: JSON.stringify({ event: "input" }) })
  })
</script></body></html>`

let browser: Browser | null = null
beforeAll(async () => {
  browser = await chromium.launch({ headless: true }).catch(() => null)
})
afterAll(async () => {
  await browser?.close()
})

describe("findMarker", () => {
  it("recognises the marker plain and hashed, and nothing else", () => {
    expect(findMarker("x dpscanprobe7k2v y")).toBe("plaintext")
    expect(findMarker(Buffer.from("dpscanprobe7k2v").toString("base64"))).toBe("base64")
    expect(findMarker(createHash("sha256").update("dpscanprobe7k2v").digest("hex"))).toBe("sha256")
    expect(findMarker("dpscanprobe")).toBeNull()
  })
})

describe("probeKeystrokes", () => {
  it("names only the outside hosts that received the typed text, and says when it rode in a URL", async () => {
    if (!browser) return // no Chromium on this machine
    const page = await browser.newPage()
    const sha = createHash("sha256").update("dpscanprobe7k2v").digest("hex")
    await page.route("**/*", route => {
      const url = route.request().url()
      if (url === PAGE) return route.fulfill({ contentType: "text/html", body: HTML.replace("__SHA__", "") })
      return route.fulfill({ status: 204, body: "" })
    })
    await page.route("https://hashed.example/collect", route =>
      route.fulfill({ status: 204, body: "" }),
    )
    await page.goto(PAGE)
    // the page cannot hash in this fixture, so patch the hashed beacon's body in-page
    await page.evaluate(sha => {
      const orig = window.fetch
      window.fetch = (u, init) =>
        orig(u, String(u).includes("hashed.example") ? { ...init, body: sha } : init)
    }, sha)

    const { leaks, inputs } = await probeKeystrokes(page, PAGE, 500)
    await page.close()

    expect(inputs).toBe(1)
    const byHost = Object.fromEntries(leaks.map(l => [l.domain, l]))
    expect(Object.keys(byHost).sort()).toEqual(["hashed.example", "recorder.example"])
    expect(byHost["recorder.example"]).toMatchObject({ form: "plaintext", viaUrl: true })
    expect(byHost["hashed.example"]).toMatchObject({ form: "sha256", viaUrl: false })
  })

  it("types nothing on a page with no fields", async () => {
    if (!browser) return
    const page = await browser.newPage()
    await page.route("**/*", route => route.fulfill({ contentType: "text/html", body: "<p>hi</p>" }))
    await page.goto(PAGE)
    const { leaks, inputs } = await probeKeystrokes(page, PAGE, 100)
    await page.close()
    expect(inputs).toBe(0)
    expect(leaks).toEqual([])
  })
})
