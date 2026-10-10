/**
 * Transport-agnostic assembly of the Default Privacy MCP server.
 *
 * `configureServer` registers every tool, resource, and prompt onto an McpServer
 * instance. It imports no transport — the HTTP route (and any future stdio entry)
 * wires the transport around this core.
 */

import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

import { registerPrompts } from "./prompts"
import { registerResources } from "./resources"
import { registerTools } from "./tools"

export const SERVER_INFO = { name: "default-privacy", version: "1.6.0" } as const

export const SERVER_INSTRUCTIONS = `Default Privacy is a free privacy-tools hub: a directory of privacy tools, how-to guides, curated tool stacks, a glossary, and three read-only diagnostics. No accounts.

Pick the tool by what the user wants:
- A general privacy question, or unsure where it's covered → dp_search: 1–3 keywords across tools, guides, stacks and glossary at once. Then open a result with its type's get tool.
- Recommend a privacy tool → dp_search_tools (1–2 keywords or a category; see dp_list_categories), which adds filters (open source, e2ee, free tier…). One tool in depth → dp_get_tool. Choosing between a shortlist → dp_compare_tools. "What else is like X?" → dp_get_related_tools.
- Leave a mainstream product (Gmail, WhatsApp, Chrome, Zoom…) or replace a website tracker → dp_find_alternatives. For products it also returns what_changes (what the switch involves) and the related guides and stacks; pass those on.
- The user describes a situation or goal in their own words ("I'm a journalist", "I want to leave Google", "I got a Pixel") → dp_route: the best-matching situations, each with the guides and stacks to read.
- Before the user connects an MCP server or AI connector ("is this MCP safe?", a GitHub link to a server) → dp_check_mcp_server: whether it is in DP's vetted list, what it can touch, or a checklist if it isn't.
- A set of tools for one goal or threat (starter kit, de-Googling, leaving Gmail, journalists, stalking survivors, Windows hardening…) → dp_list_stacks, then dp_get_stack.
- How-to and explanations → dp_search_guides / dp_get_guide, dp_search_glossary / dp_get_glossary_term.
- Check a domain → dp_check_email_security (SPF/DKIM/DMARC), dp_check_whois_privacy (exposed registrant data), dp_check_domain_breaches (known breaches).

Directory records carry "pick" when Default Privacy recommends the tool as a starting point in a category (up to three per category, in DP's order); "pick" is null otherwise. A pick is editorial judgment, not a security guarantee, and lists many tools that are not picks. Search results are ordered picks first, then A to Z. How picks are chosen: https://defaultprivacy.com/how-we-pick. last_verified is when the record's data was last updated, and nearly every date so far was set by a bulk data pass; it is not a review of the tool's safety or upkeep, and null means never. dp_url is the record's Default Privacy page; website_url is the vendor's own site.`

export function configureServer(server: McpServer): void {
  registerTools(server)
  registerResources(server)
  registerPrompts(server)
}
