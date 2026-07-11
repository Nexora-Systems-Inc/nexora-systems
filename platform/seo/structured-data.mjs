/**
 * JSON-LD builders — always use resolveSiteUrl() from site.config.
 * Wire into pages via <script type="application/ld+json"> when needed.
 */
import {
  SITE_NAME,
  SITE_TAGLINE,
  DEFAULT_OG_IMAGE,
  resolveSiteUrl,
} from './site.config.mjs';
import { absoluteUrl, buildCanonicalUrl } from './urls.mjs';

export function organizationJsonLd({
  email = 'info@nexorasystems.ca',
  logoPath = DEFAULT_OG_IMAGE,
} = {}) {
  const siteUrl = resolveSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${siteUrl}/`,
    logo: absoluteUrl(logoPath),
    email,
    description: SITE_TAGLINE,
  };
}

export function websiteJsonLd() {
  const siteUrl = resolveSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${siteUrl}/`,
    description: SITE_TAGLINE,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: `${siteUrl}/`,
    },
  };
}

export function webPageJsonLd({ pathname = '/', name, description } = {}) {
  const siteUrl = resolveSiteUrl();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url: buildCanonicalUrl(pathname),
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_NAME,
      url: `${siteUrl}/`,
    },
  };
}

export function toJsonLdScript(data) {
  return JSON.stringify(data);
}
