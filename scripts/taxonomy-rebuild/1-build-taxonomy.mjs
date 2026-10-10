import fs from "node:fs"
const cats = JSON.parse(fs.readFileSync("/tmp/cat-counts.json", "utf8"))
const slug = s => s.toLowerCase().replace(/&/g,"and").replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"")

const groups = [
  ["browser-privacy","Browser Privacy",10],["network-privacy","Network Privacy",20],
  ["data-privacy","Data Privacy",30],["email","Email",40],
  ["identity-and-anonymity","Identity & Anonymity",50],["hardware","Hardware",60],
  ["mobile","Mobile",70],["protection","Protection",80],["secure-payments","Secure Payments",90],
  ["communication","Communication",100],["storage-hosting","Storage & Hosting",110],
  ["media-creative","Media & Creative",120],["productivity-and-work","Productivity & Work",130],
  ["osint","OSINT",140],["policy-and-advocacy","Policy & Advocacy",150],
  ["resources","Resources",160],["legal-asset-protection","Legal & Asset Protection",170],
]

// canonical rename for merge-target categories: sourceName -> [slug, displayName]
const renames = {
  "Private Search Engine":["private-search","Private Search"],
  "DNS Providers":["dns","DNS"], "Proxies":["proxies","Proxies"],
  "Mail Forwarding":["aliases-forwarding","Aliases & Forwarding"],
  "Email Checker":["email-security","Email Security"],
  "Laptop":["laptops-desktops","Laptops & Desktops"],
  "Privacy Phones":["privacy-phones","Privacy Phones"],
  "Routers":["routers-firmware","Routers & Firmware"],
  "Mobile OS":["mobile-os","Mobile OS"],
  "2-Factor Authentication":["auth-2fa","Authentication & 2FA"],
  "Windows Defences":["windows-privacy","Windows Privacy"],
  "Crypto Wallets":["crypto-wallets","Crypto Wallets"],
  "Pre Paid Cards":["prepaid-virtual-cards","Prepaid & Virtual Cards"],
  "P2P Messaging":["encrypted-messaging","Encrypted Messaging"],
  "VoIP":["voip-calls","VoIP & Calls"],
  "Social Media":["social-networks","Social Networks"],
  "File Sharing and Sync":["file-sharing-sync","File Sharing & Sync"],
  "Web Hosting":["web-cloud-hosting","Web & Cloud Hosting"],
  "Self Hosting":["self-hosting-servers","Self-Hosting & Servers"],
  "RSS Readers":["rss-news-readers","RSS & News Readers"],
  "Online Courses":["courses","Courses"],
  "Laptop ":["laptops-desktops","Laptops & Desktops"],
}
// display renames (kept, not merge target)
const displayRename = {
  "Google Analytics":"Tracker Removal","GPS Tracking":"GPS Anti-Tracking","App Store":"App Stores",
  "Mac OS Defences":"macOS Defenses","Data Breaches":"Data Breach Lookup","Scanners":"Vulnerability Scanners",
  "Audio Editors & Recorders":"Audio Editors","Cloud Productivity Suites":"Office Suites",
  "Large Language Models":"Private AI","Policy and Research":"Policy & Research",
  "Freedom and Safety":"Freedom & Safety","eBook Reader":"eBook Readers","LLCs":"Anonymous LLCs",
  "Digital Estate Planning":"Estate Planning","Maps":"Maps & Geolocation","Private Investigators":"People Investigation",
  "Specialized Search Engine":"Specialized Search","Desktop Operating Systems":"Desktop OS",
}

// M: every one of the 153 -> action. group-slug = keep under group; merge:slug; dissolve; drop; tag:x; split
const M = {
  "Browsers":"browser-privacy","Ad Blockers":"browser-privacy","Browser Sync":"browser-privacy","Fingerprint Protection":"browser-privacy",
  "Private Search Engine":"browser-privacy","Search Engine":"merge:private-search","Meta Search Engine":"merge:private-search","Browser Extensions":"tag:browser-extension",
  "Virtual Private Networks":"network-privacy","DNS Providers":"network-privacy","DNS Clients":"merge:dns","DNS Hosting":"merge:dns",
  "Firewalls":"network-privacy","Host Block Lists":"network-privacy","Intrusion Detection":"network-privacy","Self-Hosted Network Security":"network-privacy",
  "Proxies":"network-privacy","Proxy Sites":"merge:proxies","Mix Networks":"network-privacy","Network Analysis":"network-privacy",
  "Data Broker Redaction":"data-privacy","Opt-Out Tools":"data-privacy","Metadata Removal":"data-privacy","Data Erasers":"data-privacy",
  "Data Anonymization":"data-privacy","Data Loss Prevention":"data-privacy","Disk Cleaners":"data-privacy","Google Analytics":"data-privacy",
  "Encrypted Email":"email","Email Clients":"email","Mail Forwarding":"email","Email Aliases":"merge:aliases-forwarding",
  "Mail Servers":"email","Email Checker":"email","Email Security Tools":"merge:email-security",
  "Identity Protection":"identity-and-anonymity","Disposable ID":"identity-and-anonymity","Burner Phone":"identity-and-anonymity",
  "Virtual Phone Numbers":"identity-and-anonymity","SIM Cards":"identity-and-anonymity","Decentralized Networks":"identity-and-anonymity","Virtual Mailbox":"identity-and-anonymity",
  "Laptop":"hardware","Desktop":"merge:laptops-desktops","Desktop Operating Systems":"hardware","Linux":"hardware","Hardware Devices":"hardware",
  "Privacy Phones":"hardware","Linux Phones":"merge:privacy-phones","Routers":"hardware","Router Firmware":"merge:routers-firmware","Smart Home":"hardware",
  "Security Cameras":"hardware","Faraday Bags":"hardware","WiFi Hotspots":"hardware","Voice Assistants":"hardware","GPS Tracking":"hardware",
  "Mobile OS":"mobile","Mobile Operating Systems":"merge:mobile-os","Mobile Apps":"mobile","Android Keyboards":"mobile","App Store":"mobile","Mobile Device Privacy":"mobile",
  "2-Factor Authentication":"protection","Authentication":"merge:auth-2fa","Password Managers":"protection","PGP Managers":"protection","File Encryption":"protection",
  "Anti-Malware":"protection","Windows Defences":"protection","Windows Privacy":"merge:windows-privacy","Linux Defenses":"protection","Mac OS Defences":"protection",
  "Data Breaches":"protection","Scanners":"protection","Virtual Machines":"protection",
  "Crypto Wallets":"secure-payments","Cold Storage":"merge:crypto-wallets","Crypto Exchanges":"secure-payments","Cryptocurrencies":"secure-payments",
  "Bank Accounts":"secure-payments","Pre Paid Cards":"secure-payments","Virtual Credit Cards":"merge:prepaid-virtual-cards","Secure Budgeting":"secure-payments","Donations":"secure-payments",
  "P2P Messaging":"communication","Messaging":"merge:encrypted-messaging","VoIP":"communication","Secure Conference Calls":"merge:voip-calls","Video and Voice":"merge:voip-calls",
  "Social Media":"communication","Social Networks":"merge:social-networks",
  "Encrypted Cloud Storage":"storage-hosting","Secure Cloud Storage":"merge:encrypted-cloud-storage","File Sharing and Sync":"storage-hosting","File Drop":"merge:file-sharing-sync","Backup and Sync":"merge:file-sharing-sync",
  "Web Hosting":"storage-hosting","Cloud Hosting":"merge:web-cloud-hosting","Domain Registrars":"storage-hosting","Self Hosting":"storage-hosting","Servers":"merge:self-hosting-servers","Code Hosting":"storage-hosting","Service Providers":"storage-hosting",
  "Image Editors":"media-creative","Video Editors":"media-creative","Audio Editors & Recorders":"media-creative","3D Graphics":"media-creative","Animation":"media-creative",
  "Casting & Streaming":"media-creative","Video Platforms":"media-creative","Blogging Platforms":"media-creative","Design Tools":"drop",
  "Digital Notes":"productivity-and-work","Documents":"productivity-and-work","Cloud Productivity Suites":"productivity-and-work","Team Collaboration":"productivity-and-work","Large Language Models":"productivity-and-work","Productivity":"dissolve",
  "Open Source Intelligence":"split","Website Info":"merge:osint-domain-intel","WHOIS Lookup":"merge:osint-domain-intel","Username Checker":"merge:osint-username-search",
  "Specialized Search Engine":"osint","Dorking":"osint","Maps":"osint","Private Investigators":"osint",
  "Advocacy Groups":"policy-and-advocacy","Policy and Research":"policy-and-advocacy","Freedom and Safety":"policy-and-advocacy",
  "Books":"resources","Podcasts":"resources","Channels":"resources","Online Courses":"resources","Learning":"drop",
  "eBook Reader":"resources","RSS Readers":"resources","News Readers":"merge:rss-news-readers","Online Resources":"dissolve","Online Tools":"dissolve",
  "LLCs":"legal-asset-protection","Trusts":"legal-asset-protection","Asset Protection":"legal-asset-protection","Legal Shield":"legal-asset-protection",
  "Tax Solutions":"legal-asset-protection","Digital Estate Planning":"legal-asset-protection","Compliance":"legal-asset-protection","Privacy Consultation":"legal-asset-protection",
  "Backend":"drop","Frontend":"drop","Testing":"drop","AI Tools":"drop","DevOps":"drop",
}

const osintSubcats = [
  ["osint-frameworks","Frameworks & Collections"],["osint-username-search","Username & Social Search"],
  ["osint-domain-intel","Domain & Website Intel"],["osint-host-scanning","Network & Host Scanning"],
  ["osint-tech-fingerprint","Tech Fingerprinting"],["osint-surveillance","Surveillance & Transparency"],
]

// ---- build canonical subcategories + validate ----
const catNames = new Set(cats.map(c => c.name))
const uncovered = [...catNames].filter(n => !(n in M))
const extra = Object.keys(M).filter(n => !catNames.has(n))

const subcats = new Map() // slug -> {slug,name,group}
const addSub = (sl, nm, g) => { if(!subcats.has(sl)) subcats.set(sl,{slug:sl,name:nm,group:g}) }
// groups from renames + kept
for (const [name, act] of Object.entries(M)) {
  if (!catNames.has(name)) continue
  if (typeof act === "string" && groups.some(g=>g[0]===act)) {
    const [rs, rn] = renames[name] || [slug(displayRename[name]||name), displayRename[name]||name]
    addSub(rs, rn, act)
  }
}
// merge targets must resolve to a canonical
const mergeTargets = new Set(Object.values(M).filter(a=>a.startsWith?.("merge:")).map(a=>a.slice(6)))
const missingTargets = [...mergeTargets].filter(t => !subcats.has(t))
// osint splits
for (const [s,n] of osintSubcats) addSub(s,n,"osint")
// osint keeps (Specialized/Dorking/Maps/PI) already added via kept loop

const out = {
  groups: groups.map(([s,n,o])=>({slug:s,name:n,sort:o})),
  subcategories: [...subcats.values()].sort((a,b)=>a.group.localeCompare(b.group)||a.name.localeCompare(b.name)),
  categoryActions: M,
  osintSubcats: osintSubcats.map(([s,n])=>({slug:s,name:n})),
  aiRefile: ["Open Source Intelligence","Productivity","Online Tools","Online Resources"],
}
fs.writeFileSync("/tmp/taxonomy-v2.json", JSON.stringify(out,null,1))

console.log("=== VALIDATION ===")
console.log("153 categories covered:", uncovered.length===0 ? "YES ✓" : "NO — uncovered: "+uncovered.join(", "))
console.log("M keys not in DB (should be 0):", extra.length? extra.join(", ") : "none ✓")
console.log("merge targets missing a canonical:", missingTargets.length? missingTargets.join(", ") : "none ✓")
console.log("\ngroups:", groups.length, "| canonical subcategories:", subcats.size)
console.log("actions:", Object.entries(M).reduce((a,[,v])=>{const k=v.startsWith?.("merge:")?"merge":v.startsWith?.("tag:")?"tag":v;a[k]=(a[k]||0)+1;return a},{}))
console.log("\nsubcats per group:")
for(const [gs,gn] of groups.map(g=>[g[0],g[1]])){const n=[...subcats.values()].filter(s=>s.group===gs);console.log("  "+gn+" ("+n.length+"): "+n.map(s=>s.name).join(", "))}
