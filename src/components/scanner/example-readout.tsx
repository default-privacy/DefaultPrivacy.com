/**
 * Static, hand-authored EXAMPLE of a scan result — a landing-page teaser that SHOWS
 * the payoff before anyone scans. It never calls scanWebsite, so it structurally
 * cannot fabricate a live finding, and it is labeled more loudly than the real
 * results page's simulated banner: a persistent [ EXAMPLE ] tag, the reserved
 * example.com domain, a dimmed treatment, no blinking caret, category names (not real
 * companies), and an always-visible "not a real or simulated scan" caption.
 */
export function ExampleReadout() {
  return (
    <div>
      <div
        className="relative overflow-hidden rounded-xl border border-foreground/12 bg-card"
        style={{ boxShadow: "0 12px 40px oklch(0 0 0 / 0.28)" }}
      >
        {/* window bar */}
        <div className="flex items-center gap-2 border-b border-foreground/10 bg-foreground/[0.02] px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-destructive/70" />
          <span className="h-3 w-3 rounded-full bg-caution/70" />
          <span className="h-3 w-3 rounded-full bg-success/70" />
          <span className="ml-2 truncate font-mono text-[12.5px] text-foreground/40">scan://example.com</span>
          <span className="ml-auto rounded border border-primary/25 bg-primary/10 px-2 py-1 font-mono text-[10px] font-medium tracking-[0.14em] text-primary">
            [ EXAMPLE ]
          </span>
        </div>

        <div className="space-y-6 p-6 font-mono opacity-90">
          <div className="text-[13px] text-foreground/55">
            <span className="text-primary">$</span> privacy scan <span className="text-foreground">example.com</span> --with-dnt --gpc
          </div>

          <div className="grid items-center gap-6 sm:grid-cols-[120px_1fr]">
            <div className="relative mx-auto h-[120px] w-[120px] shrink-0 sm:mx-0">
              <div
                className="h-full w-full rounded-full"
                style={{
                  background: "conic-gradient(var(--caution) 0 68%, var(--border) 68% 100%)",
                  WebkitMask: "radial-gradient(farthest-side, transparent 70%, #000 71%)",
                  mask: "radial-gradient(farthest-side, transparent 70%, #000 71%)",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span
                  className="text-[42px] font-medium leading-none text-caution"
                  style={{ textShadow: "0 0 24px color-mix(in oklab, var(--caution) 40%, transparent)" }}
                >
                  C
                </span>
                <span className="mt-1 text-[11px] tabular-nums text-foreground/40">68 / 100</span>
              </div>
            </div>

            <div>
              <div className="text-[11px] tracking-[0.18em] text-foreground/35">[ EXAMPLE VERDICT ]</div>
              <p className="mt-2 font-sans text-[15px] font-light leading-snug text-foreground/85">
                This is what a scan looks like — trackers, cookies, and a privacy grade for any site.
              </p>
            </div>
          </div>

          <div>
            <div className="mb-2 text-[11px] tracking-[0.14em]">
              {/* "//" is HUD dressing, not a code comment — see the same braced
                  form in src/app/scanner/results/page.tsx */}
              <span className="text-primary">[ DETECTED ]</span> <span className="text-foreground/35">{"// example"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center gap-2 rounded-lg border border-foreground/10 bg-foreground/[0.02] px-3 py-2">
                <span className="text-[12px] text-foreground/80">Analytics vendor</span>
                <span className="rounded bg-caution/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-caution">ANALYTICS</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-foreground/10 bg-foreground/[0.02] px-3 py-2">
                <span className="text-[12px] text-foreground/80">Ad network</span>
                <span className="rounded bg-destructive/15 px-2 py-0.5 text-[10px] font-medium tracking-wide text-destructive">ADVERTISING</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-3 font-sans text-[12px] text-foreground/40">
        Illustrative example — not a real or simulated scan. Run one above to see live results for any site.
      </p>
    </div>
  )
}
