# Website Launch Checklist

Use this checklist for every Nexora client deployment (Surface Renaud, Galerie à Manon, Red Samurai, and future sites).  
Canonical URL rules: [canonical-url.md](./canonical-url.md).

Copy into the project ticket or PR and check items off as you go.

---

## Domain

- [ ] Canonical domain decided and documented in `platform/seo/site.config.mjs` (`DEFAULT_SITE_URL`)
- [ ] `VITE_SITE_URL` in hosting env matches that canonical origin (or is unset so the default applies)
- [ ] Apex and www both configured; non-canonical host **301/308 redirects** to canonical
- [ ] DNS verified (A/ALIAS/CNAME as required by the host)
- [ ] SSL verified (HTTPS padlock, no mixed-content warnings)

## SEO

- [ ] `npm run seo:generate` produces current `robots.txt` + `sitemap.xml`
- [ ] `robots.txt` Sitemap directive points at `{canonical}/sitemap.xml`
- [ ] `sitemap.xml` lists only indexable routes (`SITEMAP_PATHS`); no retired paths
- [ ] Permanent redirects exist for every `RETIRED_PATHS` entry
- [ ] Canonical tags resolve from platform helpers (no hardcoded host in pages)
- [ ] Open Graph + Twitter meta use the same canonical origin and OG image
- [ ] Structured data (Organization / WebSite JSON-LD) uses `SITE_URL`
- [ ] `npm run build` passes `seo:verify` with zero errors
- [ ] Legal “Website:” fields match `SITE_URL`

## Search

- [ ] Google Search Console property created for the **canonical** URL prefix (or Domain property)
- [ ] Bing Webmaster Tools property created for the same host
- [ ] Sitemap submitted: `https://{canonical-host}/sitemap.xml`
- [ ] Homepage URL inspection → requested indexing (when appropriate)
- [ ] No “Invalid sitemap address” / unexpected “Page with redirect” on the canonical homepage

## Analytics

- [ ] Google Analytics (or GA4) ID set via env when required
- [ ] Microsoft Clarity ID set when the client requested it
- [ ] Smoke-test: page view appears in realtime/debug after deploy
- [ ] Cookie/privacy disclosures updated if analytics are enabled

## Performance

- [ ] Lighthouse pass on mobile + desktop (Performance / Accessibility / SEO — note scores)
- [ ] Core Web Vitals reviewed (LCP, INP, CLS) on key templates
- [ ] Broken-link scan on primary nav, footer, and sitemap URLs
- [ ] Mobile responsiveness checked on a real phone or device mode
- [ ] Favicon + OG image resolve over HTTPS on the canonical host

## Post-deploy verification

- [ ] `npm run seo:verify:live` against production
- [ ] Apex URL redirects to canonical (status 301/308, final host correct)
- [ ] Spot-check 3–5 sitemap URLs return HTTP 200 on the canonical host
- [ ] Launch checklist attached to the delivery handoff

---

## Project fill-in

| Field | Value |
|-------|--------|
| Client / site name | |
| Canonical URL | |
| Apex redirect source | |
| Hosting (e.g. Vercel project) | |
| GSC property | |
| Bing property | |
| Deployed at | |
| Verified by | |
