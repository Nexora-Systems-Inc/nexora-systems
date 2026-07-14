# Nexora Systems V2

## Stack
- React 18 + Vite
- React Router v6
- Custom CSS (no Tailwind — full design token control)
- Google Fonts: Cormorant Garamond (display) + Montserrat (body)

## Getting Started

```bash
npm install
npm run dev
```

Production build (generates SEO files and runs verification):

```bash
npm run build
```

---

## Platform SEO

Canonical host, sitemap, and robots.txt are owned by `platform/seo/`.

- Config: `platform/seo/site.config.mjs`
- Docs: [Canonical URL strategy](docs/platform/canonical-url.md) · [Launch checklist](docs/platform/website-launch-checklist.md)
- Commands: `npm run seo:generate` · `npm run seo:verify` · `npm run seo:verify:live`

---

## Folder Structure

```
nexora-v2/
├── index.html
├── vite.config.js
├── package.json
├── api/
│   ├── contact.js                  # Contact form Resend endpoint
│   └── _lib/contact.js             # Validation + email builders
├── platform/seo/                   # Canonical URL + SEO generate/verify
├── docs/platform/                  # Canonical strategy + launch checklist
└── src/
    ├── main.jsx                        # React entry point
    ├── App.jsx                         # Router + LangProvider wrapper
    ├── index.css                       # Global design tokens + utility classes
    ├── context/
    │   └── LangContext.jsx             # EN/FR language context + useLang hook
    ├── i18n/
    │   └── translations.js             # All EN + FR string content
    ├── components/
    │   └── layout/
    │       ├── Layout.jsx              # Navbar + children + Footer
    │       ├── Navbar.jsx + .css       # Fixed top nav with services dropdown + EN|FR toggle
    │       └── Footer.jsx + .css       # Footer with nav links and branding
    └── pages/
        ├── HomePage.jsx + .css         # Full homepage
        ├── AboutPage.jsx               # About page
        ├── ContactPage.jsx             # Contact form
        └── services/
            ├── WebsiteDevelopment.jsx + .css   # FULL PAGE — packages, maintenance, comparison, pricing, addons, notes
            ├── ServiceScaffold.jsx + .css       # Reusable scaffold for service pages
            └── OtherServicePages.jsx            # Web Apps, Workflow, AI Receptionists, Custom Solutions
```

---

## Routes

| Path | Component |
|------|-----------|
| `/` | HomePage |
| `/services/website-development` | WebsiteDevelopment |
| `/services/web-applications` | WebApplicationsPage |
| `/services/workflow-automation` | WorkflowAutomationPage |
| `/services/ai-receptionists` | AIReceptionistsPage |
| `/services/custom-solutions` | CustomSolutionsPage |
| `/about` | AboutPage |
| `/contact` | ContactPage |

---

## Design System

Defined in `src/index.css` as CSS variables:

| Token | Value |
|-------|-------|
| `--gold` | `#C9A84C` |
| `--gold-light` | `#E8C96D` |
| `--gold-dark` | `#9A7A30` |
| `--black` | `#0A0A0A` |
| `--font-display` | Cormorant Garamond |
| `--font-body` | Montserrat |

### Global Utility Classes
- `.btn-gold` — gold filled button
- `.btn-outline` — white outline button (for dark bg)
- `.btn-outline-dark` — gold outline button (for light bg)
- `.section-label` — uppercase gold label
- `.gold-divider` — horizontal gold rule with diamond
- `.page-hero` — black section with watermark N
- `.container` — 1180px max-width centered wrapper

---

## Bilingual System

The `LangContext` provides `{ lang, setLang, t }` via `useLang()` hook.

- `lang` is `'en'` or `'fr'`
- `t` is the full translation object for the current language
- All page strings are in `src/i18n/translations.js`
- The EN|FR toggle in the navbar updates context globally

---

## Design Language Reference

Source: NXS-005 and NXS-006 document packages

- Black header sections with subtle gold N watermark
- Gold accents (`#C9A84C`)
- White / off-white content backgrounds
- Cormorant Garamond for display headings
- Montserrat for body, labels, navigation
- Rounded cards with 1px borders
- Gold checkmarks throughout
- Package comparison table with gold featured column
- Executive spacing (80px section padding)

---

## Expanding Service Pages

Each service page under `OtherServicePages.jsx` uses `ServiceScaffold`.

To fully build a page:
1. Create `src/pages/services/[PageName].jsx`
2. Import and use design components from WebsiteDevelopment as reference
3. Add translations to `src/i18n/translations.js`
4. Update route in `App.jsx`

---

## Contact Form

The contact page posts to a Vercel serverless endpoint (`POST /api/contact`) that
validates/sanitizes the payload and delivers it with Resend.

Required server environment variables (never use a `VITE_` prefix):

| Variable | Purpose |
|----------|---------|
| `RESEND_API_KEY` | Resend API key |
| `CONTACT_TO_EMAIL` | Destination inbox (e.g. `info@nexorasystems.ca`) |
| `RESEND_FROM_EMAIL` | Verified sender, e.g. `Nexora Systems <noreply@nexorasystems.ca>` |

Local API testing needs `vercel dev` (or equivalent) so `/api/contact` is available.
Helper checks: `npm run test:contact`.

---

## Assets

Place the Nexora logo files in `src/assets/`:
- `logo-full.png` (Nexora Systems full logo with text)
- `logo-n.png` (Gold N mark only)

Reference in components as:
```jsx
import logoFull from '../assets/logo-full.png';
```
