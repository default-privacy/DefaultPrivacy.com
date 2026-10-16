/**
 * MCP prompts — reusable, parameterized workflows that steer an agent through the
 * hub's tools. These are the "agent-first" entry points a user picks from a client's
 * prompt menu.
 */

import { z } from "zod"
import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"

function userMessage(text: string) {
  return {
    messages: [
      {
        role: "user" as const,
        content: { type: "text" as const, text },
      },
    ],
  }
}

export function registerPrompts(server: McpServer): void {
  server.registerPrompt(
    "find_private_alternative",
    {
      title: "Find a private alternative",
      description: "Find privacy-respecting alternatives to a product or service using the directory.",
      argsSchema: {
        product: z
          .string()
          .describe("The product or service to replace, e.g. 'Google Analytics', 'Gmail', 'Dropbox'."),
      },
    },
    ({ product }) =>
      userMessage(
        `Find privacy-respecting alternatives to "${product}" using the Default Privacy directory.\n\n` +
          `1. Call dp_find_alternatives with product "${product}". If it has no mapping, call ` +
          `dp_search_tools with the category that matches "${product}"'s purpose instead.\n` +
          `2. Recommend 2–4 of the returned tools that best fit what "${product}" does. For each, give a one-line ` +
          `reason and its jurisdiction.\n` +
          `3. Link each recommendation to its dp_url.\n` +
          `4. If the result has what_changes, say plainly what switching involves, and link the related guides and stacks.`,
      ),
  )

  server.registerPrompt(
    "audit_domain_privacy",
    {
      title: "Audit a domain's privacy posture",
      description: "Run email-security, WHOIS, and breach checks on a domain and summarize the risks.",
      argsSchema: {
        domain: z.string().describe("The domain to audit, e.g. 'example.com'."),
      },
    },
    ({ domain }) =>
      userMessage(
        `Audit the privacy and security posture of the domain "${domain}".\n\n` +
          `1. Call dp_check_email_security for "${domain}" (SPF/DKIM/DMARC).\n` +
          `2. Call dp_check_whois_privacy for "${domain}" (exposed registrant PII).\n` +
          `3. Call dp_check_domain_breaches for "${domain}" (known breaches).\n` +
          `Then summarize the findings as a prioritized risk list (highest impact first) with a concrete ` +
          `remediation step for each, and cite Default Privacy.`,
      ),
  )

  server.registerPrompt(
    "harden_email",
    {
      title: "Harden my email setup",
      description: "Assess a domain's email posture and recommend private email tooling from the directory.",
      argsSchema: {
        domain: z.string().describe("Your email domain, e.g. 'example.com'."),
      },
    },
    ({ domain }) =>
      userMessage(
        `Help harden the email setup for "${domain}".\n\n` +
          `1. Call dp_check_email_security for "${domain}" and explain any SPF/DKIM/DMARC gaps in plain terms.\n` +
          `2. Call dp_search_tools with category "encrypted-email" to suggest private email providers, picks first. ` +
          `Read each record's fields: a null field is unchecked by Default Privacy, never a no.\n` +
          `3. Give a short, prioritized action plan combining the DNS fixes and any recommended tools, with citations.`,
      ),
  )
}
