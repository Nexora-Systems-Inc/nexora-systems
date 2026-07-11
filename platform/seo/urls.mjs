/**
 * URL helpers — always derive absolute public URLs from site.config.
 */
import {
  DEFAULT_OG_IMAGE,
  SITEMAP_PATHS,
  resolveSiteUrl,
} from './site.config.mjs';

function origin() {
  return resolveSiteUrl();
}

/** Absolute canonical URL for a pathname (leading slash required except `/`). */
export function buildCanonicalUrl(pathname = '/') {
  const base = origin();
  const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '') || '/';
  if (path === '/') return `${base}/`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Absolute URL for any site-root path (asset, feed, etc.). */
export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${origin()}${normalized}`;
}

export function defaultOgImageUrl() {
  return absoluteUrl(DEFAULT_OG_IMAGE);
}

export function sitemapUrl() {
  return absoluteUrl('/sitemap.xml');
}

export function robotsSitemapDirective() {
  return `Sitemap: ${sitemapUrl()}`;
}

/** All absolute loc values that belong in sitemap.xml. */
export function sitemapLocs() {
  return SITEMAP_PATHS.map((path) => buildCanonicalUrl(path));
}

/** Absolute feed URL helper for future RSS/Atom support. */
export function feedUrl(path = '/feed.xml') {
  return absoluteUrl(path);
}
