/**
 * Vite plugin — keeps HTML meta and public SEO files aligned with site.config.
 *
 * - Replaces %SITE_URL% / %SITE_NAME% placeholders in index.html
 * - Regenerates public/robots.txt and public/sitemap.xml on buildStart
 */
import {
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  resolveSiteUrl,
} from './site.config.mjs';
import { generateSeoFiles } from './generate.mjs';
import { absoluteUrl, buildCanonicalUrl } from './urls.mjs';

export function nexoraSeoPlugin() {
  return {
    name: 'nexora-seo',
    buildStart() {
      const result = generateSeoFiles();
      this.info?.(
        `[nexora-seo] Generated robots.txt + sitemap.xml for ${result.siteUrl}`,
      );
    },
    transformIndexHtml(html) {
      const siteUrl = resolveSiteUrl();
      const home = buildCanonicalUrl('/');
      const ogImage = absoluteUrl(DEFAULT_OG_IMAGE);

      return html
        .replaceAll('__SITE_URL__', siteUrl)
        .replaceAll('__SITE_NAME__', SITE_NAME)
        .replaceAll('__CANONICAL_URL__', home)
        .replaceAll('__OG_IMAGE_URL__', ogImage);
    },
  };
}

export default nexoraSeoPlugin;
