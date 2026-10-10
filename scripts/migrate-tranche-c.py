#!/usr/bin/env python3
"""Migrate Tranche C SEO landing pages off Card/Badge and legacy tokens."""

from __future__ import annotations

import re
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


def humanize_kicker(text: str) -> str:
    cleaned = text.strip().replace("_", " ")
    if not cleaned:
        return text
    return cleaned[0].upper() + cleaned[1:]


def migrate(content: str) -> str:
    content = re.sub(
        r'import \{ Badge \} from "@/components/ui/badge"\n', "", content
    )
    content = re.sub(
        r'import \{ Card, CardContent, CardHeader, CardTitle \} from "@/components/ui/card"\n',
        "",
        content,
    )

    content = content.replace("tracking-cinematic", "tracking-tight")
    content = re.sub(r"text-muted-foreground/(\d+)", r"text-foreground/\1", content)
    content = content.replace("text-muted-foreground", "text-foreground/55")
    content = content.replace("bg-muted/30", "bg-foreground/[0.02]")
    content = re.sub(r"\bbg-muted\b(?![/\[])", "bg-foreground/[0.03]", content)

    content = content.replace(
        "text-4xl font-medium tracking-tight",
        "text-4xl font-extralight tracking-tight",
    )

    content = re.sub(
        r'<Badge\s+variant="outline"\s+className="[^"]*"\s*>\s*([^<]+?)\s*</Badge>',
        lambda m: (
            '<span className="inline-flex rounded-full border border-primary/25 '
            "bg-primary/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] "
            f'text-primary/90">{humanize_kicker(m.group(1))}</span>'
        ),
        content,
        flags=re.DOTALL,
    )
    content = re.sub(
        r'<Badge variant="outline" className="text-xs font-mono">([^<]+)</Badge>',
        r'<span className="text-xs font-mono rounded-full border border-foreground/10 px-2 py-0.5 text-foreground/55">\1</span>',
        content,
    )
    content = re.sub(
        r'<Badge className="text-xs font-mono">([^<]+)</Badge>',
        r'<span className="text-xs font-mono rounded-full border border-primary/25 bg-primary/5 px-2 py-0.5 text-primary/90">\1</span>',
        content,
    )

    content = re.sub(
        r'<Card key=\{([^}]+)\} className="([^"]+)">',
        r'<div key={\1} className="rounded-xl border bg-background p-5 \2">',
        content,
    )
    content = re.sub(
        r'<Card className="([^"]+)">',
        r'<div className="rounded-xl border bg-background p-5 \1">',
        content,
    )
    content = content.replace("</Card>", "</div>")
    content = content.replace('<CardHeader className="pb-2">', '<div className="mb-3">')
    content = content.replace('<CardHeader className="pb-3">', '<div className="mb-4">')
    content = content.replace("</CardHeader>", "</div>")
    content = content.replace(
        '<CardTitle className="text-base">',
        '<h3 className="text-base font-medium text-foreground/88">',
    )
    content = content.replace("</CardTitle>", "</h3>")
    content = content.replace('<CardContent className="space-y-3">', '<div className="space-y-3">')
    content = content.replace(
        '<CardContent className="flex flex-col flex-1 gap-4">',
        '<div className="flex flex-col flex-1 gap-4">',
    )
    content = content.replace("<CardContent>", "<div>")
    content = content.replace("</CardContent>", "</div>")

    content = content.replace(
        'className="brand2-btn-primary brand2-focus"',
        'className="brand2-btn-primary brand2-focus group"',
    )
    content = content.replace(
        '<ArrowRight className="ml-2 h-4 w-4" />',
        '<ArrowRight className="ml-2 h-4 w-4 brand2-arrow-nudge" aria-hidden />',
    )
    content = content.replace(
        '<ArrowRight className="ml-1.5 h-3 w-3" />',
        '<ArrowRight className="ml-1.5 h-3 w-3 brand2-arrow-nudge" aria-hidden />',
    )

    content = re.sub(
        r">\s*([a-z][a-z0-9_]{2,})\s*</p>\s*\n\s*<h2",
        lambda m: f">{humanize_kicker(m.group(1))}</p>\n            <h2",
        content,
    )

    return content


def main() -> None:
    for rel in PAGES:
        path = ROOT / rel
        if not path.exists():
            print(f"skip missing: {rel}")
            continue
        original = path.read_text()
        updated = migrate(original)
        if updated != original:
            path.write_text(updated)
            print(f"migrated: {rel}")
        else:
            print(f"unchanged: {rel}")


if __name__ == "__main__":
    main()
