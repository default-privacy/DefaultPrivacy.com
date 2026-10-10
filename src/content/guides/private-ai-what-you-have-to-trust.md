---
title: "Private AI: What You Have to Trust, Tier by Tier"
slug: private-ai-what-you-have-to-trust
description: "Not all private AI is private the same way. This guide sorts the options into four tiers by what you have to trust: running a model on your own device, a hosted service with a no-logs promise, a hosted service that proves it with hardware, and decentralized networks. Each claim is attributed to the provider's own documents."
category: Privacy
difficulty: intermediate
timeToComplete: "15 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - private ai
  - local llm
  - confidential computing
  - ai privacy
  - jan
  - ollama
  - lm studio
  - venice
  - near ai
  - duck.ai
  - lumo
  - bittensor
relatedGuides:
  - run-an-ai-model-on-your-own-computer
  - how-to-use-ai-chatbots-privately
  - how-to-build-your-threat-model
  - privacy-where-to-start
relatedTools:
  - name: Jan
    href: /directory/jan-ai
  - name: Ollama
    href: /directory/ollama
  - name: GPT4All
    href: /directory/gpt4all
  - name: Venice
    href: /directory/venice
  - name: Lumo
    href: /directory/lumo
  - name: LM Studio
    href: /directory/lm-studio
  - name: NEAR AI Cloud
    href: /directory/near-ai-cloud
  - name: Tinfoil
    href: /directory/tinfoil
  - name: DuckDuckGo
    href: /directory/duckduckgo
---

**Last checked: October 2026** · Everything below is what each provider says about itself, with a link. We have not run independent tests on these services, and this field changes quickly, so check the linked pages before you rely on one.

Private AI comes in four tiers, and they differ in what you have to trust. On your own device you trust only your computer. On a hosted service with a no-logs promise you trust the company's word. On a service that proves its privacy with hardware you trust the hardware and the proof. On a decentralized network you trust whoever runs the node, unless the app on top says otherwise.

Pick the tier that matches what you are typing. For the basics on the big chatbots, start with [How to Use AI Chatbots Privately](/guides/how-to-use-ai-chatbots-privately).

**A disclosure.** Default Privacy uses Venice's API for the AI grading step of its email security check, as our [privacy page](/privacy) lists. We have no affiliate relationship with any service in this guide, and no links here earn us anything.

---

## Tier 1: Run it on your own device

The model and your chats stay on your computer. This is the only tier you can check yourself.

- **Jan** says that local models keep everything on your device, and that cloud models you connect (like GPT or Claude) need to see your messages to work. Product analytics are optional: you choose your tracking preferences at first launch, and Jan says it does not log prompts or monitor conversations ([Jan](https://jan.ai/docs/desktop/privacy)). See [Jan](/directory/jan-ai).
- **Ollama** says it runs locally and does not see your prompts or data when you run locally. Its separate cloud-hosted models are different: Ollama says it processes those prompts to provide the service but does not store or log them and never trains on them ([Ollama FAQ](https://docs.ollama.com/faq)). See [Ollama](/directory/ollama).
- **LM Studio** says that if you download and run models locally, none of your messages, chat histories or documents are transmitted from your system. The app still contacts the company when it checks for updates and when you search for or download models, and it says it processes your IP address, app version and anonymized search queries in those cases ([LM Studio privacy policy](https://lmstudio.ai/app-privacy)). See [LM Studio](/directory/lm-studio).
- **GPT4All** is another local option in our directory ([GPT4All](/directory/gpt4all)).

**To set one up,** see [How to run an AI model on your own computer](/guides/run-an-ai-model-on-your-own-computer).

**What you give up.** A model that runs on your computer is limited by your computer. Larger models need more memory, so on ordinary hardware expect smaller models than a hosted service offers. Check a model's requirements on its page before you download it.

**A habit that applies at every tier:** "local" describes where the model runs, not what the app around it does. Read the privacy page for update checks, model downloads and any optional analytics, as shown above.

---

## Tier 2: Hosted, with a promise not to keep your data

You send your prompt to a company's servers. Privacy depends on the company doing what it says. These services say the following:

- **Duck.ai** (DuckDuckGo) says it does not record or store your chats by default and that neither DuckDuckGo nor the underlying model providers use them for training. It says it removes metadata such as your IP address before the request reaches a model provider, so requests appear to come from DuckDuckGo. It says its model providers agree to delete prompts and responses immediately after replying, not to train on them and not to share the data for their own commercial purposes. It lists limited, documented exceptions to those terms, and it names Anthropic, OpenAI, Mistral, Azure and Tinfoil as providers ([DuckDuckGo Help](https://duckduckgo.com/duckduckgo-help-pages/duckai/ai-chat-privacy)). Read that exceptions table before you decide.
- **Lumo** (Proton) says it runs open-source models on servers Proton controls, so your data is not stored on a third-party platform, and that its code is open source. Proton's Lumo privacy page lists a no-logs policy, zero-access encrypted chat history, no data sharing, no training and European jurisdiction ([Proton](https://proton.me/support/lumo-privacy)). See [Lumo](/directory/lumo).
- **Venice, "Private" mode.** Venice says its default mode runs on Venice-controlled GPUs or zero-data-retention partner infrastructure, with privacy enforced by contractual commitments and no prompt or response stored. Venice itself describes this mode as trust-based, because it relies on Venice and its partners honoring those contracts ([Venice](https://venice.ai/privacy)). See [Venice](/directory/venice).
- **Venice, "Anonymous" mode.** In this mode Venice proxies your request to a frontier model provider. Venice says your identity is hidden from the provider, but you should assume the provider sees your prompt and likely saves it ([Venice](https://venice.ai/privacy)). This protects who you are, not what you wrote.

**The question for this tier:** do you trust the company's word, and does it say what it keeps? A good privacy page names its exceptions. Look for them.

---

## Tier 3: Hosted, with a hardware proof

Some services run your prompt inside a **trusted execution environment**, a sealed area of the processor that the machine's operator can't look into, and let you check a signed proof of what ran. See [confidential computing](/glossary/confidential-computing) and [secure enclave](/glossary/secure-enclave) in our glossary.

- **NEAR AI Cloud** says its open-weight models run inside an Intel TDX and NVIDIA confidential-GPU enclave. It says your prompts are sent over TLS and only decrypted inside the enclave, and that the hardware produces a signed attestation quote tying the exact model and code that ran. It says you can check this yourself, in code or with its open verifier ([NEAR AI](https://near.ai/)). See [NEAR AI Cloud](/directory/near-ai-cloud).
- **Tinfoil** describes itself as a security research lab building an AI cloud for private, verifiable computation. It offers a private chat, an OpenAI-compatible inference API it calls open source and verifiable, and containers that run in a secure enclave ([Tinfoil](https://tinfoil.sh/)). See [Tinfoil](/directory/tinfoil).
- **Venice, "TEE" and "E2EE" modes.** Venice says these Pro modes run inside hardware-isolated enclaves operated by external partners, which it names as NEAR AI Cloud and Phala Network, and that this is verified by remote attestation. In E2EE mode your prompt is encrypted on your device and decrypted only inside a verified enclave. Venice lists the trade-offs: slower responses and fewer models ([Venice](https://venice.ai/privacy)).

**Our reading, not the providers':** an attestation shows which code ran on which hardware. It does not remove trust. You still rely on the chip maker, on the verification being done correctly, and on the provider's software being what it claims. Tinfoil's own site mentions a security audit and a webinar on TEE vulnerabilities, a sign that this is an active research area and not a closed question ([Tinfoil](https://tinfoil.sh/)). Compare this with Tier 2: you move from "believe the promise" to "check a proof", which is a real improvement, but not zero trust.

---

## Tier 4: Decentralized networks

**Bittensor** describes itself as an open network where independent subnets produce digital commodities, including compute and inference, and where the chain pays contributors in its token, TAO. Miners produce the commodity, validators score them, and stakers back validators ([Bittensor docs](https://docs.learnbittensor.org/)). The Bittensor pages we read say nothing about keeping prompts private. In a network of independent operators, privacy depends on the specific subnet and the app built on it, so ask that app what it promises and how you can verify it.

This is the least settled tier. "Decentralized" does not mean "private". It means no single company runs it, which can help against one company being compelled to hand over data, and can hurt if many strangers can see the traffic.

---

## Choosing a tier

| What you are typing | Reasonable tier |
|---|---|
| Passwords, keys, client files, medical or legal details | Tier 1, or don't paste it |
| Personal questions and drafts you wouldn't want leaked | Tier 1 or 3 |
| Everyday questions and summaries | Tier 2 is fine for many people |
| Anything about a named third party | Tier 1, and mind their privacy too |

Ask any provider five questions: Where does my prompt run? Who can read it there? How long is it kept? Is it used to train models? How can I check any of this myself? A provider that can't answer the fifth is asking for trust, and that's fine, as long as you know that's what you are giving.

---

## FAQ

**What is the most private way to use AI?**

Running a model on your own device, because nothing leaves your computer except update and download traffic, which providers like LM Studio document ([LM Studio](https://lmstudio.ai/app-privacy)). It costs you model size and speed.

**Is a "no-logs" AI service really private?**

It is private to the extent that you trust the company to do what it says. Venice calls its own default mode trust-based ([Venice](https://venice.ai/privacy)). Look for a named list of exceptions, as Duck.ai publishes ([DuckDuckGo Help](https://duckduckgo.com/duckduckgo-help-pages/duckai/ai-chat-privacy)).

**What does it mean when an AI service uses a TEE?**

Your prompt is processed inside a sealed part of the hardware that the operator can't read, and the service can prove what code ran there. NEAR AI Cloud describes this approach ([NEAR AI](https://near.ai/)). See our glossary for [confidential computing](/glossary/confidential-computing).

**Is a decentralized AI network private?**

Not by default. Bittensor's documentation describes how contributors are paid, not how prompts are kept private ([Bittensor docs](https://docs.learnbittensor.org/)). Ask the specific app what it protects.

**Does an AI service seeing my IP address matter?**

It can. Duck.ai says it removes metadata such as your IP address before calling model providers ([DuckDuckGo Help](https://duckduckgo.com/duckduckgo-help-pages/duckai/ai-chat-privacy)), and Venice's Anonymous mode hides your identity from the model provider but not the prompt ([Venice](https://venice.ai/privacy)).

**Where should I start?**

If you are new to this, begin with [How to Use AI Chatbots Privately](/guides/how-to-use-ai-chatbots-privately) for settings and habits, then try a local app like Jan or Ollama for anything sensitive. To decide how much protection you need, see [how to build your threat model](/guides/how-to-build-your-threat-model).
