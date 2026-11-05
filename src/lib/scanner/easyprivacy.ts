/**
 * EasyPrivacy matcher: "would a tracker blocker have blocked this request?"
 * Rules come from src/data/easyprivacy-snapshot.json (bun run sync:easyprivacy), never the network.
 * Licence: GPLv3 / CC BY-SA 3.0, credit "The EasyList authors (https://easylist.to/)".
 */

import { FiltersEngine, Request } from "@ghostery/adblocker"
import snapshot from "@/data/easyprivacy-snapshot.json"

let engine: FiltersEngine | null = null

function getEngine(): FiltersEngine {
  engine ??= FiltersEngine.parse(snapshot.rules.join("\n"), { loadCosmeticFilters: false })
  return engine
}

export const EASYPRIVACY_VERSION: string = snapshot.version

/** True when EasyPrivacy would block `url` requested by the page at `pageUrl`. */
export function matchesEasyPrivacy(url: string, pageUrl: string, type = "script"): boolean {
  try {
    const req = Request.fromRawDetails({ url, sourceUrl: pageUrl, type: type as never })
    return getEngine().match(req).match
  } catch {
    return false
  }
}
