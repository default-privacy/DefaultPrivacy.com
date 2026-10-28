import { DrizzleQueryError } from "drizzle-orm"
import { describe, expect, it, vi } from "vitest"
import { failureCause, retryOnce } from "./retry"

describe("retryOnce", () => {
  it("runs a write that succeeds once", async () => {
    const write = vi.fn(async () => "ok")
    await expect(retryOnce(write)).resolves.toBeUndefined()
    expect(write).toHaveBeenCalledTimes(1)
  })

  it("tries a failed write once more", async () => {
    const write = vi.fn().mockRejectedValueOnce(new TypeError("fetch failed")).mockResolvedValueOnce("ok")
    await expect(retryOnce(write)).resolves.toBeUndefined()
    expect(write).toHaveBeenCalledTimes(2)
  })

  it("gives up after the second failure with that error", async () => {
    const write = vi.fn().mockRejectedValueOnce(new Error("first")).mockRejectedValueOnce(new Error("second"))
    await expect(retryOnce(write)).rejects.toThrow("second")
    expect(write).toHaveBeenCalledTimes(2)
  })
})

describe("failureCause", () => {
  // The chain seen in production logs on 2026-10-28, down to the socket error they cut off.
  const socket = Object.assign(new Error("other side closed"), { name: "SocketError", code: "UND_ERR_SOCKET" })
  const neon = Object.assign(new Error("Error connecting to database: TypeError: fetch failed"), {
    name: "NeonDbError",
    sourceError: new TypeError("fetch failed", { cause: socket }),
  })
  const query = new DrizzleQueryError('insert into "fp_attribute_counts" values ($1, $2)', ["screen", "1920x1080"], neon)

  it("names every cause down to the socket", () => {
    expect(failureCause(query)).toBe(
      "NeonDbError Error connecting to database: TypeError: fetch failed <- TypeError fetch failed <- SocketError UND_ERR_SOCKET other side closed",
    )
  })

  it("leaves out the query and its values", () => {
    expect(failureCause(query)).not.toMatch(/insert|1920x1080|params/)
  })

  it("describes a plain error, and something that isn't one", () => {
    expect(failureCause(new Error("boom"))).toBe("Error boom")
    expect(failureCause(undefined)).toBe("unknown error")
  })
})
