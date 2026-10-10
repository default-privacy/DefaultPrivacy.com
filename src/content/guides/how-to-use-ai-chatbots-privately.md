---
title: "How to Use AI Chatbots Privately"
slug: how-to-use-ai-chatbots-privately
description: "Most big AI chatbots keep your conversations, and several use them to train their models unless you change a setting. Here is what ChatGPT, Claude, Gemini, Copilot and Meta AI keep, the settings to change, what never to paste, and how to run a model on your own computer."
category: Privacy
difficulty: beginner
timeToComplete: "14 minutes"
publishedAt: "2026-10-09"
updatedAt: "2026-10-09"
author: Default Privacy
tags:
  - ai chatbots
  - chatgpt
  - claude
  - gemini
  - copilot
  - meta ai
  - temporary chat
  - local ai
  - ai privacy
relatedGuides:
  - how-to-build-your-threat-model
  - privacy-where-to-start
relatedTools:
  - name: Jan.ai
    href: /directory/jan-ai
  - name: GPT4All
    href: /directory/gpt4all
  - name: PrivateLLM
    href: /directory/privatellm
  - name: Venice
    href: /directory/venice
  - name: DuckDuckGo
    href: /directory/duckduckgo
  - name: Proton
    href: /directory/proton
  - name: Brave Browser
    href: /directory/brave-browser
  - name: Use Default Privacy in your AI
    href: /ai
---

**Last checked: October 2026** · Each claim links to the provider's own policy or help page, or to the developer's own site.

Most big AI chatbots keep your conversations, and several use them to train their models unless you switch that off. Each service below has settings to change and most have a temporary or incognito mode, but those modes still let the company keep a copy for a while and review chats it flags. For anything you wouldn't want on someone else's server, leave it out of the chat or run a model on your own device.

AI privacy was the least-answered topic on the former Techlore privacy forum: 16 of its 17 help questions on it never got an accepted answer. This guide covers what people kept asking.

---

## What the big five keep by default

As of October 2026, from each provider's own pages:

| Service | Used to train AI? | Read by people? | How long chats are kept | Private mode |
|---|---|---|---|---|
| ChatGPT | Yes, unless you opt out ([OpenAI](https://openai.com/policies/how-your-data-is-used-to-improve-model-performance/)) | Authorized staff and service providers may access chats, including to improve models unless you opted out ([OpenAI](https://help.openai.com/en/articles/7039943-data-usage-for-consumer-services-faq)) | Until you delete them, then removed within 30 days unless already de-identified and separated from your account, or kept for security or legal reasons ([OpenAI](https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt)) | Temporary chat: not used for training, a copy kept up to 30 days ([OpenAI](https://help.openai.com/en/articles/8914046-temporary-chat-faq)) |
| Claude | If you allow it, which Anthropic asks you to choose ([Anthropic](https://www.anthropic.com/news/updates-to-our-consumer-terms)), plus chats flagged for safety review ([Anthropic](https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training)) | Not by default, except feedback you send and chats reviewed under its Usage Policy ([Anthropic](https://privacy.claude.com/en/articles/10458704-how-does-anthropic-protect-the-personal-data-of-claude-users)) | Deleted chats leave back-end storage within 30 days; up to 5 years, de-identified, if you allow training ([Anthropic](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data)) | Incognito chat: not used for training, kept 30 days ([Anthropic](https://support.claude.com/en/articles/12260368-using-incognito-chats)) |
| Gemini | Yes, while Keep Activity is on, the default for adults ([Google](https://support.google.com/gemini/answer/13278892?hl=en)) | A subset of chats, by human reviewers including Google's service providers ([Google](https://support.google.com/gemini/answer/13594961?hl=en#human_review)) | 18 months by default; chats a reviewer read, up to 3 years even after you delete them ([Google](https://support.google.com/gemini/answer/13594961?hl=en#pn_retain_data)) | Temporary chat: not used for training, kept 72 hours ([Google](https://support.google.com/gemini/answer/13594961?hl=en#retention)) |
| Copilot | New app (August 18, 2026): Microsoft says prompts, responses and files aren't used to train foundation models ([Microsoft](https://support.microsoft.com/en-us/privacy/microsoft-copilot/activity-history)). Older app: yes, unless you opt out, except in a few countries ([Microsoft](https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot)) | New app: not stated on its privacy pages ([Microsoft](https://support.microsoft.com/en-us/privacy/microsoft-copilot/overview)). Older app: some chats, with no opt-out ([Microsoft](https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot)) | New app: not stated on its privacy pages ([Microsoft](https://support.microsoft.com/en-us/privacy/microsoft-copilot/overview)). Older app: 18 months by default ([Microsoft](https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot)) | New app: none among its listed privacy controls ([Microsoft](https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls)) |
| Meta AI | Yes: Meta uses your AI chats to improve AI at Meta ([Meta](https://www.meta.com/help/artificial-intelligence/delete-metaai-website-history/)) | Meta may review chats, automatically or by people ([Meta AI Terms](https://www.facebook.com/legal/ai-terms)) | No period given; the terms say its AIs "will sometimes retain and use" what you share ([Meta AI Terms](https://www.facebook.com/legal/ai-terms)) | On WhatsApp: Incognito chat with Meta AI, which Meta says isn't stored ([WhatsApp](https://faq.whatsapp.com/2089630958184255)) |

---

## Settings to change on each

### ChatGPT

- **Stop training.** Go to Settings > Data controls and turn off **Improve the model for everyone**. It applies to new conversations, and to every device you're signed in on ([OpenAI](https://help.openai.com/en/articles/7730893-data-controls-faq)).
- **Skip the thumbs.** If you rate an answer up or down, OpenAI may use that whole conversation for training even after you opt out ([OpenAI](https://help.openai.com/en/articles/7730893-data-controls-faq)).
- **Use Temporary chat** for one-off questions: open a new chat and select **Temporary**. It stays out of your history and doesn't create memories ([OpenAI](https://help.openai.com/en/articles/8914046-temporary-chat-faq)).
- **Check memory** under Settings > Personalization ([OpenAI](https://help.openai.com/en/articles/7039943-data-usage-for-consumer-services-faq)).
- **Ads.** Ads may appear on the Free and Go plans. OpenAI says it doesn't share your conversations with advertisers. You can turn off ad personalization under Settings > Ad Controls, and Temporary chats show no ads ([OpenAI](https://help.openai.com/en/articles/20001047-ads-in-chatgpt)).

Deleting a chat has limits. OpenAI's privacy policy says it may keep data longer when the law requires it, for example under a subpoena ([OpenAI](https://openai.com/policies/privacy-policy/#retention)).

### Claude

- **Stop training.** Go to Settings > Privacy and turn off **Help improve our AI models**. Chats already used stay in models already trained, and chats its safety systems flag can still be used for its safety work ([Anthropic](https://privacy.claude.com/en/articles/12109829-how-do-i-change-my-model-improvement-privacy-settings)).
- **Skip the thumbs.** Rating a response stores the whole conversation for up to 5 years ([Anthropic](https://privacy.claude.com/en/articles/10023580-is-my-data-used-for-model-training)).
- **Use Incognito chat:** click the ghost icon when you start a chat outside a project. It isn't saved to your history or memory and isn't used for training ([Anthropic](https://support.claude.com/en/articles/12260368-using-incognito-chats)).
- **Skip memory for one chat** by turning off Memory in the "+" menu before your first message. The chat stays in your history ([Anthropic](https://support.claude.com/en/articles/12260368-using-incognito-chats)).

Chats its automated systems flag under the Usage Policy are kept up to 2 years ([Anthropic](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data)).

### Gemini

- **Turn off Keep Activity** at gemini.google.com > Settings & help > Activity. Google still keeps your chats with your account for up to 72 hours ([Google](https://support.google.com/gemini/answer/13278892?hl=en)).
- **Or shorten auto-delete.** If you keep it on, you can delete activity after 3 months instead of 18 ([Google](https://support.google.com/gemini/answer/13278892?hl=en)).
- **Use Temporary chat**, next to New chat. It can't use Gems, Connected Apps or personalization ([Google](https://support.google.com/gemini/answer/13275745?hl=en)).
- **Leave audio training off.** Your audio and Gemini Live video and screen shares aren't used to improve Google's services unless you turn that on ([Google](https://support.google.com/gemini/answer/13278892?hl=en)).
- **Check your other Google settings.** Changing Gemini's settings doesn't change Web & App Activity or Location History ([Google](https://support.google.com/gemini/answer/13594961?hl=en#pn_config_settings)).

Google says Gemini chats are not used to show you ads, and that it will tell you if that changes ([Google](https://support.google.com/gemini/answer/13594961?hl=en#ads)).

### Copilot

Microsoft released a new Copilot app on August 18, 2026, and its privacy pages differ by version ([Microsoft](https://support.microsoft.com/en-us/privacy/microsoft-copilot/overview)).

- **New app.** Under Settings > Personalization, turn off **Saved memories** (then delete old ones under Manage), **One shared experience**, which lets your Copilot chats personalize Bing, Edge and MSN, and **Allow ads personalization**. Without a Microsoft 365 subscription you may see ads, and personalized ads can draw on your chat history and saved memories ([Microsoft](https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls)).
- **Older app.** Open your profile, then Privacy (Settings > Privacy in the Windows and macOS apps, Account > Privacy in the mobile app), and turn off **Training on conversation activity** and **Training on voice conversations**. That covers future chats only, and doesn't stop their use for advertising, safety, security and compliance ([Microsoft](https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls)).

### Meta AI

- **Make it forget.** In a chat with Meta AI on Messenger, Instagram or WhatsApp, type `/reset-ai` to delete the AI's copy of that chat, or `/reset-all-ais` for every AI chat in that app. Deleting a chat in WhatsApp deletes it only on WhatsApp; these commands delete Meta's copy ([Meta](https://www.facebook.com/privacy/dialog/change-or-delete-ai-chat-info/)).
- **In the Meta AI app**, go to Menu > Settings > Data & privacy > Manage your information > Delete all chats and media. This doesn't remove public vibes; use **Remove all public vibes** on the same screen ([Meta](https://www.meta.com/help/artificial-intelligence/delete-metaai-website-history/)).
- **Ads.** Since December 16, 2025, in most regions, Meta uses your AI chats to personalize the posts and ads you see ([Meta](https://www.meta.com/help/artificial-intelligence/delete-metaai-website-history/)). You can adjust this in Ads Preferences. Meta says it doesn't use topics such as religion, health or sexual orientation from those chats for ads, and that WhatsApp chats feed your other Meta accounts only if WhatsApp is in the same Accounts Center ([Meta](https://about.fb.com/news/2025/10/improving-your-recommendations-apps-ai-meta/)).
- **Public posts.** AI videos you make public in the Meta AI or Vibes apps show in their feeds and on your public profile until you remove them ([Meta](https://www.meta.com/help/artificial-intelligence/delete-metaai-website-history/)).

---

## What never to paste

The providers say it themselves. OpenAI asks you not to enter sensitive information you wouldn't want reviewed or used ([OpenAI](https://help.openai.com/en/articles/7039943-data-usage-for-consumer-services-faq)). Google says not to enter anything confidential you wouldn't want a reviewer to see ([Google](https://support.google.com/gemini/answer/13594961?hl=en#pn_data_usage)). Meta says not to share what you don't want its AIs to use and keep ([Meta AI Terms](https://www.facebook.com/legal/ai-terms)).

- **Passwords, recovery codes and two-factor codes.** Anthropic lists passwords and login credentials ([Anthropic](https://support.claude.com/en/articles/8325621-i-would-like-to-input-sensitive-data-into-my-chats-with-claude-who-can-view-my-conversations)), and Google says not to enter login or payment details into Gemini chats ([Google](https://support.google.com/gemini/answer/13594961?hl=en#mydata_screen_automation)).
- **ID and account numbers**: Social Security numbers, card numbers and bank account details ([Anthropic](https://support.claude.com/en/articles/8325621-i-would-like-to-input-sensitive-data-into-my-chats-with-claude-who-can-view-my-conversations)).
- **Health records** ([Anthropic](https://support.claude.com/en/articles/8325621-i-would-like-to-input-sensitive-data-into-my-chats-with-claude-who-can-view-my-conversations)), and details that reveal your race, religion, sexual orientation or health ([Microsoft](https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot)).
- **Other people's private details**, such as a friend's diagnosis or a relative's legal case. Meta's terms forbid prompts that violate someone else's privacy ([Meta AI Terms](https://www.facebook.com/legal/ai-terms)), and Microsoft asks you not to share images of others without their consent ([Microsoft](https://support.microsoft.com/en-us/microsoft-copilot/privacy-faq-for-microsoft-copilot)).
- **Work secrets**: confidential business documents ([Anthropic](https://support.claude.com/en/articles/8325621-i-would-like-to-input-sensitive-data-into-my-chats-with-claude-who-can-view-my-conversations)). Check your employer's policy before using a chatbot for work.
- **Screenshots you haven't checked.** A screenshot holds everything on screen. Google notes that screenshots Gemini takes while using your apps can include any information visible in the app ([Google](https://support.google.com/gemini/answer/13594961?hl=en#mydata_screen_automation)).

If you need help with a document, swap names and numbers for placeholders like "Person A" before you paste it.

---

## Run a model on your own computer

A local model runs on your own hardware, so your prompts stay on your device once the model is downloaded. Three apps in our directory:

- **[Jan](/directory/jan-ai)** runs on Windows, macOS and Linux ([GitHub](https://github.com/janhq/jan)). Its privacy policy says Jan runs "100% offline" and your conversations stay on your computer ([Jan](https://jan.ai/privacy)). It can also connect to online models from OpenAI, Anthropic and others ([GitHub](https://github.com/janhq/jan)); if you pick one, your prompts go to that company.
- **[GPT4All](/directory/gpt4all)** runs open models on ordinary desktops and laptops with no API calls ([GPT4All docs](https://docs.gpt4all.io/)). Its code is open source under the MIT license ([GitHub](https://github.com/nomic-ai/gpt4all)). Its latest release, 3.10.0, came out in February 2025, and it hasn't had one since ([GitHub](https://github.com/nomic-ai/gpt4all/releases)).
- **[PrivateLLM](/directory/privatellm)** runs models on iPhone, iPad and Mac. Its developer says conversations never leave the device, there's no account, and it needs no internet after the first model download. It's a one-time purchase ([Private LLM](https://privatellm.app/en)).

[Ollama](https://ollama.com/) also runs open models locally. Its site offers cloud models too, so check which kind you're using.

**What you need.** GPT4All's minimum is 16 GB of memory, or 8 GB on a Windows or Linux PC if you stick to small 3B models. It recommends a graphics card with 8 GB of its own memory but doesn't need one ([GPT4All docs](https://docs.gpt4all.io/)). It doesn't run on Windows or Linux PCs with ARM processors, and on a Mac it needs an M1 chip or newer ([GPT4All](https://github.com/nomic-ai/gpt4all/blob/main/gpt4all-chat/system_requirements.md)).

Local apps save your chats on your computer, so the device itself needs a screen lock and disk encryption.

---

## Services that say they don't keep your chats

Some hosted services promise not to keep or train on your chats. What each says, as of October 2026:

- **[Venice](/directory/venice).** Your history stays on your device, and requests pass through Venice's proxy without being stored. Its default Private mode runs on Venice's own GPUs or zero-retention partners, which Venice itself describes as "trust-based". Its Anonymous mode sends prompts to models such as GPT, Claude and Gemini, and Venice says to assume those providers store them. Pro plans add TEE and end-to-end encrypted modes that run in hardware-isolated environments checked by remote attestation ([Venice](https://venice.ai/privacy)).
- **Duck.ai** from [DuckDuckGo](/directory/duckduckgo). It removes your IP address and other identifying metadata before sending prompts to model providers, whose agreements bar training on them and require deletion within 30 days, with exceptions for safety and legal compliance. Recent chats are saved on your device ([DuckDuckGo](https://duckduckgo.com/duckai/privacy-terms)).
- **Lumo** from [Proton](/directory/proton). Proton says it keeps no logs, stores chat history with zero-access encryption, runs open models on its own servers and doesn't train on your chats ([Proton](https://proton.me/support/lumo-privacy)).
- **Leo** in [Brave](/directory/brave-browser). Brave says it doesn't collect your IP address, doesn't store prompts or responses on its servers beyond caching large prompts for minutes, and doesn't train on conversations. History stays on your device ([Brave](https://brave.com/privacy/browser/#brave-leo)).

These are each company's own descriptions. Apple put the problem plainly: when a cloud AI service says it doesn't log your data, "there is generally no way for security researchers to verify this promise" ([Apple Security Research](https://security.apple.com/blog/private-cloud-compute/)). Hardware-attested modes like Venice's are meant to make the promise checkable. A local model avoids the question.

---

## Assistants on your phone and in your browser

**iPhone, iPad and Mac.** Apple Intelligence runs on your device, and sends more complex requests to Apple's Private Cloud Compute servers ([Apple Security Research](https://security.apple.com/blog/private-cloud-compute/)). Apple says data processed there isn't stored or made accessible to Apple. You can see a log of these requests by turning on Settings > Privacy & Security > Apple Intelligence & PCC Report ([Apple](https://www.apple.com/legal/privacy/data/en/intelligence-engine/)).

The ChatGPT extension asks before it sends anything unless you turn that off, and hides your IP address from OpenAI, though your general location is still sent. Without a ChatGPT account, Apple says OpenAI must not train on your request, or store it unless the law requires it. Once you sign in, your ChatGPT settings apply. To turn it off, go to Settings > Siri > ChatGPT and turn off Use ChatGPT ([Apple](https://support.apple.com/guide/iphone/turn-on-chatgpt-iph00fd3c8c2/ios)).

**Android.** Where Gemini is your phone's assistant, it can activate by mistake on a noise that sounds like "Hey Google", and audio recording may begin a few seconds before activation. Keep Activity decides what's saved ([Google](https://support.google.com/gemini/answer/13594961?hl=en#keep_activity_setting)). Gemini always collects your general location, from your IP address or the home and work addresses in your Google Account ([Google](https://support.google.com/gemini/answer/13594961?hl=en#location_info)).

**WhatsApp.** You can't fully switch Meta AI off. WhatsApp calls it optional, meaning you don't have to use it, and its help page describes no setting that removes it. Meta says it can read only messages that mention @Meta AI or that someone shares with Meta AI, and your other chats stay end-to-end encrypted ([WhatsApp](https://faq.whatsapp.com/2257017191175152)). Message summaries and writing help run on Meta's Private Processing, and you can opt out of them in Settings. In a group, an admin can turn on Restricted chat to stop others using these features ([WhatsApp](https://faq.whatsapp.com/2089630958184255)).

**Browsers.** Gemini in Chrome collects the page content and address of the tab you're on and any tabs you share with it ([Google](https://support.google.com/gemini/answer/13594961?hl=en#chrome_data)). In Microsoft's new Copilot app, One shared experience uses your Copilot chats to personalize Bing, Edge and MSN ([Microsoft](https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls)). Brave's Leo is covered above.

---

## Get sourced answers about privacy tools

You can connect an AI assistant to the Default Privacy directory. It uses MCP (Model Context Protocol), an open standard that lets assistants such as Claude and ChatGPT connect to outside tools ([MCP](https://modelcontextprotocol.io/docs/getting-started/intro)). Add the address from [our setup page](/ai), and when you ask about privacy tools, your assistant can look them up in the directory and answer with each tool's score and a link to its listing. It's free and needs no account or key.

Our tools ask your assistant only for what the lookup needs, such as a product name. We don't store it. Your IP is held in memory for up to a day to enforce rate limits, and our host keeps its own request logs ([setup page](/ai)).

---

## FAQ

**Does ChatGPT use my conversations to train its models?**

Yes, unless you turn off Improve the model for everyone under Settings > Data controls ([OpenAI](https://help.openai.com/en/articles/7730893-data-controls-faq)). Temporary chats aren't used for training ([OpenAI](https://help.openai.com/en/articles/8914046-temporary-chat-faq)). If you rate an answer, OpenAI may use that whole conversation for training even after you opt out ([OpenAI](https://help.openai.com/en/articles/7730893-data-controls-faq)).

**Is a temporary or incognito chat fully private?**

No. It keeps the chat out of your history and out of training, but the company keeps a copy for a while: up to 30 days at OpenAI ([OpenAI](https://help.openai.com/en/articles/8914046-temporary-chat-faq)), 30 days at Anthropic ([Anthropic](https://support.claude.com/en/articles/12260368-using-incognito-chats)) and 72 hours at Google. Google says it still uses these chats to protect its users, with help from human reviewers ([Google](https://support.google.com/gemini/answer/13594961?hl=en#retention)).

**If I delete a chat, is it gone?**

From your screen, right away. OpenAI removes deleted chats from its systems within 30 days, unless they were already de-identified and separated from your account, or it must keep them for security or legal reasons ([OpenAI](https://help.openai.com/en/articles/8983778-chat-and-file-retention-policies-in-chatgpt)). Anthropic removes them within 30 days, but keeps de-identified copies for up to 5 years if you allowed training ([Anthropic](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data)). Google keeps chats a human reviewer read for up to three years, even after you delete your activity ([Google](https://support.google.com/gemini/answer/13594961?hl=en#pn_retain_data)). Chats already used in training stay in models already trained ([Anthropic](https://privacy.claude.com/en/articles/10023548-how-long-do-you-store-my-data)).

**Can I turn off Meta AI in WhatsApp?**

Not completely. WhatsApp calls Meta AI optional, meaning you don't have to use it, but its help page describes no setting that removes it. Meta says it reads only messages that mention @Meta AI or that someone shares with it ([WhatsApp](https://faq.whatsapp.com/2257017191175152)). You can opt out of message summaries and writing help in Settings, and Restricted chat stops others in a chat from using those features ([WhatsApp](https://faq.whatsapp.com/2089630958184255)). To delete Meta's copy of your chats with its AI, type `/reset-all-ais` in a chat with Meta AI ([Meta](https://www.facebook.com/privacy/dialog/change-or-delete-ai-chat-info/)).

**Do I need a graphics card to run AI on my own computer?**

No, but it helps. GPT4All runs without one ([GPT4All docs](https://docs.gpt4all.io/)). It needs at least 16 GB of memory, or 8 GB on a Windows or Linux PC for small 3B models, and doesn't run on Windows or Linux PCs with ARM processors ([GPT4All](https://github.com/nomic-ai/gpt4all/blob/main/gpt4all-chat/system_requirements.md)). On iPhone, iPad and Mac, PrivateLLM runs models on the device itself ([Private LLM](https://privatellm.app/en)).

**Which AI chatbot is the most private?**

One that runs on your own device, with no cloud models switched on, because your prompts don't leave it ([Apple Security Research](https://security.apple.com/blog/private-cloud-compute/)). Hosted services can promise not to keep your chats, but you usually can't check that promise from outside. Hardware-attested modes are meant to change that ([Apple Security Research](https://security.apple.com/blog/private-cloud-compute/)).

**Is it safe to paste medical records or work documents into a chatbot?**

The providers urge caution. Anthropic recommends being thoughtful about sharing health records and confidential business documents ([Anthropic](https://support.claude.com/en/articles/8325621-i-would-like-to-input-sensitive-data-into-my-chats-with-claude-who-can-view-my-conversations)), and Google says not to enter anything confidential you wouldn't want a reviewer to see ([Google](https://support.google.com/gemini/answer/13594961?hl=en#pn_data_usage)). Use a local model, or replace names and numbers with placeholders first.

**How can I get an AI assistant to answer privacy-tool questions with sources?**

Point your assistant at `https://mcp.defaultprivacy.com`, or follow the steps on [our setup page](/ai). It works with any assistant that accepts a remote MCP server address, and needs no account ([setup page](/ai)).

---

## Keep reading

- [Use Default Privacy in your AI](/ai)
- [How to build your threat model](/guides/how-to-build-your-threat-model)
- [Where to start with privacy](/guides/privacy-where-to-start)
