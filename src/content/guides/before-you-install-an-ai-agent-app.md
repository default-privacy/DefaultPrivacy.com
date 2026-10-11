---
title: "Before You Install an AI Agent App: What It Can See, Do and Spend"
slug: before-you-install-an-ai-agent-app
description: "AI agent apps like Meta's Muse, OpenAI's dots, Gemini and Copilot can read your email, act on websites and buy things for you. Here is what the main ones can reach, what they keep and when they ask first, why hidden instructions can steer them, how to cap the money they can touch, and how to take access back."
category: Privacy
difficulty: beginner
timeToComplete: "12 minutes"
publishedAt: "2026-10-10"
updatedAt: "2026-10-10"
author: Default Privacy
tags:
  - ai agents
  - agent apps
  - muse
  - openai dots
  - gemini
  - prompt injection
  - app permissions
  - agentic payments
relatedGuides:
  - before-you-connect-an-ai-agent-or-mcp-server
  - how-to-use-ai-chatbots-privately
  - private-ai-what-you-have-to-trust
  - someones-ai-is-recording-you
relatedTools:
  - name: Breach check
    href: /breach-check
---

**Last checked: October 2026** · Product details below are what each company's own pages say, with a link. This field changes every month, so check the linked page before you rely on a detail. For the technical version of this guide, aimed at people connecting AI tools with MCP, see [Before You Connect an AI Agent or MCP Server](/guides/before-you-connect-an-ai-agent-or-mcp-server).

An AI agent app doesn't just answer questions. It acts: it reads your email, clicks through websites, sends messages and buys things. Installing one is like handing your unlocked phone to a very fast assistant who believes anything written down.

Before you say yes, answer three questions:

1. **What can it read?** Email, messages, calendar, files, your browser while you're signed in.
2. **What can it do without asking?** Send, delete, change settings, log in.
3. **What can it spend?** Which card, and is there a limit?

---

## What the main ones can reach

This is what each company says about its own product. None of it has been tested by us.

| App | What it can reach | What it keeps | When it asks first |
|---|---|---|---|
| **Muse** (Meta) | Apps you connect; for email you choose read-only or read-and-send. Runs on its own computer in Meta's cloud, where your connected logins are stored ([Meta](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)) | No retention period stated. You can tell it to "forget" specific things and opt out of your activity training Meta's AI ([Meta](https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/)) | Before sending email or buying; shows an audit trail. Meta says "Read-only, previously allowed, or demonstrably low-risk actions can proceed without interruption" ([Meta](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse)) |
| **dots** (OpenAI, Pro and Business Premium plans) | Its own cloud computer, over 4,000 apps, and your laptop if you allow it ([OpenAI](https://openai.com/index/introducing-dots/)) | What it learns from your chats and apps, for as long as the dot exists. You can't view or delete single memories, and disconnecting an app doesn't remove what it already learned ([OpenAI](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs)) | You take over for password changes and money transfers. Purchases need approval, which can be given in advance ([OpenAI](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs)) |
| **ChatGPT agent** | Websites and apps you sign it into, including email and files ([OpenAI](https://help.openai.com/en/articles/11752874-chatgpt-agent)) | Chats, browsing history and screenshots until you delete them, then up to 90 days ([OpenAI](https://help.openai.com/en/articles/11752874-chatgpt-agent)) | Confirms "high-impact actions"; you take over to log in ([OpenAI](https://help.openai.com/en/articles/11752874-chatgpt-agent)) |
| **Gemini Spark** (Google, paid plans) | Gmail, Calendar, and a Chrome browser with "all the same sites that you do, including sites you're signed into" ([Google](https://support.google.com/gemini/answer/16596215)) | 18 months by default; up to 3 years for chats a human reviewer saw ([Google](https://support.google.com/gemini/answer/13594961)) | Before sending, changing your data, buying, or submitting forms ([Google](https://support.google.com/gemini/answer/16596215)) |
| **Copilot Tasks** (Microsoft) | Websites, connected email and cloud storage, your files ([Microsoft](https://support.microsoft.com/en-us/microsoft-copilot/using-copilot-tasks)) | Screenshots for a limited time, not used for training; other activity may train Microsoft's AI unless you turn that off ([Microsoft](https://support.microsoft.com/en-us/microsoft-copilot/using-copilot-tasks)) | Before payments, messages to other people and account changes. Its terms make you "solely responsible" for what it does ([Microsoft](https://www.microsoft.com/en-us/microsoft-copilot/for-individuals/termsofuse)) |
| **Comet** (Perplexity's browser) | Your browser; it asks before connecting to services like Gmail ([Perplexity](https://www.perplexity.ai/help-center/comet/en/articles/12658082-control-what-comet-assistant-can-use)) | Browsing data stays on your device by default, unless you sync it to your Perplexity account; Perplexity's privacy notice says it uses data to improve its AI models ([Perplexity](https://www.perplexity.ai/hub/legal/privacy-policy)) | Before sending messages, changing your calendar or placing orders ([Perplexity](https://www.perplexity.ai/hub/blog/mitigating-prompt-injection-in-comet)) |
| **OpenClaw** (free, open source) | Runs on your own computer and connects to WhatsApp, iMessage, Slack, Telegram and more ([OpenClaw](https://raw.githubusercontent.com/openclaw/openclaw/main/README.md)) | Its memory and logins stay on your computer, but what it reads is sent to whichever AI model you plug in, unless that model runs on your computer too ([OpenClaw](https://raw.githubusercontent.com/openclaw/openclaw/main/README.md)) | Up to you. Its own docs warn to "Treat inbound messages as untrusted input" ([OpenClaw](https://raw.githubusercontent.com/openclaw/openclaw/main/README.md)) |

Two notes. OpenAI's Atlas browser was scheduled to stop working on August 9, 2026, with its agent features moving into ChatGPT ([OpenAI](https://help.openai.com/en/articles/6825453-chatgpt-release-notes)). Apple has announced an agent that changes weak passwords for you, but as of October 2026 its site says "Coming in a future software update" ([Apple](https://www.apple.com/apple-intelligence/)).

---

## The risk in one idea: anything it reads can give it orders

An agent reads things you didn't write: web pages, emails, calendar invites, shared documents. If one of them contains hidden instructions, the agent may follow them as if they came from you. This is called **prompt injection**. The attacker never touches your phone. They only have to put text where your agent will read it.

The companies building these agents say it isn't fixed:

- OpenAI: prompt injection "is unlikely to ever be fully 'solved'" ([OpenAI](https://openai.com/index/hardening-atlas-against-prompt-injection/)).
- Anthropic: "far from a solved problem, particularly as models take more real-world actions" ([Anthropic](https://www.anthropic.com/research/prompt-injection-defenses)).
- Google's Chrome security team: "the primary new threat facing all agentic browsers" ([Google](https://blog.google/security/architecting-security-for-agentic/)).
- Meta, about Muse: "Prompt injection remains an open problem in the industry" ([Meta](https://research.meta.ai/blog/security-and-safety-for-ai-agents-our-approach-with-muse)).
- Google warns that on Android, hidden instructions could make Gemini "place an order in the app without your confirmation" or "change your delivery address" ([Google](https://support.google.com/pixelphone/answer/16940971)).

**What it looks like in practice.** These were all found by security researchers or the companies themselves, and most were fixed before being published (Brave says the Comet issue below was not fully fixed). We found no confirmed case of an ordinary person's data being taken this way, but the demonstrations show what's possible:

- A hidden comment on a Reddit page made Perplexity's Comet browser fetch the user's email address and a one-time login code ([Brave](https://brave.com/blog/comet-prompt-injection/)).
- A flaw in Microsoft 365 Copilot let an attacker make it disclose information with no action from the victim (CVE-2025-32711, rated 9.3, critical, by Microsoft) ([NIST](https://nvd.nist.gov/vuln/detail/CVE-2025-32711)).
- A calendar invite with instructions in its title made Google's Gemini delete events when the user asked about their schedule, and a similar hidden instruction in an email made it leak email contents ([SafeBreach](https://www.safebreach.com/blog/invitation-is-all-you-need-hacking-gemini/)).
- In OpenAI's own testing, an email planted in an inbox made its agent send a resignation letter to the user's CEO when it was only asked to set an out-of-office reply ([OpenAI](https://openai.com/index/hardening-atlas-against-prompt-injection/)).

The practical lesson: the more an agent can read and do, the more a single bad email or web page can do through it.

---

## What "access" really means

The consent screen describes a key you're handing over. Read it literally.

- **"View your email messages and settings"** is Google's wording for read-only Gmail access, and Google classes it as restricted, meaning wide access ([Google](https://developers.google.com/workspace/gmail/api/auth/scopes)). Read-only still means every message, including password reset links and login codes.
- **"Maintain access to data you have given it access to"** on a Microsoft screen means the app keeps working in the background after you close it, until you remove it ([Microsoft](https://learn.microsoft.com/en-us/graph/permissions-reference)).
- **Removing access stops future access.** It doesn't delete what was already copied. OpenAI says this directly about dots ([OpenAI](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs)), and Google says removing a Sign in with Google link "doesn't delete your data on the app" ([Google](https://support.google.com/accounts/answer/13533235)).
- **On Android, be wary of an app asking for Accessibility access to "act for you".** Google warns that scammers push people to grant it, and that it can let a malicious app take control of the phone ([Google](https://blog.google/security/whats-new-in-android-security-privacy-2025/)). Google Play's rules ban apps from using it to "autonomously initiate, plan, and execute actions" unless they are verified disability tools ([Google Play](https://support.google.com/googleplay/android-developer/answer/10964491)).
- **On a Mac, be wary of Full Disk Access.** Apple says some apps have used it to expose "files, mail, messages, and even browsing history" and is tightening it because AI agents make the risk grow ([Apple](https://developer.apple.com/news/?id=p6zjojqw)).

---

## Letting an agent pay

Card networks are building ways for agents to pay with a stand-in token instead of your card number: Visa Intelligent Commerce and Mastercard Agent Pay. Visa describes limits such as a spending cap, the kinds of shops allowed, or required approvals, and Mastercard says you'll control what the agent may buy ([Visa](https://investor.visa.com/news/news-details/2026/Visa-Partners-with-OpenAI-to-Power-the-Next-Generation-of-AI-Commerce/default.aspx), [Mastercard](https://investor.mastercard.com/investor-news/investor-news-details/2025/Mastercard-Unveils-Agent-Pay-Pioneering-Agentic-Payments-Technology-to-Power-Commerce-in-the-Age-of-AI/default.aspx)). We couldn't find a consumer screen showing these limits yet, so check what your bank actually offers.

Things to know:

- **Approving in advance can count against you.** Google's agent payment design has you sign an instruction up front, and Google says that record provides "a clear foundation for accountability" ([Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/announcing-agents-to-payments-ap2-protocol)). If you pre-approve, a dispute may be harder to win.
- **A masked card number isn't a limit.** Google's virtual card numbers hide your real number, but your "credit line, balance, fees, and transaction info stay the same" ([Google](https://support.google.com/chrome/answer/11234179)). Look for a bank option that sets a spending limit or locks the number to one shop.
- **Use credit, not debit.** In the US, for a credit card, the FTC says the most you might owe for unauthorized charges is $50. For debit it can be far more ([FTC](https://consumer.ftc.gov/articles/lost-or-stolen-credit-atm-and-debit-cards)). Whether a purchase your own agent was tricked into making counts as "unauthorized" is not settled, so don't count on that protection.
- **Some agents use your saved card.** Amazon's Buy for Me "handles the entire purchase on your behalf using your primary address and credit card" ([Amazon](https://www.aboutamazon.com/news/retail/alexa-for-shopping-ai-assistant)).

---

## Before you say yes

- **Give the least access that does the job.** Read-only before read-and-send, one calendar before all of them, a few contacts before all of them (iPhone lets you pick: [Apple](https://support.apple.com/guide/iphone/control-access-to-contacts-iph9536aa9a5/ios)).
- **Keep it away from money, health and legal accounts.** Anthropic tells users not to point its browser agent at financial, legal or medical accounts ([Anthropic](https://support.claude.com/en/articles/12902428-use-claude-in-chrome-safely)).
- **Turn on approval for every action** where the app allows it, and read each confirmation before you tap yes.
- **Give narrow instructions.** OpenAI advises against prompts like "review my emails and take whatever action is needed" ([OpenAI](https://openai.com/index/hardening-atlas-against-prompt-injection/)).
- **Use a separate browser profile** for agent browsing, signed into as little as possible ([Anthropic](https://support.claude.com/en/articles/12902428-use-claude-in-chrome-safely)).
- **Check the training setting** and the retention period in the table above.
- **Never paste passwords into the chat.** Use the app's own login hand-off, where it pauses for you ([OpenAI](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs)).

---

## Already said yes? Take access back

- **Google:** go to [myaccount.google.com/linkedapps](https://myaccount.google.com/linkedapps), pick the app, and choose Remove access ([Google](https://support.google.com/accounts/answer/13533235)).
- **Microsoft (personal account):** go to account.live.com/consent/Manage and select "Remove these permissions" next to the app ([Microsoft](https://support.microsoft.com/en-us/onedrive/using-samsung-gallery-with-onedrive)). Work and school accounts are managed by your employer.
- **Apple (Sign in with Apple):** on iPhone, Settings > your name > Sign in with Apple, pick the app, and delete it ([Apple](https://support.apple.com/en-us/102571)).
- **iPhone app permissions:** Settings > Privacy & Security, then each category. The App Privacy Report there shows which apps used their permissions ([Apple](https://support.apple.com/guide/iphone/control-access-to-information-in-apps-iph251e92810/ios)).
- **Android app permissions:** Settings > Security & Privacy > Privacy > Permission manager. Menu names vary by phone maker ([Google](https://support.google.com/android/answer/9431959)).
- **Inside the agent:** delete its memory or the agent itself. For dots, OpenAI says deleting the dot is the way to delete its context ([OpenAI](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs)).

Then change any password the agent could have seen, starting with your email.

---

## FAQ

**Is it safe to let an AI agent read my email?**

It's a real risk, not a certain loss. Read-only access still covers every message, including login codes ([Google](https://developers.google.com/workspace/gmail/api/auth/scopes)), and the companies say hidden instructions in an email can still steer their agents ([OpenAI](https://openai.com/index/hardening-atlas-against-prompt-injection/)). If you try one, connect a secondary account first.

**Does removing an app's access delete my data?**

No. It stops new access. What the app already copied stays under its own policy. OpenAI says disconnecting an app from a dot doesn't delete what the dot already learned ([OpenAI](https://help.openai.com/en/articles/20001529-dots-privacy-security-and-safety-faqs)).

**What is prompt injection?**

Instructions hidden in something the AI reads, such as a web page, email or calendar invite, that it follows as if they came from you. OWASP ranks it the top risk for AI apps ([OWASP](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)).

**Who pays if my agent buys the wrong thing?**

Possibly you. Microsoft's terms make you "solely responsible" for actions Copilot takes on your behalf ([Microsoft](https://www.microsoft.com/en-us/microsoft-copilot/for-individuals/termsofuse)), and Anthropic says the same about its browser agent, including purchases ([Anthropic](https://support.claude.com/en/articles/12902428-use-claude-in-chrome-safely)). Expect this to be the norm, and pre-approved purchases may be treated as approved. Use a credit card with a low limit and keep approvals on.

**Is an open-source agent like OpenClaw safer?**

Its memory and logins stay on your own computer, but what it reads still goes to the AI model you connect, unless you run one locally. It can also be steered by what it reads, and its own documentation tells you to treat incoming messages as untrusted ([OpenClaw](https://raw.githubusercontent.com/openclaw/openclaw/main/README.md)). It also takes more technical skill to set up safely.
