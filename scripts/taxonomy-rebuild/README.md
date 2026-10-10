# Directory taxonomy rebuild (2026-07-09)

Rebuilt the directory from **153 flat, uneven categories** into a **2-level taxonomy: 17 groups → 120 specific subcategories**. Restores the v1/v4 grouping that v5's import flattened, dissolves catch-alls, splits OSINT, merges duplicates, adds a Legal & Asset Protection group. **0 tools lost** (all 875 stay categorized).

## Files
- **`SPEC.md`** — the human-readable design (groups, subcategories, rules, decisions).
- **`taxonomy.json`** — machine config: 17 groups, 120 canonical subcategories, and the disposition of every one of the 153 old categories (keep / merge / dissolve / drop / split).
- **`ai-assignments.json`** — the 93 tools that lived only in dissolved/split buckets, re-filed into subcategories by an AI classification pass (schema-validated, spot-checked).
- **`migration.sql`** — the applied rebuild (atomic `BEGIN…COMMIT`): wipes + rebuilds `categories` (17 groups + 120 subcats via `parent_id`) and `tools_to_categories` (880 memberships).
- **`1-build-taxonomy.mjs`** / **`2-gen-migration.mjs`** — the generators (as-run; read `/tmp` inputs derived from the DB). Kept for provenance/reproducibility, not turnkey re-runnable.

## Applied to
**Local Docker only** (`dp-v5-pg`). Verified live: 17 groups, subcategory filtering works (OSINT→121, Frameworks→33), 875/875 tools categorized.

## Applying to Neon (prod) — DO NOT run blind
`migration.sql` **deletes and rebuilds** `categories` + `tools_to_categories`, and its membership rows reference **tool ids**. It is safe on prod **only if prod's tool ids match local** (both were imported from the same v4 source, so they should — but verify first):

```sql
-- sanity: do the 880 tool ids in migration.sql all exist on prod?
-- spot-check a few, and confirm published tool count == 875 before running.
```

Apply from this box via Neon's HTTP `/sql` (`curl -4`) or from a Vercel/CI job with `DATABASE_URL`. Take a categories/junction backup first (see `pg_dump --data-only -t categories -t tools_to_categories`). Gated on owner approval.

## Companion code change
`src/lib/db/queries.ts` `getCategoryGroups()` — removed the self-injected parent item (the old "self-clone"); groups now render only their child subcategories.
