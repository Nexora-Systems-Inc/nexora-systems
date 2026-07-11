/**
 * Nexora Website Platform — site identity & SEO source of truth.
 *
 * Configure DEFAULT_SITE_URL once per project. Do not hardcode the public
 * origin in robots.txt, sitemap.xml, index.html, or page components.
 *
 * Override at build/CI time with VITE_SITE_URL (preferred) or SITE_URL.
 */

function stripTrailingSlash(url) {
  return String(url || '').replace(/\/$/, '');
}

/**
 * Default canonical origin for this project (no trailing slash).
 * This is the only place the public host should be authored.
 */
export const DEFAULT_SITE_URL = 'https://www.nexorasystems.ca';

export function resolveSiteUrl(override) {
  let fromProcess = '';
  if (typeof process !== 'undefined' && process.env) {
    fromProcess = process.env.VITE_SITE_URL || process.env.SITE_URL || '';
  }

  let fromImportMeta = '';
  try {
    // Vite inlines import.meta.env.VITE_SITE_URL in the client bundle
    fromImportMeta = import.meta.env && import.meta.env.VITE_SITE_URL
      ? String(import.meta.env.VITE_SITE_URL)
      : '';
  } catch {
    fromImportMeta = '';
  }

  return stripTrailingSlash(
    override || fromProcess || fromImportMeta || DEFAULT_SITE_URL,
  );
}

/** Resolved canonical origin (prefer resolveSiteUrl() after env is loaded). */
export const SITE_URL = resolveSiteUrl();

export const SITE_NAME = 'Nexora Systems';

export const SITE_TAGLINE = 'Where intelligence comes to life.';

/** Path to the default Open Graph / Twitter image (site-root relative). */
export const DEFAULT_OG_IMAGE = '/og-image.svg';

/**
 * Indexable routes included in sitemap.xml.
 * Keep in sync with React Router paths that should be crawled.
 * Do not list redirects, retired pages, or noindex routes.
 */
export const SITEMAP_PATHS = [
  '/',
  '/services/website-development',
  '/services/web-applications',
  '/services/workflow-automation',
  '/services/ai-receptionists',
  '/services/custom-solutions',
  '/products/crewpilot',
  '/about',
  '/contact',
  '/privacy',
  '/terms',
  '/account-deletion',
];

/**
 * Retired or redirected paths that must never appear in the sitemap.
 * Keep vercel.json (or host redirects) aligned with redirectTo.
 */
export const RETIRED_PATHS = [
  {
    path: '/services/ai-construction',
    redirectTo: '/services/custom-solutions',
  },
];

/** Apex host that must permanently redirect to the canonical SITE_URL host. */
export const APEX_HOST = 'nexorasystems.ca';

export function getCanonicalHost(siteUrl = SITE_URL) {
  return new URL(siteUrl).host;
}

export function getSiteUrl() {
  return resolveSiteUrl();
}
