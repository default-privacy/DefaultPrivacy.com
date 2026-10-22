"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Fingerprint, Eye, Cpu, Globe, ShieldCheck, ShieldAlert } from "lucide-react"
import { ExposureMap } from "./exposure-map"
import { runExposureDetection, type BrowserSignals, type ExposureDetection } from "@/lib/exposure/detect"

// Shared style for the "fix this" funnel links — matches the exposure ribbon's link.
const FIX_LINK_CLASS =
  "mt-3 inline-flex items-center gap-1 font-mono text-[12px] text-caution/80 underline-offset-4 transition hover:text-foreground hover:underline"

// Directory category display names, verified verbatim against the live directory.
// The ?category= filter is an EXACT case-insensitive match (no wildcards) — a wrong
// string silently renders "No tools found", so these must stay verbatim.
function fixHref(category: string): string {
  return `/directory?category=${encodeURIComponent(category)}`
}

// Curated set of coarse, stable/high-entropy attributes to tally into the aggregate
// corpus. Deliberately EXCLUDES fingerprintId and userAgent (per-visitor ids →
// tracking DB, forbidden). Values are coarse buckets; nothing here is a join key.
function attributePairs(s: BrowserSignals): { attribute: string; value: string }[] {
  const pairs: { attribute: string; value: string }[] = [
    { attribute: "webglRenderer", value: s.webglRenderer ?? "hidden" },
    { attribute: "webglVendor", value: s.webglVendor ?? "hidden" },
    { attribute: "screen", value: s.screen },
    { attribute: "colorDepth", value: String(s.colorDepth) },
    { attribute: "pixelRatio", value: String(s.pixelRatio) },
    { attribute: "platform", value: s.platform || "unknown" },
    { attribute: "cores", value: s.cores != null ? String(s.cores) : "hidden" },
    { attribute: "memory", value: s.memory != null ? String(s.memory) : "hidden" },
    { attribute: "timezone", value: s.timezone },
    { attribute: "languages", value: s.languages.join(",") },
    { attribute: "touch", value: String(s.touch) },
  ]
  return pairs
}

type WhoAmI = {
  ip: string | null
  city: string | null
  region: string | null
  country: string | null
  latitude: number | null
  longitude: number | null
  timezone: string | null
  geoAvailable: boolean
}

function Field({ label, value, wide = false }: { label: string; value: string | null; wide?: boolean }) {
  return (
    <div className={`rounded-lg border border-foreground/8 bg-foreground/[0.01] p-3 ${wide ? "col-span-2 sm:col-span-3" : ""}`}>
      <div className="brand2-label-12-mono text-muted-foreground">{label}</div>
      <div className={`mt-1 font-mono text-[14px] text-foreground ${wide ? "break-all" : "truncate"}`}>
        {value || "—"}
      </div>
    </div>
  )
}

function SectionHeader({ icon: Icon, title }: { icon: typeof Cpu; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <h2 className="text-[15px] font-medium tracking-tight text-foreground">{title}</h2>
    </div>
  )
}

export function ExposureReadout() {
  const [geo, setGeo] = useState<WhoAmI | null>(null)
  const [det, setDet] = useState<ExposureDetection | null>(null)
  const [geoFailed, setGeoFailed] = useState(false)

  useEffect(() => {
    let alive = true
    fetch("/api/whoami", { cache: "no-store" })
      .then((r) => r.json())
      .then((d: WhoAmI) => alive && setGeo(d))
      .catch(() => alive && setGeoFailed(true))
    runExposureDetection()
      .then((d) => {
        if (!alive) return
        setDet(d)
        // Fire-and-forget: warm the aggregate attribute corpus with coarse buckets
        // only — never the raw fingerprint, never an id, never the IP. Fires once
        // per page load; all errors swallowed silently.
        void fetch("/api/attributes", {
          method: "POST",
          cache: "no-store",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ attributes: attributePairs(d.signals) }),
        }).catch(() => {})
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  const revealed = Boolean(geo?.ip)
  const coords =
    geo?.latitude != null && geo?.longitude != null
      ? `${geo.latitude.toFixed(3)}, ${geo.longitude.toFixed(3)}`
      : null

  const s = det?.signals
  const rtc = det?.webrtc

  // WebRTC verdict — compare the STUN-discovered public IP to the connection IP.
  let rtcTone: "alert" | "info" | "ok" = "ok"
  let rtcMsg = "No WebRTC IP leak detected — your real IP isn’t exposed this way."
  if (rtc) {
    if (rtc.publicIp && geo?.ip && rtc.publicIp !== geo.ip) {
      rtcTone = "alert"
      rtcMsg = `WebRTC exposed a different public IP: ${rtc.publicIp}. If you’re on a VPN, that’s your real IP leaking around it.`
    } else if (rtc.publicIp) {
      rtcTone = "info"
      rtcMsg = `WebRTC exposes your public IP (${rtc.publicIp}) directly to any site that asks.`
    } else if (rtc.localIp) {
      rtcTone = "info"
      rtcMsg = `WebRTC exposes a local network address (${rtc.localIp}).`
    } else if (!rtc.supported) {
      rtcTone = "ok"
      rtcMsg = "WebRTC is unavailable in this browser — nothing to leak here."
    }
  }

  return (
    <div className="space-y-8">
      {/* ── IP reveal ─────────────────────────────────────────────── */}
      <div className="overflow-hidden rounded-xl border border-foreground/12 bg-card" style={{ boxShadow: "0 20px 60px oklch(0 0 0 / 0.35)" }}>
        <div className="flex items-center gap-2 border-b border-foreground/10 bg-foreground/[0.02] px-4 py-3">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-caution/70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-caution" />
          </span>
          <span className="brand2-label-12-mono text-muted-foreground">
            {revealed ? "LIVE · READ FROM YOUR CONNECTION" : "READING YOUR CONNECTION…"}
          </span>
        </div>
        <div className="space-y-6 p-5 sm:p-8">
          <div>
            <div className="brand2-label-12-mono text-caution">YOUR PUBLIC IP</div>
            <div className="mt-1 font-mono text-3xl font-light tracking-tight text-foreground sm:text-4xl">
              {revealed ? (
                <span className="brand2-hero-animate">{geo!.ip}</span>
              ) : geoFailed ? (
                <span className="text-muted-foreground">unavailable</span>
              ) : (
                <span className="text-muted-foreground">scanning…</span>
              )}
            </div>
            <p className="mt-2 text-[13px] text-muted-foreground">
              Sent to every website, ad network, and tracker you touch — automatically, with no
              login and no prompt.
            </p>
            <Link href={fixHref("Virtual Private Networks")} className={FIX_LINK_CLASS}>
              fix this — hide your IP with a VPN →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Field label="CITY" value={geo?.city ?? null} />
            <Field label="REGION" value={geo?.region ?? null} />
            <Field label="COUNTRY" value={geo?.country ?? null} />
            <Field label="TIME ZONE" value={geo?.timezone ?? null} />
            <Field label="COORDINATES" value={coords} />
          </div>
          {geo && !geo.geoAvailable && (
            <p className="text-[12px] text-muted-foreground">
              Location is hidden here because you’re on localhost — it fills in on the live site.
            </p>
          )}
        </div>
      </div>

      {/* ── the map ───────────────────────────────────────────────── */}
      {revealed && geo?.latitude != null && geo?.longitude != null && (
        <ExposureMap
          latitude={geo.latitude}
          longitude={geo.longitude}
          city={geo.city}
          region={geo.region}
          country={geo.country}
        />
      )}

      {/* ── browser signature (fingerprint) ───────────────────────── */}
      <div>
        <SectionHeader icon={Fingerprint} title="Your browser signature" />
        <div className="overflow-hidden rounded-xl border border-foreground/12 bg-card p-5 sm:p-6">
          <div className="brand2-label-12-mono text-caution">FINGERPRINT</div>
          <div className="mt-1 font-mono text-2xl font-light tracking-tight text-foreground sm:text-3xl">
            {s ? <span className="brand2-hero-animate">{s.fingerprintId}</span> : <span className="text-muted-foreground">analyzing…</span>}
          </div>
          <p className="mt-2 max-w-2xl text-[13px] text-muted-foreground">
            Built from your device’s quirks — GPU, canvas, audio, screen, language. It’s stable
            across sites and <span className="text-foreground-soft">survives clearing cookies and incognito</span>,
            so it can re-identify you without any login.
          </p>
          <Link href={fixHref("Fingerprint Protection")} className={FIX_LINK_CLASS}>
            fix this — harden your browser fingerprint →
          </Link>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            <Field label="GPU (WEBGL)" value={s?.webglRenderer ?? (s ? "hidden" : null)} wide />
            <Field label="CANVAS" value={s ? (s.canvasSupported ? "readable" : "blocked") : null} />
            <Field label="AUDIO" value={s ? (s.audioSupported ? "readable" : "blocked") : null} />
          </div>
        </div>
      </div>

      {/* ── WebRTC leak ───────────────────────────────────────────── */}
      <div>
        <SectionHeader icon={Eye} title="WebRTC — the VPN bypass" />
        <div
          className={`flex items-start gap-3 rounded-xl border p-4 ${
            rtcTone === "alert"
              ? "border-destructive/30 bg-destructive/[0.06]"
              : rtcTone === "info"
                ? "border-caution/25 bg-caution/[0.05]"
                : "border-success/25 bg-success/[0.05]"
          }`}
        >
          {rtcTone === "ok" ? (
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
          ) : (
            <ShieldAlert className={`mt-0.5 h-5 w-5 shrink-0 ${rtcTone === "alert" ? "text-destructive" : "text-caution"}`} />
          )}
          <p className="text-[13.5px] text-foreground-soft">{det ? rtcMsg : "Checking for WebRTC leaks…"}</p>
        </div>
        <Link href={fixHref("Browser Extensions")} className={FIX_LINK_CLASS}>
          fix this — block WebRTC with an extension →
        </Link>
      </div>

      {/* ── device ────────────────────────────────────────────────── */}
      <div>
        <SectionHeader icon={Cpu} title="Your device" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Field label="SCREEN" value={s ? `${s.screen} @${s.pixelRatio}x` : null} />
          <Field label="COLOR DEPTH" value={s ? `${s.colorDepth}-bit` : null} />
          <Field label="CPU CORES" value={s?.cores != null ? String(s.cores) : s ? "hidden" : null} />
          <Field label="DEVICE MEMORY" value={s?.memory != null ? `${s.memory} GB` : s ? "hidden" : null} />
          <Field label="PLATFORM" value={s?.platform ?? null} />
          <Field label="TOUCH POINTS" value={s ? String(s.touch) : null} />
        </div>
      </div>

      {/* ── browser ───────────────────────────────────────────────── */}
      <div>
        <SectionHeader icon={Globe} title="Your browser" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <Field label="TIME ZONE" value={s?.timezone ?? null} />
          <Field label="LANGUAGES" value={s ? s.languages.join(", ") : null} />
          <Field label="DO NOT TRACK" value={s ? (s.doNotTrack === "1" ? "on (ironically identifying)" : "off") : null} />
          <Field label="COOKIES" value={s ? (s.cookiesEnabled ? "enabled" : "disabled") : null} />
          <Field label="STORAGE" value={s ? (s.storage.length ? s.storage.join(", ") : "none") : null} />
          <Field label="PLUGINS" value={s ? String(s.plugins.length) : null} />
          {s?.webdriver && <Field label="AUTOMATION" value="webdriver detected" />}
          <Field label="USER AGENT" value={s?.userAgent ?? null} wide />
        </div>
      </div>
    </div>
  )
}
