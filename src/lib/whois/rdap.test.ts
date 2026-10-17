import { describe, expect, it, vi } from "vitest"
import { extractVcardFields } from "./rdap"

const entity = (roles: string[], fn: string) => ({ roles, vcardArray: ["vcard", [["version", {}, "text", "4.0"], ["fn", {}, "text", fn]]] })

describe("extractVcardFields", () => {
  it("counts the owner's own contact as exposed", () => {
    const [f] = extractVcardFields([entity(["registrant"], "Jane Doe")])
    expect(f.sensitive).toBe(true)
  })
  it("never counts the registrar or abuse contact as the owner's data", () => {
    const fields = extractVcardFields([entity(["registrar"], "Some Registrar Inc"), entity(["abuse"], "Abuse Desk")])
    expect(fields.length).toBeGreaterThan(0)
    expect(fields.every((f) => !f.sensitive)).toBe(true)
  })
})

import { checkWhoisPrivacy } from "./rdap"
describe("checkWhoisPrivacy input", () => {
  it("refuses anything that isn't a plain domain before any lookup", async () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch").mockRejectedValue(new Error("no network in this test"))
    for (const bad of ["exa%2fmple.com", "exa mple.com", "example.com?x=1#", "localhost"]) {
      expect((await checkWhoisPrivacy(bad)).success, bad).toBe(false)
    }
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })
})
