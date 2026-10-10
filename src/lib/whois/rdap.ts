/**
 * WHOIS / RDAP privacy check (shared by UI server actions and MCP).
 * Uses RDAP — JSON-based public registration data.
 */

export type WhoisField = {
  label: string
  value: string
  sensitive: boolean
}

export type WhoisResult = {
  success: boolean
  domain: string
  registrar: string | null
  registrationDate: string | null
  expirationDate: string | null
  fields: WhoisField[]
  isPrivacyProtected: boolean
  privacyScore: "good" | "partial" | "exposed"
  error?: string
}

const privacyIndicators = [
  "privacy",
  "proxy",
  "redacted",
  "gdpr",
  "whoisguard",
  "domains by proxy",
  "contact privacy",
  "withheld",
  "data protected",
  "not disclosed",
  "identity protect",
  "perfect privacy",
  "namecheap",
  "cloudflare",
  "private registration",
  "registration private",
  "select request email form",
]

let bootstrapCache: { services: [string[], string[]][] } | null = null
let bootstrapFetchedAt = 0
const BOOTSTRAP_TTL_MS = 86_400_000

export function extractDomain(input: string): string {
  let domain = input.trim().toLowerCase()
  domain = domain.replace(/^https?:\/\//, "")
  domain = domain.split("/")[0]
  domain = domain.split(":")[0]
  domain = domain.replace(/^www\./, "")
  return domain
}

function isRedacted(value: string): boolean {
  const lower = value.toLowerCase()
  return privacyIndicators.some((p) => lower.includes(p)) || lower === "" || lower === "n/a"
}

function extractVcardFields(entities: Record<string, unknown>[]): WhoisField[] {
  const fields: WhoisField[] = []

  for (const entity of entities) {
    const roles = (entity.roles as string[]) || []
    const roleLabel = roles.includes("registrant")
      ? "Registrant"
      : roles.includes("admin") || roles.includes("administrative")
        ? "Admin"
        : roles.includes("tech") || roles.includes("technical")
          ? "Tech"
          : roles.join(", ")

    const vcardArray = entity.vcardArray as [string, unknown[][]] | undefined
    if (!vcardArray || vcardArray[0] !== "vcard") continue

    const vcard = vcardArray[1]
    for (const prop of vcard) {
      const [name, , , value] = prop as [string, unknown, string, unknown]

      if (name === "fn" && value) {
        const v = String(value)
        const redacted = isRedacted(v)
        fields.push({
          label: `${roleLabel} Name`,
          value: redacted ? "(Privacy Protected)" : v,
          sensitive: !redacted,
        })
      }
      if (name === "org" && value) {
        const v = String(value)
        const redacted = isRedacted(v)
        fields.push({
          label: `${roleLabel} Organization`,
          value: redacted ? "(Privacy Protected)" : v,
          sensitive: !redacted,
        })
      }
      if (name === "adr" && value) {
        const parts = Array.isArray(value) ? value.filter(Boolean).join(", ") : String(value)
        if (parts.trim()) {
          const redacted = isRedacted(parts)
          fields.push({
            label: `${roleLabel} Address`,
            value: redacted ? "(Privacy Protected)" : parts,
            sensitive: !redacted,
          })
        }
      }
      if (name === "tel" && value) {
        const v = String(value)
        const redacted = isRedacted(v)
        fields.push({
          label: `${roleLabel} Phone`,
          value: redacted ? "(Privacy Protected)" : v,
          sensitive: !redacted,
        })
      }
      if (name === "email" && value) {
        const v = String(value)
        const redacted = isRedacted(v)
        fields.push({
          label: `${roleLabel} Email`,
          value: redacted ? "(Privacy Protected)" : v,
          sensitive: !redacted,
        })
      }
    }
  }

  return fields
}

async function getRdapBootstrap(): Promise<{ services: [string[], string[]][] }> {
  const now = Date.now()
  if (bootstrapCache && now - bootstrapFetchedAt < BOOTSTRAP_TTL_MS) {
    return bootstrapCache
  }

  const bootstrapRes = await fetch("https://data.iana.org/rdap/dns.json", {
    signal: AbortSignal.timeout(5000),
  })
  if (!bootstrapRes.ok) throw new Error("Could not fetch RDAP bootstrap data")

  const bootstrap = (await bootstrapRes.json()) as { services: [string[], string[]][] }
  bootstrapCache = bootstrap
  bootstrapFetchedAt = now
  return bootstrap
}

export async function checkWhoisPrivacy(input: string): Promise<WhoisResult> {
  const domain = extractDomain(input)

  if (!domain || !domain.includes(".")) {
    return {
      success: false,
      domain: input,
      registrar: null,
      registrationDate: null,
      expirationDate: null,
      fields: [],
      isPrivacyProtected: false,
      privacyScore: "exposed",
      error: "Please enter a valid domain name.",
    }
  }

  try {
    const tld = domain.split(".").pop()!
    const bootstrap = await getRdapBootstrap()
    let rdapBase: string | null = null

    for (const entry of bootstrap.services) {
      const [tlds, urls] = entry
      if (tlds.includes(tld)) {
        rdapBase = urls[0]
        break
      }
    }

    if (!rdapBase) {
      return {
        success: false,
        domain,
        registrar: null,
        registrationDate: null,
        expirationDate: null,
        fields: [],
        isPrivacyProtected: false,
        privacyScore: "exposed",
        error: `RDAP lookup not available for .${tld} domains.`,
      }
    }

    const rdapUrl = `${rdapBase}domain/${domain}`
    const rdapRes = await fetch(rdapUrl, { cache: "no-store", signal: AbortSignal.timeout(5000) })

    if (!rdapRes.ok) {
      if (rdapRes.status === 404) {
        return {
          success: false,
          domain,
          registrar: null,
          registrationDate: null,
          expirationDate: null,
          fields: [],
          isPrivacyProtected: false,
          privacyScore: "exposed",
          error: `Domain not found: ${domain}`,
        }
      }
      throw new Error(`RDAP server returned ${rdapRes.status}`)
    }

    const data = await rdapRes.json()

    let registrar: string | null = null
    if (data.entities) {
      for (const entity of data.entities) {
        if (entity.roles?.includes("registrar") && entity.vcardArray) {
          const vcard = entity.vcardArray[1]
          for (const prop of vcard) {
            if (prop[0] === "fn") {
              registrar = String(prop[3])
              break
            }
          }
        }
      }
    }

    let registrationDate: string | null = null
    let expirationDate: string | null = null
    if (data.events) {
      for (const event of data.events) {
        if (event.eventAction === "registration") {
          registrationDate = event.eventDate?.split("T")[0] || null
        }
        if (event.eventAction === "expiration") {
          expirationDate = event.eventDate?.split("T")[0] || null
        }
      }
    }

    const allEntities: Record<string, unknown>[] = []
    if (data.entities) {
      for (const entity of data.entities) {
        if (entity.vcardArray) allEntities.push(entity)
        if (entity.entities) {
          for (const nested of entity.entities) {
            if (nested.vcardArray) allEntities.push(nested)
          }
        }
      }
    }

    const fields = extractVcardFields(allEntities)
    const sensitiveFields = fields.filter((f) => f.sensitive)
    const totalContactFields = fields.length
    const isPrivacyProtected = sensitiveFields.length === 0 && totalContactFields > 0
    const privacyScore: WhoisResult["privacyScore"] =
      sensitiveFields.length === 0
        ? "good"
        : sensitiveFields.length < totalContactFields / 2
          ? "partial"
          : "exposed"

    return {
      success: true,
      domain,
      registrar,
      registrationDate,
      expirationDate,
      fields,
      isPrivacyProtected,
      privacyScore,
    }
  } catch (error) {
    return {
      success: false,
      domain,
      registrar: null,
      registrationDate: null,
      expirationDate: null,
      fields: [],
      isPrivacyProtected: false,
      privacyScore: "exposed",
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}
