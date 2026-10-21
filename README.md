# Default Privacy

[Default Privacy](https://defaultprivacy.com) is a free, independent privacy resource: a directory of privacy tools where each fact links to its source, practical step-by-step guides, curated tool stacks for common situations, a glossary, and free privacy checks. It has no accounts, no tracking and no affiliate links.

This repository is the code for the website and for the Default Privacy MCP server, which lets AI assistants use the same material.

## Use it

- **Website:** https://defaultprivacy.com
- **Start here:** https://defaultprivacy.com/start
- **AI assistants (MCP):** `https://mcp.defaultprivacy.com`, Streamable HTTP, no sign-in, read-only. Setup for Claude, ChatGPT and other clients: https://defaultprivacy.com/ai
- **Plain-text summary for AI models:** https://defaultprivacy.com/llms.txt

## What the MCP server does

[![Default Privacy MCP connector: tool definition quality and endpoint health on Glama](https://glama.ai/mcp/connectors/io.github.privatebydefault/default-privacy/badges/score.svg)](https://glama.ai/mcp/connectors/io.github.privatebydefault/default-privacy)

Also listed on [Smithery](https://smithery.ai/servers/privatebydefault/default-privacy). Smithery shuts down its gateway on October 31, 2026, so connections made through it stop working then (until then, Smithery sees those requests). Connect to `https://mcp.defaultprivacy.com` directly.

Every tool is read-only and needs no account. Among them:

- `dp_search`: one search across tools, guides, stacks and the glossary
- `dp_get_tool`: one tool's record, with the sources behind each fact and the caveats worth knowing
- `dp_find_alternatives`: private replacements for mainstream apps, and what switching involves
- `dp_how_private`: how private an app or service is, from our record, ToS;DR's dated grade of its terms (credited to ToS;DR) and the vendor's own privacy policy
- `dp_route`: describe a situation in plain words and get the guides and stacks to read
- `dp_check_mcp_server`: check an MCP server against our vetted list before connecting it
- `dp_check_email_security`, `dp_check_whois_privacy`, `dp_check_domain_breaches`: free checks on a domain

The full list is published in [`public/.well-known/mcp-server.json`](public/.well-known/mcp-server.json).

## How it is written

Every factual claim in a guide links to the page it came from. What a company says about itself is reported as its claim, and our own view is labelled as ours. How we source, date and correct the guides: https://defaultprivacy.com/editorial-policy. How we choose the tools we suggest first: https://defaultprivacy.com/how-we-pick.

## Run it locally

Requirements: [Bun](https://bun.sh/) and a PostgreSQL database.

```bash
bun install
cp .env.example .env.local   # set DATABASE_URL; everything else is optional
bun run dev
```

Guides, stacks and the glossary are files in `src/content/`. Directory listings are served from a PostgreSQL database; the schema is in `drizzle/`, and the directory dataset itself is not included in this repository.

Tests: `bun run test`. Type check: `npx tsc --noEmit`.

Stack: Next.js (App Router), React, TypeScript, Drizzle ORM, PostgreSQL, Tailwind CSS.

## Contributing

Suggest a tool, report a mistake or propose a fix: see [CONTRIBUTING.md](CONTRIBUTING.md). Security issues: see [SECURITY.md](SECURITY.md).

## License

The code is licensed under the [GNU Affero General Public License v3.0](LICENSE). If you run a modified version as a network service, you must offer its source to its users.

The written content (the guides, stacks, glossary and directory text in `src/content/` and served on the website) is © Default Privacy, all rights reserved. Quoting it with a link back is welcome.
