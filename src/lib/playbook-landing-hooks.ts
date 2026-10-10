export type PlaybookLandingHookId = "billionaire" | "paper-trail" | "searched"

export type PlaybookLandingHook = {
  id: PlaybookLandingHookId
  kicker: string
  headline: string
  sub: string
}

export const PLAYBOOK_LANDING_HOOKS: Record<PlaybookLandingHookId, PlaybookLandingHook> = {
  billionaire: {
    id: "billionaire",
    kicker: "The structure the wealthy use",
    headline: "Rich people don't own anything in their own name.",
    sub: "Here's the two-state structure they use to keep a home address off public records — built for you.",
  },
  "paper-trail": {
    id: "paper-trail",
    kicker: "For new homeowners",
    headline: "The week you buy a home, your address becomes public record.",
    sub: "Here's how to take it back — without it crawling back.",
  },
  searched: {
    id: "searched",
    kicker: "What a stranger sees",
    headline: "Search your own name. Here's what anyone else can find.",
    sub: "Home address, relatives, past addresses — and how to reduce what shows up on public records.",
  },
}

const VALID_HOOK_IDS = new Set<string>(Object.keys(PLAYBOOK_LANDING_HOOKS))

export function getPlaybookLandingHook(
  param: string | undefined | null,
): PlaybookLandingHook {
  if (param && VALID_HOOK_IDS.has(param)) {
    return PLAYBOOK_LANDING_HOOKS[param as PlaybookLandingHookId]
  }
  return PLAYBOOK_LANDING_HOOKS.billionaire
}
