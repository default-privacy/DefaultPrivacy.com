---
term: "Shadow AI"
slug: "shadow-ai"
definition: "The unauthorized use of AI tools by employees within an organization — uploading sensitive company data to ChatGPT, Gemini, or other AI services without IT approval or security review."
category: "AI & Automation"
relatedTerms:
  - "llm-privacy"
  - "chatbot-privacy"
  - "data-exfiltration"
  - "opsec"
aliases:
  - "Unauthorized AI"
  - "AI Shadow IT"
keywords:
  - "shadow AI risk"
  - "employees using ChatGPT"
  - "AI data leak company"
  - "unauthorized AI workplace"
---

Shadow AI is the 2025-2026 equivalent of shadow IT — except instead of employees using unauthorized Dropbox, they're pasting confidential data into AI chatbots.

## The Problem

Employees are using AI tools to:
- Summarize meeting notes containing confidential discussions
- Debug code that includes proprietary algorithms or API keys
- Draft emails using real customer data as context
- Analyze financial spreadsheets with sensitive numbers
- Generate legal documents from confidential templates

Every one of these actions sends company data to a third-party AI provider's servers.

## Scale of the Problem

- **91%** of AI tool usage in enterprises is on unapproved platforms (2025 surveys)
- **Samsung** banned ChatGPT after engineers pasted proprietary source code
- **Apple**, **Amazon**, **Goldman Sachs** — all restricted employee AI use after data incidents
- Most employees don't realize their input becomes training data (or at minimum, is stored and reviewed)

## Privacy Risks

- **Training data**: Some AI providers use inputs to train models — your trade secrets become part of a public model
- **Data retention**: Even "no training" plans still log and store conversations for abuse monitoring
- **Subpoena risk**: Data sent to US AI companies is subject to US law enforcement requests
- **Context leakage**: AI systems can leak information from one user's session to another
- **No deletion guarantee**: Once data is in an AI system, true deletion is technically difficult

## What Organizations Should Do

1. **Establish an AI acceptable use policy** — What tools are approved, what data can be shared
2. **Train employees** on what constitutes sensitive data
3. **Monitor AI tool usage** — DLP (Data Loss Prevention) tools that detect AI service access
4. **Provide approved alternatives** — If you don't give people a sanctioned AI tool, they'll use unsanctioned ones

## What Individuals Should Know

1. Anything you type into a free AI chatbot may be stored, reviewed, and used for training
2. Privacy-focused AI providers keep less, but check what each one can still see ([Private AI: What You Have to Trust](/guides/private-ai-what-you-have-to-trust))
3. If you wouldn't post it publicly, don't paste it into an AI chatbot

For what to use, see [How to use AI chatbots privately](/guides/how-to-use-ai-chatbots-privately).
