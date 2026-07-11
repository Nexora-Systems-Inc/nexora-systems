/**
 * Generate public/robots.txt and public/sitemap.xml from site.config.
 * Run via: npm run seo:generate  (also hooked into Vite buildStart)
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { resolveSiteUrl, SITEMAP_PATHS } from './site.config.mjs';
import { buildCanonicalUrl, sitemapUrl } from './urls.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');
const publicDir = join(root, 'public');

export function renderRobotsTxt() {
  return ['User-agent: *', 'Allow: /', '', `Sitemap: ${sitemapUrl()}`, ''].join(
    '\n',
  );
}

export function renderSitemapXml() {
  const locs = SITEMAP_PATHS.map(
    (path) => `  <url><loc>${buildCanonicalUrl(path)}</loc></url>`,
  ).join('\n');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    locs,
    '</urlset>',
    '',
  ].join('\n');
}

export function generateSeoFiles({ outDir = publicDir } = {}) {
  mkdirSync(outDir, { recursive: true });
  const robotsPath = join(outDir, 'robots.txt');
  const sitemapPath = join(outDir, 'sitemap.xml');
  writeFileSync(robotsPath, renderRobotsTxt(), 'utf8');
  writeFileSync(sitemapPath, renderSitemapXml(), 'utf8');
  return { robotsPath, sitemapPath, siteUrl: resolveSiteUrl() };
}

const isMain =
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  const result = generateSeoFiles();
  console.log(
    `[seo:generate] Wrote robots.txt + sitemap.xml for ${result.siteUrl}`,
  );
}
