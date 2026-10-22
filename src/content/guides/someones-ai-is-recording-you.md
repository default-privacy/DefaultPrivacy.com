---
title: "Someone's AI Is Recording You: Meeting Bots, AI Scribes and Smart Glasses"
slug: someones-ai-is-recording-you
description: "You don't have to use AI to be recorded by it. Meeting bots join calls from other people's calendars, doctors' offices use AI scribes that listen to the visit, and smart glasses record from what look like ordinary frames. Here is how to spot each one, what happens to the recording, what the law says about consent, and what to say when you want to opt out."
category: Privacy
difficulty: beginner
timeToComplete: "12 minutes"
publishedAt: "2026-10-10"
updatedAt: "2026-10-10"
author: Default Privacy
tags:
  - ai recording
  - meeting bots
  - ai notetakers
  - ai scribes
  - smart glasses
  - recording consent
  - otter
  - meta ray-ban
relatedGuides:
  - how-to-use-ai-chatbots-privately
  - before-you-connect-an-ai-agent-or-mcp-server
  - how-to-build-your-threat-model
  - privacy-where-to-start
relatedTools:
  - name: Breach check
    href: /breach-check
---

**Last checked: October 2026** · Product claims below are what each company's own pages say, with a link. Court cases are allegations unless a ruling is named. This is not legal advice: recording law differs by state and country, so talk to a lawyer about a real dispute.

You can avoid AI apps yourself and still be recorded by one. It happens in three places: video calls, the doctor's office, and other people's glasses and pins. One question covers all three:

**Is this being recorded, where does the recording go, and can I say no?**

The answer is usually: yes, it may be; to a company you didn't pick; and often you can, if you ask.

---

## The Short Answer

Yes, an AI can record you even if you avoid AI apps. Ask whether this is being recorded, where it goes, and whether you can say no.

1. On a call, check the participant list. Desktop recorders don't show up there, so ask.
2. To remove an Otter bot, anyone can type "stop otter" in the chat. A host can remove any bot.
3. At the doctor, ask whether anything will record or transcribe the visit. You can usually decline the AI scribe.
4. Around smart glasses, treat the light as a hint, not proof. Ask "Are those recording?"
5. If anyone on a call is in a stricter recording-law state, assume everyone must agree.

## Meeting bots

### How a bot gets into your call

Most AI notetakers join from their owner's calendar, not because the host invited them.

- **Otter** can join Zoom, Google Meet and Teams meetings automatically once its user connects a calendar and turns on auto-join. One auto-join choice, "Meetings with a video link", sends it into any meeting on that calendar, including ones its user didn't organize. Its user can also send it to a meeting they don't attend ([Otter](https://help.otter.ai/hc/en-us/articles/4425393298327-Otter-Notetaker-Overview), [Otter](https://help.otter.ai/hc/en-us/articles/13674910923671-Automatically-add-Otter-Notetaker-to-your-meetings)).
- **Fireflies** is set to join "All meetings" by default ([Fireflies](https://guide.fireflies.ai/articles/8587670572-how-to-disable-the-fireflies-auto-join-settings)).
- **Read.ai** warns its own users: "even if you have Read disabled, other people in your meeting could still have it enabled from their account" ([Read.ai](https://support.read.ai/hc/en-us/articles/10568150023059-What-meetings-does-Read-join-when-I-connect-my-calendar)).

The built-in assistants are spreading too. From September 21, 2026, Google turns automatic note-taking on by default in Meet for Business Standard and Business Plus customers, in meetings with 3 or more guests, including the host. Admins and users can turn it off ([Google Workspace](https://knowledge.workspace.google.com/admin/meet/upcoming-changes-to-automatic-note-taking)). Zoom's AI can now join Teams and Meet calls from its user's calendar if the admin allows it ([Zoom](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0080357)).

### How to spot one

- **Look at the participant list.** Otter shows up as "[Name]'s Notetaker (Otter.ai)" and says it can't join without appearing to others ([Otter](https://help.otter.ai/hc/en-us/articles/4425393298327-Otter-Notetaker-Overview)). Fireflies appears as "Fireflies.ai Notetaker" ([Fireflies](https://guide.fireflies.ai/articles/4335268657-how-to-invite-fireflies-to-meetings)).
- **Look for the built-in signs.** Google Meet shows a pencil icon to everyone when notes are being taken ([Google](https://support.google.com/meet/answer/14754931)). Zoom changes the color of its AI icon when AI features are on ([Zoom](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0058013)). Teams tells everyone when transcription starts ([Microsoft](https://support.microsoft.com/en-us/teams/meetings/start-stop-and-download-live-transcripts-in-microsoft-teams-meetings)). Microsoft's page on using Copilot without transcription doesn't describe a notice to other attendees ([Microsoft](https://support.microsoft.com/en-us/teams/copilot/use-copilot-without-transcribing-or-recording-a-teams-meeting-or-call)).
- **Know the blind spot.** Otter and Read.ai also offer desktop or phone recorders that capture the call from the user's own device. Read.ai says that in this mode it "does not appear in the participant list, because there is no AI agent in the call" ([Read.ai](https://support.read.ai/hc/en-us/articles/52118970003987-How-Consent-Works-on-Web-Mode-vs-Desktop-Mode-Read-AI), [Otter](https://help.otter.ai/hc/en-us/articles/35973988280215-Otter-Desktop-App-Mac-Windows)). You can't see these from inside the call. You can only ask.

### How to remove one

- **Otter:** anyone in the meeting, even without an Otter account, can type "stop otter" in the chat ([Otter](https://help.otter.ai/hc/en-us/articles/14288936562199-Remove-Otter-Notetaker-from-your-meeting-Zoom-Google-Meet-or-Microsoft-Teams)).
- **Read.ai:** if Read has posted a notice in the chat, type "Opt Out". Read says it then leaves and deletes what it measured. If Read posted an opt-out link, use the link instead ([Read.ai](https://support.read.ai/hc/en-us/articles/41296196476051-How-to-Turn-Off-Read-AI)).
- **Any bot:** the host can remove it like any other participant.

### If you host the meeting

- **Google Meet:** set access to Trusted or Restricted and untick the ask-to-join box ("Anyone with the meeting link can ask to join" under Trusted, "Anyone can ask to join, including people who dial in" under Restricted). Google says bots that try to ask to join are then denied automatically ([Google](https://support.google.com/a/users/answer/11989526)).
- **Teams:** by default, bots Teams detects are held in the lobby until an organizer (and, depending on the meeting settings, a presenter) lets them in. Microsoft says some bots won't be detected. It suggests letting only organizers and co-organizers admit people from the lobby ([Microsoft](https://learn.microsoft.com/en-us/microsoftteams/manage-external-bots)).
- **Zoom:** use the waiting room and "Require authentication to join" ([Zoom](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0059359), [Zoom](https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0063837)). Zoom's pages don't say these settings stop AI notetakers, so watch the participant list anyway.

### What happens to the recording

It depends on the company. Otter's privacy policy says it trains its AI "on de-identified audio recordings and on transcriptions (which may contain Personal Information)" and keeps data "for as long as necessary" ([Otter](https://otter.ai/privacy-policy)). Fireflies says it does not use personal information to train AI models ([Fireflies](https://fireflies.ai/privacy-policy)). Zoom's terms say it doesn't use your audio, video or chat to train its own or other companies' AI models ([Zoom](https://www.zoom.com/en/trust/terms/)).

**The Otter lawsuit.** In *In re Otter.AI Privacy Litigation* (federal court, Northern District of California), plaintiffs allege Otter's bot recorded meetings without everyone's consent and kept the recordings to train its models. On August 13, 2026, the judge let the main wiretap and privacy claims go forward, finding the complaint plausibly alleges Otter acts as a third-party eavesdropper because it keeps and uses recordings for its own purposes. That is a ruling on what is alleged, not a finding that Otter did it. Otter denies most of the claims, and the case is in its early stages ([court order](https://storage.courtlistener.com/recap/gov.uscourts.cand.454675/gov.uscourts.cand.454675.68.0.pdf), [Otter's answer](https://storage.courtlistener.com/recap/gov.uscourts.cand.454675/gov.uscourts.cand.454675.80.0.pdf)).

---

## AI scribes at the doctor

### What it is

An "ambient" AI scribe listens to your visit and drafts the doctor's notes. Microsoft describes its Dragon Copilot as a tool that "records patient encounters" and turns the conversation into draft documentation that the clinician reviews ([Microsoft](https://learn.microsoft.com/en-us/industry/healthcare/dragon-copilot/whitepapers/privacy)). The signed note goes into your medical record. The vendor's copy of the audio is deleted on a schedule set by your health system (see the table).

### What happens to the audio

It depends on your health system's contract, not just the vendor. Four systems using the same product, Abridge, say very different things:

| Health system | What it says about the audio |
|---|---|
| UChicago Medicine | Deleted "often on the same day", never kept more than a week ([UChicago](https://www.uchicagomedicine.org/forefront/patient-care-articles/2025/january/ai-ambient-clinical-documentation-what-to-know)) |
| UC Davis Health | Deleted after 30 days ([UC Davis](https://health.ucdavis.edu/patients-visitors/about-patient-care/quality-safety/clinical-note-taking-technology)) |
| US Department of Veterans Affairs | Kept 30 days, not used for training ([VA](https://department.va.gov/privacy/wp-content/uploads/sites/5/2026/07/FY26AbridgeAmbientScribePIA.pdf)) |
| Equitas Health | Audio kept up to one year, transcripts up to 4 years, and may be used to train AI ([Equitas](https://equitashealth.com/abridge/)) |

Microsoft keeps Dragon Copilot audio and transcripts for up to 90 days, uses anonymized copies to train its AI, and says anonymized copies made before you withdraw consent are not deleted when you do ([Microsoft](https://learn.microsoft.com/en-us/industry/healthcare/dragon-copilot/about/faqs), [Microsoft](https://learn.microsoft.com/en-us/industry/healthcare/dragon-copilot/whitepapers/privacy)).

### You can usually say no

Health systems that publish notices say so plainly. UC Davis: "If you do not want your clinician to use Abridge, just let them know. Your care will not be affected" ([UC Davis](https://health.ucdavis.edu/patients-visitors/about-patient-care/quality-safety/clinical-note-taking-technology)). The VA: "If a patient does not consent, the clinician should not use the Abridge tool for that encounter" ([VA](https://department.va.gov/privacy/wp-content/uploads/sites/5/2026/07/FY26AbridgeAmbientScribePIA.pdf)). UChicago and Kettering Health say the same ([UChicago](https://www.uchicagomedicine.org/forefront/patient-care-articles/2025/january/ai-ambient-clinical-documentation-what-to-know), [Kettering](https://ketteringhealth.org/ai-improving-appointments-ambient-listening/)). If you decline, the doctor can dictate a summary after the visit instead ([Microsoft](https://learn.microsoft.com/en-us/industry/healthcare/dragon-copilot/whitepapers/privacy)).

### What HIPAA does and doesn't do here

HIPAA, the US health privacy law, treats the recording as protected health information and requires the vendor to sign an agreement to protect it ([45 CFR 160.103](https://www.law.cornell.edu/cfr/text/45/160.103), [45 CFR 164.502](https://www.law.cornell.edu/cfr/text/45/164.502)). But HIPAA lets providers use your information for treatment without asking you ([45 CFR 164.506](https://www.law.cornell.edu/cfr/text/45/164.506)). So HIPAA by itself doesn't require the doctor to ask before recording. That duty comes from state recording laws (see the table below) and some new state laws aimed at AI. Louisiana, for example, now requires the clinician to tell you out loud before an AI-transcribed recording starts ([Louisiana Act 649](https://legis.la.gov/legis/ViewDocument.aspx?d=1480567)). That is a duty to tell you, not to get your agreement.

**Lawsuits.** In California, patients have sued Sharp HealthCare (state court, San Diego) and Sutter Health and MemorialCare (federal court), alleging visits were recorded with an AI scribe without their consent. The Sharp suit also alleges chart notes said patients had consented when they hadn't. These are allegations, with no ruling on them as of October 10, 2026 ([Alston & Bird](https://www.alstonprivacy.com/your-ai-scribe-may-be-taking-notes-and-plaintiffs-are-too/), [Physicians News Network](https://www.physiciansnewsnetwork.com/p/sharp-healthcare-faces-lawsuit-over-alleged-secret-recording-of-patient-conversations)).

**After the visit:** read your visit note in the patient portal. If it says you agreed to recording and you didn't, ask for a correction.

---

## Glasses, pins and pendants

### The light on Meta's glasses

Meta's glasses have a small white light that blinks when the wearer takes a photo or video. Meta says the light "has no off switch" and that the camera turns off if the light is covered or tampered with ([Meta](https://about.fb.com/news/2026/07/metas-ai-glasses-your-questions-answered/), [Meta](https://www.meta.com/ai-glasses/privacy/)).

Treat the light as a hint, not proof:

- **It's tied to photos and videos for the wearer's gallery.** Meta's help pages treat images the AI looks at as separate from captures made "when the capture LED is on", and don't say the light comes on for the AI ([Meta](https://www.meta.com/help/ai-glasses/1381548946634724/)). During a "live AI" session, Meta says the camera and microphone are "continuously active" ([Meta](https://www.meta.com/help/ai-glasses/894093646030348/)).
- **It has been beaten.** In 2025, 404 Media reported a hobbyist charging about $60 to disable the light ([404 Media](https://www.404media.co/how-to-disable-meta-rayban-led-light/)). In 2026 CBS found that covering the light after recording started didn't stop it; Meta says it has since fixed that ([CBS News](https://www.cbsnews.com/news/meta-ai-glasses-privacy-security-fixes/)).

### Where it goes

When the wearer asks Meta AI about what they see, Ray-Ban's FAQ says the glasses send a photo to Meta's cloud, and "All photos processed with AI are stored and used to improve Meta products, and will be used to train Meta AI with help from trained reviewers" ([Ray-Ban](https://india.ray-ban.com/ray-ban-meta-faq)). Voice recordings are stored by default for up to a year and may be reviewed by people ([Meta](https://www.meta.com/legal/ai-glasses/voice-controls-privacy-notice/)). If you're in the frame, you have no setting to stop any of this.

### Pins and pendants

- **Bee** (owned by Amazon) says it doesn't keep the audio, but it does keep transcripts and summaries of what was said ([Amazon](https://www.aboutamazon.com/news/devices/bee-private-compute-data-protection)). TechCrunch describes it as a wristband or clip-on that shows a green light while it records ([TechCrunch](https://techcrunch.com/2026/01/12/hands-on-with-bee-amazons-latest-ai-wearable/)).
- **Friend** is a pendant. Its privacy policy says the device "is passively recording your surroundings", may collect voice and face data, may use data to train its models, and makes the wearer "solely responsible" for following the law ([Friend](https://friend.com/legal/privacy.pdf)).

None of these products that we could check stops recording someone who hasn't agreed. The rule is "ask first", and it's up to the wearer.

### How to spot them

Meta's glasses look like ordinary Ray-Ban or Oakley frames. Look for a small camera lens in a front corner, a small light beside it, and thicker arms than usual. Pins and pendants are small discs clipped to a collar or worn on a cord. When in doubt, ask: "Are those recording?"

Some places ban them outright. Philadelphia's courts deny entry to anyone wearing recording-capable glasses ([Philadelphia courts](https://www.courts.phila.gov/pdf/notices/2026/Smart-Glasses-Order.pdf)), and the federal court in western Wisconsin bans them from its courthouse ([US District Court, W.D. Wis.](https://www.wiwd.uscourts.gov/news/updated-list-prohibited-items?page=1)).

---

## What the law says about consent

**This is a summary, not legal advice.** Laws have exceptions, and courts read them differently.

US federal law lets you record a conversation you're part of, or one where someone in it agreed, unless the recording is made to commit a crime or another wrong ([18 U.S.C. 2511(2)(d)](https://www.law.cornell.edu/uscode/text/18/2511)). Most states follow that "one-party" rule. These states are stricter:

| State | Rule | In plain words | Law |
|---|---|---|---|
| California | Everyone must agree | For conversations where people expect privacy | [Penal Code 632](https://codes.findlaw.com/ca/penal-code/pen-sect-632/) |
| Delaware | Everyone must agree (disputed) | Two state laws conflict; assume everyone | [11 Del. C. 1335](https://delcode.delaware.gov/title11/c005/sc07/index.html) |
| Florida | Everyone must agree | In-person talk where people expect privacy, plus calls | [Fla. Stat. 934.03](http://www.leg.state.fl.us/statutes/index.cfm?App_mode=Display_Statute&URL=0900-0999/0934/Sections/0934.03.html) |
| Illinois | Everyone must agree | Bans secret recording of private conversations | [720 ILCS 5/14-2](https://www.ilga.gov/legislation/ilcs/fulltext.asp?DocName=072000050K14-2) |
| Maryland | Everyone must agree | Where people expect privacy | [Cts. & Jud. Proc. 10-402](https://mgaleg.maryland.gov/mgawebsite/Laws/StatuteText?article=gcj&section=10-402&enactments=false) |
| Massachusetts | Everyone must agree | Bans secret recording; recording openly is different | [c. 272, s. 99](https://malegislature.gov/Laws/GeneralLaws/PartIV/TitleI/Chapter272/Section99) |
| Michigan | Everyone must agree (unsettled) | Unclear when you record a talk you're part of | [MCL 750.539c](https://legislature.mi.gov/Laws/MCL?objectName=mcl-750-539c) |
| Montana | Everyone must know | Bans hidden recording without everyone's knowledge | [Mont. Code 45-8-213](https://leg.mt.gov/bills/mca/title_0450/chapter_0080/part_0020/section_0130/0450-0080-0020-0130.html) |
| New Hampshire | Everyone must agree | Calls and in-person talk where people expect privacy | [RSA 570-A:2](https://www.gencourt.state.nh.us/rsa/html/LVIII/570-A/570-A-2.htm) |
| Pennsylvania | Everyone must agree | In-person talk where people expect privacy, plus calls | [18 Pa.C.S. 5704](https://www.palegis.us/statutes/consolidated/view-statute?txtType=PDF&ttl=18&div=0&chpt=57&sctn=4&subsctn=0) |
| Washington | Everyone must agree | Announcing the recording to everyone counts as consent, and the announcement must be on the recording | [RCW 9.73.030](https://app.leg.wa.gov/RCW/default.aspx?cite=9.73.030) |
| Connecticut | Mixed | Phone calls need everyone's agreement or a warning, or you can be sued | [Gen. Stat. 52-570d](https://www.cga.ct.gov/current/pub/chap_925.htm) |
| Nevada | Mixed | Its Supreme Court has read the phone law as everyone must agree; in person, one is enough | [NRS 200.620](https://www.leg.state.nv.us/NRS/NRS-200.html), [RCFP](https://www.rcfp.org/reporters-recording-guide/nevada/) |
| Oregon | Mixed | Everyone must be told before an in-person recording, and video calls now count as in-person | [ORS 165.540](https://www.oregonlegislature.gov/bills_laws/ors/ors165.html) |

Missouri is sometimes listed as stricter for in-person talk, but its law isn't clear, so we've left it out. For every state in detail, see the Reporters Committee's [Reporter's Recording Guide](https://www.rcfp.org/reporters-recording-guide/).

**Calls across state lines** are unsettled. The Reporters Committee advises assuming the stricter state's law applies ([RCFP](https://www.rcfp.org/introduction-to-reporters-recording-guide/)). In practice: if anyone on the call is in a state on this list, assume everyone has to agree.

**In the EU and UK**, a recording of someone who can be identified is personal data under the GDPR. A business running a notetaker needs a legal reason and must tell people ([GDPR Art. 6](https://gdpr-info.eu/art-6-gdpr/), [Art. 13](https://gdpr-info.eu/art-13-gdpr/)). Purely personal or household use is exempt ([GDPR Art. 2](https://gdpr-info.eu/art-2-gdpr/)), but the UK regulator says that once a home camera captures people beyond your own property, data protection law applies ([ICO](https://ico.org.uk/for-the-public/domestic-cctv-systems/)).

---

## What to say

Short lines that work, by situation.

**As a guest on a call**
- "Before we start, is anything recording or taking notes? I'd rather it didn't."
- "I see a notetaker in the list. Whose is it? Can we remove it for this call?"

**As a patient**
- "Will anything record or transcribe this visit?"
- "I'd rather you didn't use the AI scribe today."
- "How long is the audio kept, and is it used to train AI?"

**As a host**
- "Please don't bring AI notetakers. I'll share notes afterwards."
- Put the same line in the invite, then use the host settings above.

**Around smart glasses**
- "Are those recording? Could you take them off while we talk?"

**As a parent or event organizer**
- "No recording glasses or AI notetakers at this event." Put it on the sign-up page so nobody is surprised at the door.

---

## FAQ

**Can someone record a Zoom call without telling me?**

Under federal law and in most states, a participant can record a conversation they're part of. In the states listed above, everyone must agree or be told. Desktop recorders don't show up in the participant list, so the only reliable check is to ask ([Read.ai](https://support.read.ai/hc/en-us/articles/52118970003987-How-Consent-Works-on-Web-Mode-vs-Desktop-Mode-Read-AI)).

**How do I get an Otter bot out of my meeting?**

Type "stop otter" in the meeting chat. Otter says anyone in the meeting can do this, with or without an Otter account ([Otter](https://help.otter.ai/hc/en-us/articles/14288936562199-Remove-Otter-Notetaker-from-your-meeting-Zoom-Google-Meet-or-Microsoft-Teams)).

**Can I refuse an AI scribe at the doctor?**

Usually, yes. Health systems that publish notices, such as UC Davis, UChicago and the VA, say you can decline and that your care won't be affected ([UC Davis](https://health.ucdavis.edu/patients-visitors/about-patient-care/quality-safety/clinical-note-taking-technology), [VA](https://department.va.gov/privacy/wp-content/uploads/sites/5/2026/07/FY26AbridgeAmbientScribePIA.pdf)). You may need to say it at each visit.

**Does HIPAA stop my doctor from recording me?**

No. HIPAA protects the recording once it exists, but lets providers use your information for treatment without asking ([45 CFR 164.506](https://www.law.cornell.edu/cfr/text/45/164.506)). Whether they must ask first depends on your state's recording law.

**If the light on someone's Meta glasses is off, are they not recording?**

Not necessarily. Meta ties the light to photos and videos for the wearer's gallery, and its pages don't say it lights up when the AI looks through the camera ([Meta](https://www.meta.com/help/ai-glasses/1381548946634724/)). The light has also been disabled by modification in the past ([404 Media](https://www.404media.co/how-to-disable-meta-rayban-led-light/)).

**Is it legal to wear recording glasses everywhere?**

No. Some courts ban them outright, for example Philadelphia's courts and the federal court in western Wisconsin ([Philadelphia courts](https://www.courts.phila.gov/pdf/notices/2026/Smart-Glasses-Order.pdf), [W.D. Wis.](https://www.wiwd.uscourts.gov/news/updated-list-prohibited-items?page=1)). Recording a private conversation can also break the consent laws above.
