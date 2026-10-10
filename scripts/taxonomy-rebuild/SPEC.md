# Directory Taxonomy — clean rebuild spec (DRAFT, 2026-07-09)

Turns v5's **153 flat, uneven categories** into a **2-level taxonomy: ~16 groups → tight, specific subcategories** (no bucket >~30, no catch-alls, no duplicates, no non-privacy residue). This is the design to approve/adjust *before* any data changes. Counts = current published tools.

## Principles
1. **Groups** = broad privacy domains (the sidebar's 16 top rows). **Subcategories** = specific, single-topic.
2. **No catch-alls** — dissolve "Productivity"/"Online Resources"/"Online Tools"; their tools re-file to real subcategories.
3. **Platform/attribute ≠ category** — "Browser Extensions" becomes a *tag*, not a bucket.
4. **Merge duplicates** — one canonical name each.
5. **Split giants** — OSINT [113] → 7 sub-topics.
6. **Remove non-privacy residue** — LLC/trust/legal-services aren't privacy tools.
7. Every tool lands in ≥1 real subcategory; kill empty categories.

---

## The 16 groups → subcategories

**1 · Browser Privacy** — Browsers · Ad Blockers · Browser Sync · Fingerprint Protection · **Private Search** (merge *Private Search Engine + Search Engine + Meta Search Engine*)
**2 · Network Privacy** — VPN · DNS (merge *DNS Providers + Clients + Hosting*) · Firewalls · Host Block Lists · Intrusion Detection · Self-Hosted Network Security · Proxies (merge *Proxies + Proxy Sites*) · Mix Networks
**3 · Data Privacy** — Data Broker Redaction · Opt-Out Tools · Metadata Removal · Data Erasers · Data Anonymization · Data Loss Prevention · Disk Cleaners · Tracker Removal (*Google Analytics*)
**4 · Email** — Encrypted Email · Email Clients · Aliases & Forwarding (merge *Email Aliases + Mail Forwarding*) · Mail Servers · Email Security (merge *Email Security Tools + Email Checker*)
**5 · Identity & Anonymity** — Identity Protection · Disposable ID · Burner Phone · Virtual Phone Numbers · SIM Cards · Decentralized Networks
**6 · Hardware** — Laptops & Desktops (merge *Laptop + Desktop*) · Hardware Devices · Privacy Phones (merge *Privacy Phones + Linux Phones*) · Routers & Firmware (merge *Routers + Router Firmware*) · Smart Home · Security Cameras · Faraday Bags · WiFi Hotspots · Voice Assistants · GPS Anti-Tracking
**7 · Mobile** — Mobile OS (merge *Mobile OS + Mobile Operating Systems*) · Mobile Apps · Android Keyboards · App Stores · Mobile Device Privacy
**8 · Protection** — Authentication & 2FA (merge *2FA + Authentication*) · Password Managers · PGP Managers · File Encryption · Anti-Malware · Windows Privacy (merge *Windows Defences + Windows Privacy*) · Linux Defenses · macOS Defenses · Data Breach Lookup (*Data Breaches*) · Vulnerability Scanners (*Scanners*)
**9 · Secure Payments** — Crypto Wallets (merge *Crypto Wallets + Cold Storage*) · Crypto Exchanges · Cryptocurrencies · Bank Accounts · Prepaid & Virtual Cards (merge *Pre Paid Cards + Virtual Credit Cards*) · Secure Budgeting · Donations
**10 · Communication** *(new — pulled out of the old Web Services blob)* — Encrypted Messaging (merge *Messaging + P2P Messaging*) · VoIP & Calls (merge *VoIP + Secure Conference Calls + Video and Voice*) · Social Networks (merge *Social Media + Social Networks*)
**11 · Storage & Hosting** *(new — the other half of Web Services)* — Encrypted Cloud Storage (merge *Encrypted + Secure Cloud Storage*) · File Sharing & Sync (merge *File Sharing and Sync + File Drop + Backup and Sync*) · Web & Cloud Hosting (merge *Web Hosting + Cloud Hosting*) · Domain Registrars · Self-Hosting & Servers (merge *Self Hosting + Servers*) · Code Hosting · Service Providers
**12 · Media & Creative** *(new)* — Image Editors · Video Editors · Audio Editors · 3D Graphics · Animation · Casting & Streaming · Video Platforms · Blogging Platforms
**13 · Productivity & Work** — Digital Notes · Documents · Office Suites (*Cloud Productivity Suites*) · Team Collaboration · Private AI (*Large Language Models*)
**14 · OSINT** *(split the 113 + reconcile)* — **Frameworks & Collections** · **Username & Social Search** (+ *Username Checker*) · **Domain & Website Intel** (+ *Website Info [39] + WHOIS Lookup*) · **Network & Host Scanning** · **Tech Fingerprinting** · **Dorking** · **Maps & Geolocation** (*Maps*) · **People Investigation** (*Private Investigators*)
**15 · Policy & Advocacy** — Advocacy Groups · Policy & Research · Freedom & Safety
**16 · Resources** — Books · Podcasts · Channels · Courses (merge *Online Courses + Learning*) · RSS & News Readers (merge *RSS Readers + News Readers*) · eBook Readers · Guides & Lists (absorbs the good parts of *Online Resources*)
**17 · Legal & Asset Protection** *(kept per owner decision — third-party service listings, DP is a directory not a provider)* — Anonymous LLCs · Trusts · Asset Protection · Estate Planning (*Digital Estate Planning*) · Legal Shield · Tax Solutions · Compliance · Privacy Consultation

> **Liability framing (required for this group):** every entry is a **third-party service** with an affiliate/referral link — **DP performs no legal service and files nothing.** Group carries a standing disclaimer ("informational directory, not legal advice; services provided by the listed third parties"). This keeps DP a *directory*, not the liable party. NOTE: this softens the formation-free wall the separation remediation built — intentional, and safe as long as DP never becomes the provider.

---

## Actions ledger

**DISSOLVE (catch-alls → tools re-file to real subcategories):** Productivity [57] · Online Resources [24] · Online Tools [17] *(privacy test-utilities → Data Privacy / Protection)*

**→ TAG (platform/attribute, not a topic):** Browser Extensions [24] → `browser-extension` · Mobile Apps [15] → keep as subcat OR `mobile-app` tag ⚑ · De-Google → `de-google` tag (it's a *quality* of a tool, spread across Mobile/Browser/Search — not a standalone group) ⚑

**MERGE duplicates:** 14 merges listed inline above (Mobile OS, Desktop, Privacy Phones, Routers, Proxies, DNS, Search, Social, Cloud Storage, File Sync, VoIP, Messaging, Aliases, 2FA…).

**SPLIT:** OSINT [113] → 8 subcategories (above). This is the one that needs the AI-assisted tool-level pass in Stage 2.

**KEEP as Group 17 "Legal & Asset Protection"** (owner decision — was slated for removal): LLCs · Trusts · Digital Estate Planning · Asset Protection · Legal Shield · Tax Solutions · Compliance · Privacy Consultation — as third-party listings with disclaimer (see group note). **Nothing removed from the directory.**

**DROP empties (0 tools):** Learning · Backend · Frontend · Testing · AI Tools · Design Tools · DevOps *(their real tools already live in Courses / Code Hosting / Large Language Models / Image Editors)*

**ORPHANS (10 tools, 0 category → home in Stage 2):** Cwtch, ChatMail → Encrypted Messaging · InviZible → Network Privacy · Ace of Coins → Crypto Wallets · ToS;DR → Data Privacy · Decentralize.tv, Technocracy Atlas, Decentralized Directory, OwnNothing Index, Decisive Resources → Resources/Channels

---

## Decisions (LOCKED 2026-07-09)
1. **Split** "Web Services" → **Communication** + **Storage & Hosting**. ✓
2. **De-Google → a tag** (`de-google`), not a group. ✓
3. **Mobile Apps [15]** and **Disposable ID [30]** → keep as-is, no subdivide. ✓
4. **Keep** the legal/asset-protection categories → new **Group 17 "Legal & Asset Protection"** as third-party listings + disclaimer (DP = directory, never the provider/filer). Private Investigators → OSINT (investigation). ✓

**Result: 17 groups · ~100 clean subcategories** (from 153 flat) · 0 tools removed · catch-alls dissolved · OSINT split · duplicates merged · empties dropped.
