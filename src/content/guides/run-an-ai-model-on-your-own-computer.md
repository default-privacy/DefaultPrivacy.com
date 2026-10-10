---
title: "How to Run an AI Model on Your Own Computer (Jan, Ollama or LM Studio)"
slug: run-an-ai-model-on-your-own-computer
description: "Running a model on your own computer is the one way to use AI where you can check that your chats stay with you. Here is how to check your hardware, pick Jan, Ollama or LM Studio, install it, download a model, and prove it works offline. Based on each app's own documentation."
category: Privacy
difficulty: intermediate
timeToComplete: "30 minutes"
publishedAt: "2026-10-10"
updatedAt: "2026-10-10"
author: Default Privacy
tags:
  - local llm
  - private ai
  - jan
  - ollama
  - lm studio
  - offline ai
  - self-hosted ai
relatedGuides:
  - private-ai-what-you-have-to-trust
  - how-to-use-ai-chatbots-privately
  - privacy-where-to-start
relatedTools:
  - name: Jan
    href: /directory/jan-ai
  - name: Ollama
    href: /directory/ollama
  - name: LM Studio
    href: /directory/lm-studio
  - name: GPT4All
    href: /directory/gpt4all
---

**Last checked: October 2026** · Each claim links to the app's own documentation. Version numbers and menus change quickly in this field, so follow the linked page for current steps.

You install an app, download a model file, and chat with it on your own computer. The proof that it is local is simple: turn off your internet connection after the download and see if it still answers. This guide walks through that with Jan, Ollama or LM Studio.

For why local is the most private tier of AI, and what the other tiers ask you to trust, see [Private AI: What You Have to Trust](/guides/private-ai-what-you-have-to-trust).

---

## Step 1: Check your computer

Models are large, and the main limit is memory. Each app lists what it needs:

- **Jan on Windows:** Windows 10 or higher, a CPU with AVX2 support, 8 GB of memory minimum (16 GB recommended), and 10 GB of free disk space. A graphics card with 6 GB of video memory is the minimum for GPU acceleration ([Jan](https://jan.ai/docs/desktop/install/windows)).
- **LM Studio on Mac:** Apple Silicon (M1 or newer) and macOS 14 or newer. It recommends 16 GB or more, says 8 GB Macs may still work with smaller models, and says Intel Macs are not supported ([LM Studio](https://lmstudio.ai/docs/app/system-requirements)).
- **LM Studio on Windows:** x64 or ARM, AVX2 support for x64, at least 16 GB of memory recommended, and at least 4 GB of dedicated video memory recommended ([LM Studio](https://lmstudio.ai/docs/app/system-requirements)).
- **Ollama:** It runs on macOS, Windows and Linux ([Ollama](https://docs.ollama.com/quickstart)). See its [hardware support page](https://docs.ollama.com/gpu) for graphics cards.

If your computer is near the minimum, expect to use small models, and expect slower answers.

---

## Step 2: Pick an app

| App | What it is | Notes |
|---|---|---|
| [Jan](/directory/jan-ai) | A chat app with a model browser | Installs like any app. Downloads a default model on first launch ([Jan](https://jan.ai/docs/desktop/quickstart)) |
| [Ollama](/directory/ollama) | A command-line tool, with a desktop app | MIT-licensed ([Ollama on GitHub](https://github.com/ollama/ollama)) |
| [LM Studio](/directory/lm-studio) | A chat app with its own model search | Not open source. Works fully offline once you have a model ([LM Studio](https://lmstudio.ai/docs/app/system-requirements)) |

**If you are new,** start with Jan or LM Studio. Both are windowed apps where you click to chat. **If you are comfortable in a terminal,** Ollama is the simplest to script. [GPT4All](/directory/gpt4all) is another option.

---

## Step 3: Install it

Download the installer from the app's own site ([Jan](https://jan.ai/docs/desktop/quickstart); [Ollama](https://docs.ollama.com/quickstart); [LM Studio](https://lmstudio.ai/docs/app)) and run it.

Ollama's README also shows a one-line install command that downloads a script and runs it. It lists a manual download as an alternative ([Ollama on GitHub](https://github.com/ollama/ollama)). We prefer the manual download. A script piped straight into your shell runs whatever the server sends at that moment, and with the installer you can at least see what you are about to run.

---

## Step 4: Download a model

The model file is what actually answers you. Start small.

- **Jan:** It downloads a default model on first launch. Its Hub shows whether each model fits your hardware, so you can pick one your machine can run comfortably ([Jan](https://jan.ai/docs/desktop/quickstart)).
- **Ollama:** Run a model by name from the terminal. Its README shows `ollama run` followed by a model name, and points to its model library for the full list ([Ollama on GitHub](https://github.com/ollama/ollama)).
- **LM Studio:** Search for and download models inside the app. LM Studio says this contacts the company: it receives your IP address and anonymized search queries when you search or download ([LM Studio privacy policy](https://lmstudio.ai/app-privacy)).

**A caution on models.** A model is a large file from a third party. Download it from the app's own model browser or the model maker's official page, not from a link someone posted in a chat. We have not audited any model, and a model can say wrong or odd things like any other chatbot. Local does not mean accurate.

---

## Step 5: Keep it actually local

Local apps can still send things out if you let them. Check these:

1. **Don't sign in to cloud models.** Ollama's quickstart offers to sign you in to use cloud models, or to choose a local model ([Ollama](https://docs.ollama.com/quickstart)). Choose local. Ollama says its cloud models process your prompts, though it says they are not stored or logged ([Ollama FAQ](https://docs.ollama.com/faq)).
2. **Don't connect a cloud provider in Jan.** Jan runs models locally or in the cloud and lets you mix both, and says cloud models need to see your messages to work ([Jan](https://jan.ai/docs/desktop/quickstart); [Jan privacy](https://jan.ai/docs/desktop/privacy)).
3. **Choose your analytics at first launch.** Jan asks for your tracking preferences when it first opens and says you can change them in Settings ([Jan privacy](https://jan.ai/docs/desktop/privacy)).
4. **Know what still goes out.** LM Studio says that running models locally keeps your chats on your device, but update checks and model searches or downloads still contact the company ([LM Studio privacy policy](https://lmstudio.ai/app-privacy)).

### The offline test

Once a model is downloaded, turn off Wi-Fi or unplug the network cable, then ask the model a question. If it answers, it is running on your machine. LM Studio says it can operate entirely offline once you have model files ([LM Studio](https://lmstudio.ai/docs/app/system-requirements)). If an app refuses to answer offline, it is using a cloud model or a service you didn't intend.

---

## Step 6: Know where your chats are stored

Jan says it stores all of your data locally, including downloaded models, conversation threads and settings, and that nothing is sent to the cloud. On Windows the default folder is `AppData\Roaming\Jan\data` under your user profile ([Jan](https://jan.ai/docs/desktop/install/windows)).

Chats saved on your computer are only as private as your computer. If someone else can open your account or your disk, they can read them. Protect the device first: a strong login, a locked screen, and your system's disk encryption. Delete conversations you don't want to keep.

---

## What to expect

A local model on ordinary hardware is smaller than the models behind big hosted chatbots, so expect weaker answers on hard tasks and slower replies on older machines. That is the trade for keeping your prompts at home. For tasks that are too big for your machine, see the hosted options and what each asks you to trust in [Private AI: What You Have to Trust](/guides/private-ai-what-you-have-to-trust).

---

## FAQ

**Is a local AI model really private?**

The model runs on your computer, so your chats don't have to leave it. Jan and LM Studio both document this ([Jan](https://jan.ai/docs/desktop/privacy); [LM Studio](https://lmstudio.ai/app-privacy)). Apps still contact their makers for updates and model downloads, so read each app's privacy page, and use the offline test to check.

**Which is easiest for a beginner?**

Jan or LM Studio. Both install like normal apps and have a chat window. Jan downloads a default model on first launch ([Jan](https://jan.ai/docs/desktop/quickstart)).

**Do I need a graphics card?**

Jan lists 8 GB of memory as its Windows minimum and gives a separate video-memory figure for graphics cards ([Jan](https://jan.ai/docs/desktop/install/windows)). LM Studio recommends 4 GB of dedicated video memory on Windows ([LM Studio](https://lmstudio.ai/docs/app/system-requirements)). Our reading: a graphics card speeds things up and helps with bigger models, but the minimums above are about memory. Check the app's page for your system.

**Can I use it offline?**

Yes, once the model is downloaded. LM Studio says it can operate entirely offline ([LM Studio](https://lmstudio.ai/docs/app/system-requirements)).

**Is Ollama or LM Studio better?**

They suit different people. Ollama is MIT-licensed and works from the terminal ([Ollama on GitHub](https://github.com/ollama/ollama)). LM Studio is a windowed app whose own terms say its source code is not public ([LM Studio terms](https://lmstudio.ai/app-terms)).

**What can a local model not do?**

It cannot match the biggest hosted models on difficult tasks if your computer is small. It also does not make anything you paste safe from your own device being compromised. See our [threat model guide](/guides/how-to-build-your-threat-model) to decide how much protection you need.
