/**
 * The MCP address and one-click install links, shared by /ai and the connect card so
 * they can't drift. Our config is URL-only: no command, no secrets, nothing that runs
 * on the reader's machine. Link formats checked against vendor docs 2026-10-11:
 *   Cursor: cursor.com/docs/mcp/install-links (config = base64 of the server config)
 *   VS Code: vscode-docs api/extension-guides/ai/mcp.md (URL-encoded JSON, name inside)
 *   Claude: claude.com/docs/connectors/building/directory-vs-custom.md (prefills; user confirms)
 */

export const MCP_URL = "https://mcp.defaultprivacy.com"
export const MCP_NAME = "default-privacy"

export const cursorInstallLink = () =>
  `cursor://anysphere.cursor-deeplink/mcp/install?name=${MCP_NAME}&config=${btoa(JSON.stringify({ url: MCP_URL }))}`

export const vscodeInstallLink = () =>
  `vscode:mcp/install?${encodeURIComponent(JSON.stringify({ name: MCP_NAME, type: "http", url: MCP_URL }))}`

/** Claude's documented prefill link: opens the Add custom connector dialog; the user still confirms. */
export const claudeConnectorLink = () =>
  `https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=${encodeURIComponent("Default Privacy")}&connectorUrl=${encodeURIComponent(MCP_URL)}`

export type AiApp = {
  id: string
  name: string
  /** One-click link, when the vendor documents one. */
  install?: () => string
  /** Where to click, in the vendor's own words. */
  steps?: string
  /** Plan limits or a catch worth knowing before you try. */
  note?: string
  sources: string[]
}

/**
 * Apps that can add our server, most used first. Checked against each vendor's own docs
 * 2026-10-11 (research: Documents/defaultprivacy/MCP/connect-apps-2026-10-11.md).
 * Names are plain text: several vendors don't allow their logos on third-party buttons.
 */
export const AI_APPS: AiApp[] = [
  {
    id: "claude",
    name: "Claude",
    install: claudeConnectorLink,
    steps: "Customize → Connectors → + Add → Add custom connector, then paste the address.",
    note: "Free, Pro and Max plans; on Team and Enterprise an owner or admin adds it first. The free plan allows one custom connector.",
    sources: ["https://support.claude.com/en/articles/11175166-getting-started-with-custom-connectors-using-remote-mcp"],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    steps: "Turn on developer mode in Settings → Apps → Advanced settings, then go to chatgpt.com/plugins, choose + and Add custom MCP server.",
    note: "On the web, in developer mode, on Pro, Business, Enterprise and Edu. On Business only admins can use it.",
    sources: [
      "https://help.openai.com/en/articles/12584461-developer-mode-apps-and-full-mcp-connectors-in-chatgpt-beta",
      "https://developers.openai.com/plugins/deploy/connect-chatgpt",
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    steps: "On gemini.google.com: Settings → Connected Apps → Add a custom app.",
    note: "US only, 18 or over, a personal Google account, and Keep Activity must be on, which saves your Gemini chats to your account (18 months by default) and lets Google use them to train its AI, with human reviewers.",
    sources: ["https://support.google.com/gemini/answer/17209137", "https://support.google.com/gemini/answer/13594961"],
  },
  {
    id: "grok",
    name: "Grok",
    steps: "Go to grok.com/connectors, choose New Connector, then Custom.",
    note: "On Grok Business and Enterprise, a team admin sets up connectors first.",
    sources: ["https://docs.x.ai/grok/connectors"],
  },
  {
    id: "perplexity",
    name: "Perplexity",
    steps: "Account settings → Connectors → + Custom connector → Remote.",
    note: "In an Enterprise organization, members can add one only if an admin turns it on.",
    sources: ["https://www.perplexity.ai/help-center/en/articles/13915507-adding-custom-remote-connectors"],
  },
  {
    id: "mistral",
    name: "Mistral",
    steps: "Connectors → + Add Connector → Custom MCP Connector. The name can't have spaces, so use DefaultPrivacy.",
    note: "On Free, Pro and Student plans you are the admin, so you can add it yourself.",
    sources: ["https://docs.mistral.ai/vibe/work/connectors/mcp-connectors"],
  },
  { id: "cursor", name: "Cursor", install: cursorInstallLink, sources: ["https://cursor.com/docs/mcp/install-links"] },
  { id: "vscode", name: "VS Code", install: vscodeInstallLink, sources: ["https://code.visualstudio.com/api/extension-guides/ai/mcp"] },
]
