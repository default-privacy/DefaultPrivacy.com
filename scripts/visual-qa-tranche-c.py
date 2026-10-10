#!/usr/bin/env python3
"""Visual QA fixes for Tranche C SEO pages."""

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

PAGES = [
    "src/app/llc-for-content-creators/page.tsx",
    "src/app/llc-for-digital-nomads/page.tsx",
    "src/app/llc-for-new-business/page.tsx",
    "src/app/llc-for-real-estate-investors/page.tsx",
    "src/app/asset-protection-for-doctors/page.tsx",
    "src/app/business-structure-for-ecommerce/page.tsx",
    "src/app/crypto-trading-entity-setup/page.tsx",
    "src/app/entity-restructure/page.tsx",
    "src/app/multi-business-entity-structure/page.tsx",
    "src/app/high-risk-privacy-protection/page.tsx",
    "src/app/emergency-asset-protection/page.tsx",
    "src/app/privacy-advocate/page.tsx",
    "src/app/s-corp-for-freelancers/page.tsx",
]

HERO_OLD = """      <section className="container pt-14 pb-10">
        <div className="max-w-3xl mx-auto text-center space-y-5">"""

HERO_NEW = """      <section className="container py-20 md:py-28">
        <motion.div className="mx-auto max-w-3xl rounded-2xl border border-foreground/10 bg-foreground/[0.02] px-6 py-14 text-center space-y-5 md:px-10 md:py-16">"""

HERO_NEW = HERO_NEW.replace("motion.div", "d" + "iv")


def fix(content: str) -> str:
    content = content.replace(HERO_OLD, HERO_NEW)

    pairs = [
        (
            "rounded-xl border bg-background p-5 border-foreground/10",
            "rounded-xl border border-foreground/10 bg-background p-5",
        ),
        (
            "rounded-xl border bg-background p-5 border-destructive/30",
            "rounded-xl border border-destructive/30 bg-background p-5",
        ),
        (
            "rounded-xl border bg-background p-5 border-destructive/20",
            "rounded-xl border border-destructive/20 bg-background p-5",
        ),
        (
            "rounded-xl border bg-background p-5 border-caution/30",
            "rounded-xl border border-caution/30 bg-background p-5",
        ),
        ("rounded-xl border bg-background p-5 border ", "rounded-xl bg-background p-5 "),
    ]
    for old, new in pairs:
        content = content.replace(old, new)

    price_pill = (
        "inline-flex rounded-full border border-primary/25 bg-primary/5 px-3 py-1 "
        "text-[10px] font-mono uppercase tracking-[0.3em] text-primary/90"
    )
    price_neutral = (
        "text-xs font-mono rounded-full border border-foreground/10 px-2 py-0.5 text-foreground/55"
    )
    content = content.replace(f'<span className="{price_pill}">', f'<span className="{price_neutral}">')

    return content


def main() -> None:
    for rel in PAGES:
        path = ROOT / rel
        orig = path.read_text()
        upd = fix(orig)
        if upd != orig:
            path.write_text(upd)
            print("fixed:", rel)


if __name__ == "__main__":
    main()
