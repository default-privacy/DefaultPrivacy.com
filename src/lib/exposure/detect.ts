/**
 * Client-side exposure detection — browser APIs only, so only call these from a
 * client component (useEffect). Ported from v4's exposure detectors, minus the
 * third-party FingerprintJS lib (we compute our own composite hash) and minus the
 * third-party IP lookup (we read IP/geo first-party via /api/whoami).
 */

export type WebRtcResult = {
  supported: boolean
  localIp: string | null
  publicIp: string | null
}

export type BrowserSignals = {
  fingerprintId: string
  canvasSupported: boolean
  webglVendor: string | null
  webglRenderer: string | null
  audioSupported: boolean
  platform: string
  cores: number | null
  memory: number | null
  touch: number
  screen: string
  colorDepth: number
  pixelRatio: number
  userAgent: string
  languages: string[]
  timezone: string
  doNotTrack: string | null
  cookiesEnabled: boolean
  storage: string[]
  plugins: string[]
  webdriver: boolean
}

export type ExposureDetection = {
  signals: BrowserSignals
  webrtc: WebRtcResult
}

// cyrb53 — fast non-crypto hash, rendered as hex. Enough to show a stable signature.
function hash(str: string): string {
  let h1 = 0xdeadbeef
  let h2 = 0x41c6ce57
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  const n = 4294967296 * (2097151 & h2) + (h1 >>> 0)
  return n.toString(16).padStart(14, "0")
}

function canvasSignal(): string | null {
  try {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return null
    ctx.textBaseline = "top"
    ctx.font = "14px Arial"
    ctx.fillStyle = "#f60"
    ctx.fillRect(125, 1, 62, 20)
    ctx.fillStyle = "#069"
    ctx.fillText("DefaultPrivacy", 2, 15)
    ctx.fillStyle = "rgba(102, 204, 0, 0.7)"
    ctx.fillText("DefaultPrivacy", 4, 17)
    return canvas.toDataURL()
  } catch {
    return null
  }
}

function webglInfo(): { vendor: string | null; renderer: string | null } {
  try {
    const canvas = document.createElement("canvas")
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null
    if (!gl) return { vendor: null, renderer: null }
    const dbg = gl.getExtension("WEBGL_debug_renderer_info")
    if (!dbg) return { vendor: null, renderer: null }
    return {
      vendor: (gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) as string) || null,
      renderer: (gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) as string) || null,
    }
  } catch {
    return { vendor: null, renderer: null }
  }
}

// Standard OfflineAudioContext fingerprint: render a tone through a compressor and
// sum a slice of the output — device audio stacks produce tiny, stable differences.
async function audioSignal(): Promise<string | null> {
  try {
    const Ctx =
      window.OfflineAudioContext ||
      (window as Window & { webkitOfflineAudioContext?: typeof OfflineAudioContext })
        .webkitOfflineAudioContext
    if (!Ctx) return null
    const ctx = new Ctx(1, 44100, 44100)
    const osc = ctx.createOscillator()
    osc.type = "triangle"
    osc.frequency.value = 10000
    const comp = ctx.createDynamicsCompressor()
    comp.threshold.value = -50
    comp.knee.value = 40
    comp.ratio.value = 12
    comp.attack.value = 0
    comp.release.value = 0.25
    osc.connect(comp)
    comp.connect(ctx.destination)
    osc.start(0)
    const buffer = await ctx.startRendering()
    const data = buffer.getChannelData(0).subarray(4500, 5000)
    let sum = 0
    for (let i = 0; i < data.length; i++) sum += Math.abs(data[i])
    return sum.toString()
  } catch {
    return null
  }
}

async function detectWebRtc(): Promise<WebRtcResult> {
  const res: WebRtcResult = { supported: false, localIp: null, publicIp: null }
  try {
    if (!window.RTCPeerConnection) return res
    res.supported = true
    const ips: string[] = []
    const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] })
    pc.createDataChannel("")
    const offer = await pc.createOffer()
    await pc.setLocalDescription(offer)
    await new Promise<void>((resolve) => {
      const timer = setTimeout(resolve, 2500)
      pc.onicecandidate = (e) => {
        if (!e.candidate) {
          clearTimeout(timer)
          resolve()
          return
        }
        const m = e.candidate.candidate.match(/([0-9]{1,3}\.){3}[0-9]{1,3}/)
        if (m && !ips.includes(m[0])) ips.push(m[0])
      }
    })
    pc.close()
    for (const ip of ips) {
      const isPrivate = /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|127\.|169\.254\.)/.test(ip)
      if (isPrivate) res.localIp = ip
      else if (!ip.startsWith("0.")) res.publicIp = ip
    }
  } catch {
    // WebRTC unavailable / blocked
  }
  return res
}

type NavExtras = Navigator & { deviceMemory?: number }

export async function runExposureDetection(): Promise<ExposureDetection> {
  const nav = navigator as NavExtras
  const scr = window.screen

  const canvas = canvasSignal()
  const { vendor, renderer } = webglInfo()
  const audio = await audioSignal()

  const storage: string[] = []
  try {
    if (window.localStorage) storage.push("localStorage")
  } catch {
    /* storage / plugins blocked — ignore */
  }
  try {
    if (window.sessionStorage) storage.push("sessionStorage")
  } catch {
    /* storage / plugins blocked — ignore */
  }
  try {
    if (window.indexedDB) storage.push("indexedDB")
  } catch {
    /* storage / plugins blocked — ignore */
  }

  const plugins: string[] = []
  try {
    for (let i = 0; i < nav.plugins.length; i++) plugins.push(nav.plugins[i].name)
  } catch {
    /* storage / plugins blocked — ignore */
  }

  const screen = `${scr.width}×${scr.height}`
  const languages = [...(nav.languages ?? [nav.language])]
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const components = [
    canvas,
    vendor,
    renderer,
    audio,
    screen,
    scr.colorDepth,
    window.devicePixelRatio,
    nav.userAgent,
    nav.platform,
    languages.join(","),
    timezone,
    nav.hardwareConcurrency,
    nav.deviceMemory,
    nav.maxTouchPoints,
  ]
    .map((x) => String(x ?? ""))
    .join("‖")

  const signals: BrowserSignals = {
    fingerprintId: hash(components),
    canvasSupported: canvas !== null,
    webglVendor: vendor,
    webglRenderer: renderer,
    audioSupported: audio !== null,
    platform: nav.platform,
    cores: nav.hardwareConcurrency ?? null,
    memory: nav.deviceMemory ?? null,
    touch: nav.maxTouchPoints,
    screen,
    colorDepth: scr.colorDepth,
    pixelRatio: window.devicePixelRatio,
    userAgent: nav.userAgent,
    languages,
    timezone,
    doNotTrack: nav.doNotTrack,
    cookiesEnabled: nav.cookieEnabled,
    storage,
    plugins,
    webdriver: nav.webdriver,
  }

  const webrtc = await detectWebRtc()
  return { signals, webrtc }
}
