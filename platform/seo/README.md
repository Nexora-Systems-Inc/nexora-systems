# Nexora Website Platform — SEO

Reusable SEO and canonical-URL tooling for Nexora marketing sites.

| Module | Role |
|--------|------|
| `site.config.mjs` | **Single source of truth** — host, sitemap paths, retired routes |
| `urls.mjs` | Canonical / absolute / feed URL helpers |
| `structured-data.mjs` | JSON-LD builders bound to `SITE_URL` |
| `generate.mjs` | Writes `public/robots.txt` + `public/sitemap.xml` |
| `verify.mjs` | Build/CI consistency checks (`--live` for HTTP) |
| `vite-plugin.mjs` | HTML placeholder injection + generate on build |

Docs:

- [Canonical URL strategy](../docs/platform/canonical-url.md)
- [Website launch checklist](../docs/platform/website-launch-checklist.md)
