# Opportunity Reports Architecture

## Purpose

This repository is a **reusable presentation system** for Nexora Systems Business Opportunity Reports — not a one-off client website.

Each report should feel handcrafted while sharing the same structural DNA, visual language, and component library.

## Core idea: content as data, experience as components

```
Report data object  →  ReportPage (section orchestrator)  →  Shared components
```

- **Data** lives in `src/data/reports/<slug>.js`
- **Registry** maps slugs to data in `src/data/registry.js`
- **UI** is industry-agnostic and driven by the data shape
- **Routes** are derived from slugs: `/:slug` and `/:slug/demo`

Adding a new report should eventually mean:

1. Create a report data file
2. Register it
3. Optionally tune brand accents / imagery
4. Ship

No page forks. No copy-paste layouts.

## Report schema (v1)

See `src/lib/reportSchema.js` for the living contract.

Minimum sections:

1. `intro` — purpose of the report
2. `presence` — current online footprint
3. `strengths` — what’s working
4. `opportunities` — missed opportunities (encouraging tone)
5. `recommendations` — actionable next steps
6. `impact` — qualitative potential benefits (no fabricated stats)
7. `preview` — CTA into website concept demo
8. `nextSteps` — soft close

Optional:

- `quotes` — public review excerpts (attributed)
- `theme` — accent / atmosphere overrides per business
- `meta.sources` — notes on what was reviewed publicly

## Why this scales across industries

The section types are consulting primitives, not bakery-specific UI.

| Primitive | Bakery | Dentist | Contractor |
|---|---|---|---|
| Presence channel | Facebook + Google | Google + Health directories | Google + Facebook |
| Strength | Fresh daily baking | Patient reviews | Portfolio photos |
| Opportunity | No daily specials page | No new-patient funnel | No project gallery |
| Recommendation | Fresh Today module | Online booking path | Estimate request flow |

Same components. Different content. Occasional industry-aware icons/labels via data.

## Future: semi-automated report generation

Recommended evolution path (do not build yet):

### Phase A — Authoring kit (now → next)
- Keep reports as versioned JS/JSON modules
- Add a lightweight internal checklist / template generator (CLI or MDX)
- Enforce schema validation in CI

### Phase B — Research assist
- Internal brief form: business name, city, industry, known URLs
- Agent/human research pack → draft report JSON
- Human editor polishes tone before publish

### Phase C — Theme packs
- Industry atmosphere packs (bakery, clinic, trades, retail)
- Shared layout; pack supplies default icons, section microcopy, imagery mood

### Phase D — Optional backend
- CMS or private admin for draft → review → publish
- Auth only for Nexora staff
- Still static publish for prospect-facing URLs

### Decisions that save work later

1. **Never hardcode business copy in components.** Components accept props only.
2. **Keep ratings/channels as structured arrays**, not markdown blobs.
3. **Demo routes stay sibling to reports** (`/:slug/demo`) so concept sites can grow independently.
4. **Tone rules live with content guidelines**, not CSS — encouraging, evidence-based, no invented metrics.
5. **One registry** is the source of truth for available reports.
6. **Theme tokens are CSS variables** overridden per report when needed.
7. **Prefer fewer section types with richer data** over many one-off section components.

## Repository note

This app currently lives under `opportunity-reports/` inside the Nexora Systems workspace for delivery constraints.

Long-term home should be a dedicated repository:

`nexora-opportunity-reports`

Extraction should be straightforward: this folder is already a standalone Vite app with its own `package.json`, routes, and docs.
