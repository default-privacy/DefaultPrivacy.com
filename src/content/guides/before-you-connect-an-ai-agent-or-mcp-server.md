---
title: "Before You Connect an AI Agent or MCP Server to Your Accounts"
slug: before-you-connect-an-ai-agent-or-mcp-server
description: "Connecting an AI assistant to your email, files or accounts lets it read and act on them. Prompt injection means content the AI reads can try to steer it. Here is a plain checklist, based on the MCP specification, OWASP and Anthropic's own connector guidance, for deciding what to connect and how to limit the damage."
category: Privacy
difficulty: intermediate
timeToComplete: "15 minutes"
publishedAt: "2026-10-10"
updatedAt: "2026-10-11"
author: Default Privacy
tags:
  - ai agents
  - mcp
  - model context protocol
  - prompt injection
  - connectors
  - ai security
  - permissions
relatedGuides:
  - private-ai-what-you-have-to-trust
  - how-to-use-ai-chatbots-privately
  - how-to-build-your-threat-model
  - move-2fa-codes-to-a-new-app-or-phone
relatedTools:
  - name: Password check
    href: /password-check
  - name: Breach check
    href: /breach-check
---

**Last checked: October 2026** · Everything below is what the sources named link to say. This is a new and fast-moving area, and we have not tested the products mentioned, so check the linked pages before you rely on a detail.

Connect an AI agent only to services you trust, give it the least access that does the job, prefer read-only access, and keep it away from accounts you cannot afford to have misused. The biggest risk is not a bug in the connection. It is that text the AI reads can contain instructions, and the AI may follow them.

Claude and a growing number of other AI assistants can connect to outside tools through a standard called the Model Context Protocol, or MCP. A connected tool can be a calendar, an email account, a file folder, a code host or a public database. Each connection is useful, and each one is something an attacker would like to reach.

---

## What a connection lets the AI do

When you connect Claude to an outside service, Anthropic says you are granting it the ability to access and potentially modify data in that service, based on your permissions. It says to connect only to remote servers you trust ([Anthropic](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)). The developer of a server decides what its tools do, and Anthropic's page lists reading data, creating, changing or deleting data, and taking actions for you ([Anthropic](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)).

There are two kinds of server:

- **Remote servers** run on someone else's machine and act as a go-between for the AI and an outside application. Setup usually involves signing in, often with OAuth, which lets the AI act without seeing your password. Some connectors use an API key or another fixed credential instead. On Anthropic's team and enterprise plans, everyone who uses such a connector reaches the service with that same credential, so Anthropic says to use one limited to what members should access ([Anthropic](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)).
- **Local servers** are programs that run on your own computer. In the MCP documentation's example file server, the program runs with your user account's permissions, so it can perform any file operation you can do by hand. The documentation tells you to grant access only to folders you are comfortable with the AI reading and changing ([MCP docs](https://modelcontextprotocol.io/docs/develop/connect-local-servers)).

---

## What the standard promises, and what it doesn't

The MCP specification states key principles. Users must explicitly consent to and understand all data access and operations. Hosts, meaning the app you use, must get explicit consent before invoking any tool. Descriptions of what a tool does should be treated as untrusted unless they come from a trusted server. The specification also says that MCP itself cannot enforce these principles at the protocol level. Whether you get a clear consent screen depends on the app you use ([MCP specification](https://modelcontextprotocol.io/specification/latest)).

So the protocol asks apps to protect you, and cannot make them do it. Read the permission prompts. Don't click through.

---

## The main risk: prompt injection

OWASP's Gen AI Security Project defines a prompt injection vulnerability as inputs that change an AI model's behavior or output in unintended ways. It says these inputs can work even if humans cannot see or read them, as long as the model processes the content, and that techniques such as retrieval and fine-tuning do not fully mitigate the problem ([OWASP](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)).

In plain terms: an AI that reads an email, a web page, a support ticket or a document may treat instructions hidden in it as if you had written them. Anthropic warns that malicious MCP servers may include hidden instructions that try to make Claude do unintended things. It says Claude has built-in protections that try to block this, but still tells you to watch tool inputs and outputs and to connect only to trusted servers ([Anthropic](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)).

### The three things that make it dangerous together

In a June 2025 post, Simon Willison describes a "lethal trifecta" for agents that use tools: access to your private data, exposure to untrusted content, and the ability to communicate externally in a way that could be used to steal data. He says that if an agent combines all three, an attacker can trick it into accessing your private data and sending it to them ([Simon Willison](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)). This is one writer's framing, not an official standard, but it is a practical test.

An agent that can read your inbox (private data), read mail from strangers (untrusted content) and send mail or make web requests (external communication) has all three. **The fix is to remove one of them.** For example, give the agent read-only access, or keep it away from content you don't control, or turn off its ability to send anything out.

---

## Opening someone else's project

A project can carry its own list of MCP servers, and a local MCP server can run code on your computer ([Claude Code](https://code.claude.com/docs/en/mcp), [VS Code](https://code.visualstudio.com/docs/agent-customization/mcp-servers)). The file is `.mcp.json` in Claude Code, `.mcp.json` or the older `.vscode/mcp.json` in VS Code, and `.cursor/mcp.json` in Cursor ([Claude Code](https://code.claude.com/docs/en/mcp), [VS Code](https://code.visualstudio.com/docs/agent-customization/mcp-servers), [Cursor](https://cursor.com/docs/context/mcp)).

Each tool handles that file differently. Claude Code asks before using a project's servers in a normal interactive session, but loads them without asking in `claude -p`, SDK and cloud sessions, and in bypass-permissions sessions set to skip the prompt ([Claude Code](https://code.claude.com/docs/en/mcp)). VS Code ties these servers to Workspace Trust: in Restricted Mode they are blocked, and once you trust the folder they can start without a separate prompt, by default when you send a chat message ([VS Code](https://code.visualstudio.com/docs/agent-customization/mcp-servers)). Cursor says all MCP connections need your approval, and since version 1.3 it asks again when an entry changes ([Cursor](https://cursor.com/docs/agent/security), [advisory](https://github.com/cursor/cursor/security/advisories/GHSA-24mc-g4xr-4395)). Before that fix, a server someone had approved could be swapped for a different command with no new prompt ([CVE-2025-54136](https://nvd.nist.gov/vuln/detail/CVE-2025-54136)).

Attackers already plant setup files that run when a repo is opened. On June 5, 2026 the Miasma worm used a hijacked contributor account to commit hook, task and agent-rule files that ran a credential stealer when the repo was opened in Claude Code, Gemini CLI, Cursor or VS Code. None of them was an MCP file, so check a project's other setup files too ([StepSecurity](https://www.stepsecurity.io/blog/miasma-worm-hits-microsoft-again-azure-functions-action-and-72-other-repositories-disabled-after-supply-chain-attack-targeting-ai-coding-agents)).

Before you approve or trust a cloned project, open its MCP file and read the command it runs ([VS Code](https://code.visualstudio.com/docs/agent-customization/mcp-servers)). To keep a server off, use `disabledMcpjsonServers` in Claude Code, **MCP: List Servers** then **Disable** in VS Code chat, or the toggle under **Customize** in Cursor ([Claude Code](https://code.claude.com/docs/en/settings-reference), [VS Code](https://code.visualstudio.com/docs/agent-customization/mcp-servers), [Cursor](https://cursor.com/docs/context/mcp)).

---

## A checklist before you connect

1. **Who runs it?** Connect only to servers built and hosted by organizations you trust ([Anthropic](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)). A random server from a list or a chat message is a stranger with access to your account.
2. **What permissions does it ask for?** Anthropic says to review them during sign-in, limit the scopes where you can, and deny access if the permissions seem unnecessary ([Anthropic](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)).
3. **Can it only read, or can it also change and send?** Choose read-only where you can.
4. **What content can strangers put in front of it?** Email, web pages, shared documents and tickets are all places an attacker can hide instructions.
5. **Can it send anything out?** Email, posting and web requests are ways data can leave.
6. **Is it connected to something you can't afford to lose?** Use a separate test account first. Keep your main email, banking and password manager out of agent connections.
7. **Are approvals turned on?** Leave the app's confirmation prompts on for actions that change or send data.
8. **Will you notice changes?** Anthropic says server developers may update tool behavior unexpectedly ([Anthropic](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)). Re-check connected servers from time to time.
9. **Do you know how to disconnect?** Anthropic says you can revoke permissions by disconnecting the connector in Claude's settings or in the outside service's security settings ([Anthropic](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)).

---

## Low risk and high risk

| Setup | Risk |
|---|---|
| A server that returns public information and has no access to your accounts | Lower. There is little private data to steal. |
| A local server limited to one folder, read-only, with approvals on | Moderate. Depends on what is in the folder. |
| An agent with your email, the open web and the ability to send | High. It has all three parts of the trifecta. |

We keep a short list of [MCP servers](/directory?category=mcp-servers) that meet a published bar: open source, maintained in the last six months, clear about what they can read or change, and unable to move money by default. Servers that can send messages, run code or act on devices are listed only if they are official and narrowly scoped. Each listing says what the server can touch. A listing is not a security audit, and a server missing from it has simply not been reviewed.

One popular server is left out on purpose. Desktop Commander lets an AI run terminal commands and edit files on your computer, and its own guardrails are, in its words, "not a sandbox" ([Desktop Commander](https://github.com/wonderwhy-er/DesktopCommanderMCP)). A general shell runner can do anything you can do at your keyboard, so no caveat would describe what it can touch. If you use it anyway, its Docker install keeps it in a container ([Desktop Commander](https://github.com/wonderwhy-er/DesktopCommanderMCP)).

**A disclosure.** Default Privacy runs an MCP server, described on our [AI page](/ai). It is built to be the low-risk kind: it answers questions from public directory data and has no access to your accounts. Some of its tools look up public information about a domain you give it. We count request types and the app that made them, not IP addresses or text you send. We say this so you can judge it, not because our description makes it safe. Apply the same checklist to ours as to any other.

---

## FAQ

**What is an MCP server?**

It is a program that gives an AI assistant access to a tool or a source of data, using the Model Context Protocol. It can run on your computer or on someone else's server ([MCP docs](https://modelcontextprotocol.io/docs/develop/connect-local-servers)).

**Is it safe to connect an AI to my email?**

It depends on what else the agent can do. Reading mail from strangers while being able to send messages gives an attacker a route to trick it, as Simon Willison's three-part test describes ([Simon Willison](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/)). If you do it, use read-only access and keep approvals on.

**Can a web page really give instructions to my AI?**

OWASP says prompt injection inputs can affect a model even when humans can't see them, as long as the model processes the content ([OWASP](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)).

**Does the AI company protect me from this?**

Anthropic says Claude has built-in protections against prompt injection that try to block it, but still advises you to pay attention to tool inputs and outputs and connect only to trusted servers ([Anthropic](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)). Treat protections as a layer, not a guarantee.

**Should I use local or remote servers?**

Local servers keep data on your computer but run with your permissions, so limit the folders they can reach ([MCP docs](https://modelcontextprotocol.io/docs/develop/connect-local-servers)). Remote servers need you to trust their operator. Neither is automatically safer.

**How do I undo a connection?**

Disconnect it in your AI app's settings, and revoke access in the outside service's own security settings ([Anthropic](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp)). Then check that service for anything done in your name.
