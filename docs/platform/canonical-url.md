# Canonical URL Strategy

## Why a single canonical host

Search engines treat `https://example.com` and `https://www.example.com` as different origins. If redirects, `<link rel="canonical">`, `robots.txt`, and `sitemap.xml` disagree, you get:

- Search Console “Invalid sitemap address”
- Homepage reported as “Page with redirect”
- Diluted ranking signals across host variants

**Nexora standard:** pick one HTTPS host and use it everywhere.

For Vercel-hosted sites we prefer the **www** host as primary (for example `https://www.nexorasystems.ca`), with the apex domain permanently redirecting to it. Vercel’s CDN and DNS model work best when www is primary.

## Where the value is configured

| Layer | Location |
|-------|----------|
| **Source of truth** | `platform/seo/site.config.mjs` → `DEFAULT_SITE_URL` |
| **Runtime override** | `VITE_SITE_URL` (or `SITE_URL`) in env / Vercel project settings |
| **URL helpers** | `platform/seo/urls.mjs` (`buildCanonicalUrl`, `absoluteUrl`, `feedUrl`, …) |
| **Generated files** | `public/robots.txt`, `public/sitemap.xml` via `npm run seo:generate` |
| **HTML shell** | `index.html` placeholders (`__CANONICAL_URL__`, `__OG_IMAGE_URL__`, …) filled by `nexoraSeoPlugin` |
| **In-app meta** | `src/hooks/usePageMeta.js` + `src/seo/pageMeta.js` |
| **Structured data** | `platform/seo/structured-data.mjs` |
| **Verification** | `npm run seo:verify` (runs after `vite build`) |

Do **not** hardcode the public origin in page components, legal copy (except the Website field which must match config), or static SEO files. Edit `site.config.mjs` (or env), then regenerate.

## How future projects inherit this

1. Copy the `platform/seo/` directory into the new site (or start from this template).
2. Set `DEFAULT_SITE_URL` (and `APEX_HOST`, `SITEMAP_PATHS`, `RETIRED_PATHS`) in `site.config.mjs`.
3. Wire `nexoraSeoPlugin()` in `vite.config.js`.
4. Add package scripts:

```json
{
  "seo:generate": "node platform/seo/generate.mjs",
  "seo:verify": "node platform/seo/verify.mjs",
  "seo:verify:live": "node platform/seo/verify.mjs --live",
  "prebuild": "node platform/seo/generate.mjs",
  "build": "vite build && node platform/seo/verify.mjs"
}
```

5. Use `__CANONICAL_URL__` / `__OG_IMAGE_URL__` / `__SITE_NAME__` placeholders in `index.html` instead of absolute URLs.
6. Import `SITE_URL` / `buildCanonicalUrl` from the platform modules — never duplicate the host string.
7. Complete [Website Launch Checklist](./website-launch-checklist.md) before go-live.
8. After deploy, run `npm run seo:verify:live`.

Project-specific content (copy, routes, branding) changes per client. Canonical host machinery should not.

## Common mistakes to avoid

1. **Hand-editing `robots.txt` or `sitemap.xml`** — they are generated; changes are overwritten and drift from config.
2. **Setting `VITE_SITE_URL` to the non-canonical host** in Vercel while Domains redirect to www (or the reverse).
3. **Submitting the apex sitemap URL** in Search Console when the property is www (or the reverse).
4. **Leaving retired routes in `SITEMAP_PATHS`** after removing nav links — add them to `RETIRED_PATHS` and a permanent redirect instead.
5. **Hardcoding `https://…` in `index.html` or OG tags** — use `__CANONICAL_URL__` / `__OG_IMAGE_URL__`.
6. **Mixing www and non-www** in legal “Website:” fields, ads, or email signatures.
7. **Skipping `seo:verify`** in CI — the build must fail on host drift.
8. **Assuming SPA rewrite = indexed URL** — only paths in `SITEMAP_PATHS` are declared indexable.

## Commands

```bash
npm run seo:generate      # write robots.txt + sitemap.xml from config
npm run seo:verify        # static consistency checks (also runs after build)
npm run seo:verify:live   # also HTTP-check canonical sitemap URLs after deploy
npm run build             # generate → vite build → verify
```
