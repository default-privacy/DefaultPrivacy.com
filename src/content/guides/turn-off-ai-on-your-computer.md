---
title: "Turn Off the AI Your Computer and Browser Switched On"
slug: turn-off-ai-on-your-computer
description: "Windows 11, Microsoft 365, macOS, Chrome, Edge and Gmail have added AI features that arrive switched on or installed by updates. Here is where each switch lives, what each feature sends off your computer, and which settings are only documented for Windows Pro."
category: Privacy
difficulty: beginner
timeToComplete: "15 minutes"
publishedAt: "2026-10-11"
updatedAt: "2026-10-11"
author: Default Privacy
tags:
  - ai settings
  - copilot
  - recall
  - apple intelligence
  - gemini in chrome
  - firefox ai controls
  - gmail smart features
  - windows 11
relatedGuides:
  - private-browsers-compared
  - how-to-use-ai-chatbots-privately
  - switch-to-linux-for-privacy
  - run-an-ai-model-on-your-own-computer
---

**Last checked: October 2026** · Setting names below are what each company's own pages said when we checked them, with a link to each page. Dates shown are each page's own updated date, where it gives one. Menus change with updates, and we could not test every version.

AI has been added to Windows, Office, macOS, your browser and your email. Some arrived through ordinary updates. Some is on until you find the switch. This guide lists the switches.

For phones, see [Turn Off the AI Your Phone Switched On](/guides/turn-off-ai-on-your-phone).

**If you only do three things:**

1. **Check what your browser sends.** In Chrome, hide AI Mode, and if you tried Gemini, turn off "Media understanding" and tab sharing. In Edge, hide the Copilot button and turn off "Allow Copilot to use browser content". In Firefox, turn on "Block AI enhancements".
2. **Turn off Gmail's smart features** if you live outside the European Economic Area, the UK, Switzerland or Japan. Google lists them as off by default only in those places.
3. **On Windows, uninstall the Copilot app** if you don't use it. On a Mac, turn off the summary and Writing Tools features you don't want.

Two terms: **on device** means the AI runs on your computer and your data stays there. **Cloud** means your data goes to the company's servers.

---

## Windows 11

### The Copilot app

Microsoft pushed its Copilot app to Windows PCs through updates starting in late 2024. Its admin page says the app "is automatically enabled after you install the Windows updates" unless a business policy blocked it ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/manage-windows-copilot), page updated August 18, 2026).

**To remove it:** Settings > Apps > Installed apps, find Copilot, click the three dots next to it, then "Uninstall". Microsoft's page writes this step for business users, but it is the standard way to uninstall any Windows app ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/manage-windows-copilot)).

Two things to know:

- **The name is moving.** Microsoft renamed the Microsoft 365 Copilot app (the old Office hub) to "Microsoft Copilot" and is merging it with the Copilot app. Broad rollout to business customers began in September 2026 ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/deploy-unified-copilot-app), page updated August 18, 2026). We could not find a consumer timeline from Microsoft. So the app called Copilot on your PC may be the one that used to open Word and Excel. Microsoft only describes the uninstall step for the older Copilot app. We could not confirm that the merged app uninstalls the same way.
- **Old advice no longer works.** Many older guides tell you to use a setting called "Turn off Windows Copilot" (TurnOffWindowsCopilot). Microsoft now marks it "deprecated" and says it "isn't for the new Copilot experience" ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-windowsai), page updated September 23, 2026). Skip it.

**Does Copilot train on your chats?** Microsoft's answer changed with the app update of August 18, 2026, and its pages describe the two versions differently:

- Microsoft's older privacy FAQ covers the app before that update. Its banner sends web users and anyone on the updated app to the newer page, so the web version follows the new rules. The FAQ said conversations are used to train Microsoft's AI models by default for signed-in adults, with exceptions (including under-18s and users in some countries), and that you can opt out ([Microsoft](https://support.microsoft.com/en-us/topic/privacy-faq-for-microsoft-copilot-27b3a435-8dc9-4b55-9a4b-58eeb9647a7f)). It says conversation activity is stored for 18 months by default.
- Microsoft's page for the updated app says "Prompts, responses, and your file contents when using the Microsoft Copilot app aren't used to train foundation models" ([Microsoft](https://support.microsoft.com/en-us/privacy/microsoft-copilot/activity-history)). Its controls page lists "Saved memories", "One shared experience" and "Allow ads personalization" under Settings > Personalization, along with a "Web search" toggle ([Microsoft](https://support.microsoft.com/en-us/privacy/microsoft-copilot/privacy-controls)).

If your app hasn't updated, Microsoft's page for the older app says to click your profile icon, then Settings > Privacy, and turn off "Training on conversation activity" and "Training on voice conversations" ([Microsoft](https://support.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-privacy-controls)). The same page says this does not stop your chats being used for other product improvements or for advertising.

### The Copilot key

Pressing the Copilot key on newer keyboards (or Win+C) opens Copilot ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/manage-windows-copilot)).

**To change what it does:** Settings > Personalization > Text input > "Customize Copilot key on keyboard". You can set it to "Search", or choose "Custom" and pick from the apps listed ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/manage-windows-copilot)).

### Recall (Copilot+ PCs only)

**Recall** takes regular screenshots ("snapshots") of your screen so you can search what you've seen later. It only exists on Copilot+ PCs, a class of newer Windows PCs with a dedicated AI chip.

**Is it on?** Saving snapshots is opt-in. Microsoft says that if you don't opt in, "it will be off by default and snapshots will not be saved" ([Microsoft](https://support.microsoft.com/en-us/windows/privacy-and-control-over-your-recall-experience-d404f672-7647-41e5-886c-a3c59680af15)). But the feature itself is installed: on a home PC "Recall is available by default but a user has to opt in to save snapshots" ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/manage-recall)).

**To stop it and delete snapshots:** Settings > Privacy & security > Recall & snapshots. Turn "Save snapshots" off. You can delete existing snapshots on the same page ([Microsoft](https://support.microsoft.com/en-us/windows/privacy-and-control-over-your-recall-experience-d404f672-7647-41e5-886c-a3c59680af15)).

**To remove it completely:** open "Turn Windows features on or off" (type it into the Start menu search), uncheck Recall ([Microsoft](https://support.microsoft.com/en-us/windows/privacy-and-control-over-your-recall-experience-d404f672-7647-41e5-886c-a3c59680af15)). Microsoft's admin page says "Removing Recall requires a device restart" ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/manage-recall)).

**Where the data goes:** Microsoft says snapshots stay on your PC: "Snapshots aren't sent to Microsoft." The same page notes that Recall fetches website icons and details from the internet, and some diagnostic data may be sent depending on your Windows diagnostic settings ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/manage-recall)).

Microsoft changed Recall before release. In June 2024 it made saving snapshots opt-in and required Windows Hello (face or fingerprint sign-in) ([Microsoft](https://blogs.windows.com/windowsexperience/2024/06/07/update-on-the-recall-preview-feature-for-copilot-pcs/)). In September 2024 it let users remove Recall and described how snapshots are encrypted ([Microsoft](https://blogs.windows.com/windowsexperience/2024/09/27/update-on-recall-security-and-privacy-architecture/)).

### Click to Do (Copilot+ PCs)

**Click to Do** looks at what's on your screen and offers actions, such as summarizing text or searching for an image. It opens with Win+Q or Win+click. Microsoft says "By default, Click to Do is enabled for Copilot+ PCs" ([Microsoft](https://support.microsoft.com/en-us/windows/click-to-do-do-more-with-what-s-on-your-screen-6848b7d5-7fb0-4c43-b08a-443d6d3f5955)).

**To turn it off:** Settings > Privacy & security > Click to Do, set to Off ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/manage-click-to-do), updated December 15, 2025). You can also turn off single actions at Settings > Apps > Actions.

**What leaves your PC:** Microsoft says the screen analysis runs on your computer. Content is sent out only if you pick an action like "Search the web" or "Visual search with Bing" ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/manage-click-to-do)).

### Windows Home vs Pro

Microsoft documents extra off switches as "policies", set with a tool called Group Policy Editor. These cover Recall, the Copilot key, and the AI tools in Paint (Cocreator, Image Creator and generative fill). Microsoft's own tables list these policies for Windows Pro and up. **Windows 11 Home is not listed** ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/mdm/policy-csp-windowsai)). On Home, use the Settings paths above. Microsoft doesn't document a registry route for these on Home, so we don't suggest one.

---

## Microsoft 365 home plans (Word, Excel, PowerPoint)

In January 2025 Microsoft added Copilot to Microsoft 365 Personal and Family in most markets and raised the US price by $3 a month at your next renewal ([Microsoft](https://www.microsoft.com/en-us/microsoft-365/blog/2025/01/16/copilot-is-now-included-in-microsoft-365-personal-and-family/)). In the same post, Microsoft says it does not use your prompts, responses or file content in these apps to train its foundation models.

**To turn it off in each app (Windows):** File > Options > Copilot, then clear "Enable Copilot". Then close and restart the app. This works in Word, Excel, PowerPoint and OneNote on recent versions ([Microsoft](https://support.microsoft.com/en-us/office/turn-off-copilot-in-microsoft-365-apps-bc7e530b-152d-4123-8e78-edc06f8b85f1)).

**On a Mac:** open the app's menu > Preferences > Authoring and Proofing Tools > Copilot, then clear "Enable Copilot". Microsoft lists this for Word, Excel and PowerPoint; OneNote's switch is on Windows only ([Microsoft](https://support.microsoft.com/en-us/office/turn-off-copilot-in-microsoft-365-apps-bc7e530b-152d-4123-8e78-edc06f8b85f1)).

**In Outlook**, turn off "Turn on Copilot": Settings > Copilot in new Outlook for Windows and on the web, or Quick Settings > Copilot on Mac, iPhone and Android. One change covers all your devices. Classic Outlook for Windows doesn't have this switch yet. These switches only apply when you sign in with a personal Microsoft account. You can't turn off Copilot in the phone or web versions of Word, Excel or PowerPoint ([Microsoft](https://support.microsoft.com/en-us/office/turn-off-copilot-in-microsoft-365-apps-bc7e530b-152d-4123-8e78-edc06f8b85f1)).

**If you don't want to pay for AI:** in January 2025, Microsoft said existing subscribers with recurring billing could switch to Microsoft 365 Basic, "or, for a limited time, to new Personal Classic or Family Classic plans" ([Microsoft](https://www.microsoft.com/en-us/microsoft-365/blog/2025/01/16/copilot-is-now-included-in-microsoft-365-personal-and-family/)). Microsoft's support page says to switch at account.microsoft.com/services, then "Manage", then "Cancel subscription", and follow the prompts ([Microsoft](https://support.microsoft.com/topic/58342e83-38e7-4cda-b63b-88604a8fb7ef)). The same page says Basic is 100 GB of cloud storage and doesn't include the installed Word, Excel and PowerPoint apps. It gives no end date for Classic. We could not confirm the Classic plans are still offered in October 2026.

---

## Mac

Apple Intelligence, Apple's AI system, comes with macOS updates. Apple says the newest version "is automatically available on eligible devices when you update to the 27.0 software releases" in supported languages and regions (Macs with M1 or later, and MacBook Neo) ([Apple](https://support.apple.com/en-us/121115)).

**Where it runs:** Apple says many tasks run on your Mac. Harder ones go to Apple's servers, which it calls Private Cloud Compute, and Apple says that data "is not stored or made accessible to Apple". To see what was sent, go to System Settings > Privacy & Security > "Apple Intelligence Report" ([Apple](https://support.apple.com/guide/mac-help/apple-intelligence-and-privacy-mchlfc0d4779/mac)).

**On macOS 26 (Tahoe):** one switch. System Settings > Apple Intelligence & Siri, then the same button next to "Apple Intelligence" that turns it on ([Apple](https://support.apple.com/guide/mac-help/aside/glosf3340584/26/mac/26)).

**On macOS 27:** Apple's "Turn off and restrict access" guide lists separate switches, one per feature ([Apple](https://support.apple.com/guide/mac-help/turn-restrict-access-apple-intelligence-mchlb2e44f94/mac)):

- Siri AI (beta): System Settings > Siri > "Turn Off Siri". You can turn Siri back on as "Siri Classic".
- Messages > Settings > "Summarize Messages"
- Mail > Settings > Viewing > "Summarize Message Previews"
- Mail > Settings > Composing > "Personalize Smart Replies"
- System Settings > Notifications > "Summarize Notifications"
- Phone > Settings > Calls > "Suggestions in Voicemail"
- Journal > Settings > General > "Get Writing Prompts"

Apple's macOS 27 guide does not list a single Apple Intelligence off switch. We could not confirm whether one exists in macOS 27.

**To block Writing Tools and image tools:** Apple's macOS 26 guide gives this Screen Time path: System Settings > Screen Time > Content & Privacy, turn on "Content & Privacy restrictions", then "Intelligence & Siri". Turn off "Writing Tools", "Image Creation" and "Intelligence Extensions" (the last one covers ChatGPT) ([Apple](https://support.apple.com/guide/mac-help/mchlb2e44f94/26.0/mac/26.0)). On macOS 27, Apple's Siri restrictions guide gives this path: System Settings > Screen Time > Content & Privacy Restrictions > Siri. Set "Allowed Siri Version" to "Siri Classic" or "Don't Allow Siri", and set capabilities such as "Writing Assistance" to "Blocked" ([Apple](https://support.apple.com/guide/mac-help/change-siri-restrictions-settings-screen-z25xrnykpuln/27/mac/27)). Apple's own macOS 27 ChatGPT page names this area "Intelligence & Siri" instead, so the labels on your Mac may differ.

**ChatGPT:** the ChatGPT extension stays off unless you set it up. If you did, turn it off at System Settings > Siri > ChatGPT > "Use ChatGPT" (or, with Siri AI, Extensions > ChatGPT > "Use Extension") ([Apple](https://support.apple.com/guide/mac-help/turn-on-chatgpt-mchlfc5cf131/mac)).

---

## Browsers

### Chrome

**Gemini in Chrome** is opt-in: you have to agree the first time you use it, and it only works when you're signed in ([Google](https://support.google.com/chrome/answer/16283624?hl=en)). Once on, it adds itself to the Windows system tray or Mac menu bar. Its settings are at More (three dots) > Settings > "AI innovations" > "Gemini in Chrome". There you can turn off "Share current tab by default" and the tray or menu bar shortcut. Right-click the top bar and choose "Unpin Gemini" to remove the button.

One part is on by default. Google says "Media understanding", which lets Gemini answer questions about audio and video you've played, "is on by default". Turn it off at chrome://settings/ai/gemini ([Google](https://support.google.com/chrome/answer/16283624?hl=en)).

**What Gemini keeps:** Gemini in Chrome reads the page and web address of your current tab and any tabs you share ([Google](https://support.google.com/gemini/answer/13594961?hl=en)). With Gemini's "Keep Activity" setting on, Google uses your activity to improve its services, "including training generative AI models", and human reviewers may read some of it. Reviewed chats are kept for up to 3 years, separated from your account. Activity auto-deletes after 18 months by default. With Keep Activity off, Google says chats are still kept for 72 hours and aren't used for training unless you send feedback. To turn it off, open Gemini Apps Activity in your Google Account and turn off Keep Activity. Google says chats can still be reviewed for safety, including by people, with it off.

**AI Mode button:** Chrome may show an AI Mode button in the address bar. To hide it, right-click the address bar and unselect "Always show AI Mode". This hides AI Mode and "Add tabs and more" from the address bar. AI Mode stays on the New Tab page ([Google](https://support.google.com/chrome/answer/16704170?hl=en)).

**On-device AI models (disk space, your choice):** Chrome "may download on-device Generative AI models in the background", and needs about 20 GB of free space for them. These models run on your computer, and Google says data is processed locally. Turning them off is not a privacy fix. It frees disk space, but Google says features that use the models stop working, which can include scam warnings. If you still want them gone, go to More > Settings > "AI Innovations" > "On-device AI". Google says turning it off deletes the models and stops new downloads ([Google](https://support.google.com/chrome/answer/16961953?hl=en)).

### Edge

**To hide the Copilot button:** Edge Settings > Appearance > Other appearance settings > "Copilot and sidebar" > Copilot, then turn off "Show Copilot button on the toolbar". On the same page, turn off "Allow Copilot to use browser content" ([Microsoft](https://learn.microsoft.com/en-us/microsoft-edge/privacy-whitepaper/), updated August 31, 2026).

Microsoft says that for every Copilot question, Edge sends your question, the page address, the page title and your earlier conversation. With that permission on, it can send the full page for public pages that are in Bing's index, and Microsoft says "Page content isn't stored." History is kept "until you choose to delete it" (Microsoft Privacy Dashboard > Browsing and search > Copilot activity history > Clear all).

**"Rewrite with Copilot"** pops up in text boxes on websites. Turn it off at Settings > Languages > Writing assistance, then turn off "Draft with Microsoft 365 Copilot as you write on the web" ([Microsoft](https://learn.microsoft.com/en-us/microsoft-edge/privacy-whitepaper/)).

**Copilot Mode**, where Copilot browses for you, is "a fully opt-in feature", according to Microsoft's 2025 announcement ([Microsoft](https://blogs.windows.com/msedgedev/2025/07/28/introducing-copilot-mode-in-edge-a-new-way-to-browse-the-web/)). The post doesn't give the settings path, and we could not confirm it.

### Firefox

Firefox has the simplest answer: one switch. Since Firefox 148, go to Settings > "AI Controls" and turn on "Block AI enhancements". Mozilla says this blocks current and future AI features and their pop-ups, and removes downloaded on-device models. It also blocks Firefox's built-in page translation. You can set any single feature, such as Translations, back to Available. Each feature can be set to Available, Enabled or Blocked. Extensions you install can still use outside AI services ([Mozilla](https://web.archive.org/web/20260613231843/https://support.mozilla.org/en-US/kb/firefox-ai-controls), archived copy, June 13, 2026, of an article last updated February 6, 2026).

### Brave

Brave's assistant is called **Leo**. Brave's privacy policy says it collects no identifiers like your IP address for Leo, does not store your prompts or responses on its servers, and does not train on your conversations. Chat history is kept on your computer, and in Brave Sync if you turn that on. You can turn history off or delete chats at brave://settings/leo-ai ([Brave](https://brave.com/privacy/browser/), policy updated September 23, 2026). We could not confirm the setting that hides or fully disables Leo.

### Opera

Opera's assistant is called **Opera AI**. Opera says chats are stored encrypted on its servers for one year if you're signed in, or six hours if you aren't. OpenAI keeps anonymized parts of chats for 30 days. Opera says it does not train models on your chats or the pages you browse ([Opera](https://help.opera.com/en/latest/browser-ai/)). We could not confirm how to remove the AI button or sidebar on desktop.

---

## Gmail and Google smart features

Gmail's "smart features" include Smart Compose, inbox categories and Gemini summaries. Google lists them as off by default only if you live in the European Economic Area, Japan, Switzerland or the UK, so expect them on elsewhere, including the US. Google also says: "When smart features are on, your data may be used to improve these features" ([Google](https://support.google.com/mail/answer/10079371?hl=en)).

There are now three switches. On a computer:

1. Gmail > Settings > See all settings > General > "Smart features". Uncheck "Turn on smart features in Gmail, Chat, and Meet". This also turns off the Primary, Social and Promotions tabs, Smart Compose, Smart Reply and summary cards.
2. On the same page, under "Google Workspace smart features", click "Manage Workspace smart feature settings".
3. Turn off "Smart features in Google Workspace" and "Smart features in other Google products", then Save.

Google says the changes apply on all your devices, but also that some changes made on a computer don't show up in the phone app, so check the Gmail app too ([Google](https://support.google.com/mail/answer/10079371?hl=en)).

**Gemini in Gmail** (the "Ask Gemini" button) is a separate thing. For personal accounts, Google says it "requires an eligible Google Workspace or Google AI plan" ([Google](https://support.google.com/mail/answer/14199860?hl=en)). The only other route Google names is its Workspace Experiments tester program.

---

## Want less AI to manage?

Any of these switches can move with the next update. Two ways out: [switch to Linux](/guides/switch-to-linux-for-privacy), where most distributions don't ship a built-in AI assistant, or [run an AI model on your own computer](/guides/run-an-ai-model-on-your-own-computer) so your text stays there.

---

## FAQ

**How do I turn off Copilot in Windows 11?**

Uninstall the app: Settings > Apps > Installed apps, the three dots next to Copilot, then "Uninstall" ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/manage-windows-copilot)). Then remap the Copilot key at Settings > Personalization > Text input.

**Is Recall on by default?**

Saving snapshots is off until you opt in. The feature itself is installed on Copilot+ PCs. To remove it, open "Turn Windows features on or off" and uncheck Recall ([Microsoft](https://support.microsoft.com/en-us/windows/privacy-and-control-over-your-recall-experience-d404f672-7647-41e5-886c-a3c59680af15)), then restart ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/manage-recall)).

**How do I turn off Copilot in Word?**

On Windows, File > Options > Copilot, then clear "Enable Copilot". On a Mac, Word > Preferences > Authoring and Proofing Tools > Copilot ([Microsoft](https://support.microsoft.com/en-us/office/turn-off-copilot-in-microsoft-365-apps-bc7e530b-152d-4123-8e78-edc06f8b85f1)). Repeat in Excel, PowerPoint and OneNote (OneNote on Windows only).

**How do I turn off Gemini in Chrome?**

It's off until you opt in. If you tried it, go to Settings > "AI innovations" > "Gemini in Chrome", turn off the tray shortcut and tab sharing, and unpin it. Also turn off "Media understanding", which is on by default ([Google](https://support.google.com/chrome/answer/16283624?hl=en)). Chrome's separate "On-device AI" models run on your computer, and Google says data is processed locally. Deleting them frees disk space but also turns off features like scam warnings ([Google](https://support.google.com/chrome/answer/16961953?hl=en)).

**Which browser makes AI easiest to turn off?**

Of the browsers here, Firefox makes it easiest: one "Block AI enhancements" switch that also covers future features. It also blocks page translation, which you can set back to Available ([Mozilla](https://web.archive.org/web/20260613231843/https://support.mozilla.org/en-US/kb/firefox-ai-controls), archived copy, June 13, 2026). Brave's Leo is present but Brave says it doesn't store or train on your chats ([Brave](https://brave.com/privacy/browser/)).

**Will updates turn it back on?**

They can. The Copilot app itself arrived through a Windows update ([Microsoft](https://learn.microsoft.com/en-us/windows/client-management/manage-windows-copilot)), and Apple Intelligence is automatically available after macOS updates in supported languages and regions ([Apple](https://support.apple.com/en-us/121115)). Check these settings after each major update. Firefox's switch is the one that says it covers future AI features too.
