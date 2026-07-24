# Nexora Opportunity Reports

Premium interactive **Business Opportunity Reports** for Nexora Systems prospects.

This is not a client website. It is a reusable presentation system that:

1. Educates a prospective client
2. Reflects their current public online presence
3. Highlights strengths and opportunities
4. Offers clear recommendations
5. Invites them to preview a tailored website concept

## Stack

- React 18 + Vite
- React Router v6
- Custom CSS design tokens (no Tailwind)
- Static-only for this phase (no backend, CMS, auth, or analytics)

## Quick start

```bash
cd opportunity-reports
npm install
npm run dev
```

Open the local URL shown by Vite (default port `5174`).

## Routes

| Path | Purpose |
|---|---|
| `/` | Report index |
| `/le-petit-pain` | First opportunity report |
| `/le-petit-pain/demo` | Website concept placeholder |

Future businesses follow the same pattern: `/:slug` and `/:slug/demo`.

## Architecture at a glance

```
src/
  data/reports/     # One content module per business
  data/registry.js  # Slug → report map
  components/report # Reusable presentation primitives
  pages/ReportPage  # Section orchestrator (no business-specific forks)
  lib/reportSchema  # Living content contract
```

**Content as data. Experience as components.**

Adding a new report should mean creating a data file and registering it — not cloning a page.

Deep-dive: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## Le Petit Pain

First implementation: **Bakery Le Petit Pain** (Hawkesbury, Ontario).

Research used only publicly available listings and reviews. Unsupported history and fabricated statistics are intentionally omitted.

## Repository status

Recommended long-term repository name:

`nexora-opportunity-reports`

This app currently ships as a standalone Vite project under `opportunity-reports/` so it can be extracted cleanly when a dedicated GitHub repository is available.

## Deploy

```bash
cd opportunity-reports
npm run build
```

Static output is written to `dist/`. Configure the host’s root directory to `opportunity-reports` (or deploy this folder as its own project). SPA fallback should rewrite to `index.html` (see `vercel.json`).
