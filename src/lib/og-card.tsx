import { ImageResponse } from "next/og"

export const OG_SIZE = { width: 1200, height: 630 } as const
export const OG_CONTENT_TYPE = "image/png"

function truncate(text: string, max: number): string {
  if (text.length <= max) return text
  return `${text.slice(0, max - 1)}…`
}

/** Shared 1200×630 card for guide Open Graph images. */
export function guideOgImage(title: string, description: string, category?: string) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          background: "linear-gradient(145deg, #0a0a0a 0%, #141414 45%, #1a1a1a 100%)",
          color: "#fafafa",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(250,250,250,0.45)",
            }}
          >
            Default Privacy · Field Guide
          </div>
          {category ? (
            <div
              style={{
                alignSelf: "flex-start",
                fontSize: 18,
                padding: "8px 16px",
                borderRadius: 999,
                border: "1px solid rgba(250,250,250,0.2)",
                color: "rgba(250,250,250,0.7)",
              }}
            >
              {category}
            </div>
          ) : null}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 56, fontWeight: 600, lineHeight: 1.15, letterSpacing: "-0.02em" }}>
            {truncate(title, 80)}
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.4, color: "rgba(250,250,250,0.65)", maxWidth: 1000 }}>
            {truncate(description, 120)}
          </div>
        </div>
        <div style={{ fontSize: 20, color: "rgba(250,250,250,0.35)" }}>defaultprivacy.com</div>
      </div>
    ),
    { ...OG_SIZE },
  )
}
