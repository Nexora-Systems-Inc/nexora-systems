/**
 * SEO consistency verification for Nexora website platform builds.
 *
 * Usage:
 *   node platform/seo/verify.mjs           # static checks (fail build on error)
 *   node platform/seo/verify.mjs --live    # also HTTP-check sitemap URLs
 *   SEO_VERIFY_LIVE=1 node platform/seo/verify.mjs
 *
 * Exit code 1 on any error. Warnings print but do not fail unless --strict-warnings.
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import {
  SITEMAP_PATHS,
  RETIRED_PATHS,
  APEX_HOST,
  getCanonicalHost,
  resolveSiteUrl,
} from './site.config.mjs';
import { renderRobotsTxt, renderSitemapXml } from './generate.mjs';
import { buildCanonicalUrl, sitemapUrl as expectedSitemapUrl } from './urls.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '../..');

const args = new Set(process.argv.slice(2));
const live =
  args.has('--live') ||
  process.env.SEO_VERIFY_LIVE === '1' ||
  process.env.SEO_VERIFY_LIVE === 'true';
const strictWarnings = args.has('--strict-warnings');

const errors = [];
const warnings = [];

function fail(message) {
  errors.push(message);
}

function warn(message) {
  warnings.push(message);
}

function read(path) {
  return readFileSync(path, 'utf8');
}

function parseSitemapLocs(xml) {
  const locs = [];
  const re = /<loc>\s*([^<]+?)\s*<\/loc>/gi;
  let match;
  while ((match = re.exec(xml))) {
    locs.push(match[1].trim());
  }
  return locs;
}

function parseRobotsSitemap(txt) {
  const match = txt.match(/^Sitemap:\s*(\S+)/im);
  return match ? match[1].trim() : null;
}

function collectFiles(dir, exts, acc = []) {
  if (!existsSync(dir)) return acc;
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git') continue;
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) collectFiles(full, exts, acc);
    else if (exts.some((ext) => name.endsWith(ext))) acc.push(full);
  }
  return acc;
}

function hostVariants(canonicalHost) {
  const withoutWww = canonicalHost.replace(/^www\./, '');
  const withWww = canonicalHost.startsWith('www.')
    ? canonicalHost
    : `www.${canonicalHost}`;
  return { withWww, withoutWww, canonicalHost };
}

/** Extract React Router path strings from App.jsx */
function extractAppRoutes(appSource) {
  const paths = new Set();
  const re = /path=["']([^"']+)["']/g;
  let match;
  while ((match = re.exec(appSource))) {
    if (match[1] !== '*') paths.add(match[1]);
  }
  return paths;
}

/** Extract PAGE_META keys from pageMeta.js */
function extractPageMetaKeys(source) {
  const keys = new Set();
  const re = /^\s*['"](\/[^'"]*)['"]\s*:/gm;
  let match;
  while ((match = re.exec(source))) {
    keys.add(match[1]);
  }
  return keys;
}

async function fetchStatus(url) {
  const res = await fetch(url, {
    method: 'GET',
    redirect: 'manual',
    headers: { 'user-agent': 'NexoraSEOVerify/1.0' },
  });
  return { status: res.status, location: res.headers.get('location') };
}

async function resolveFinalUrl(url, maxHops = 5) {
  let current = url;
  for (let i = 0; i < maxHops; i++) {
    const { status, location } = await fetchStatus(current);
    if (status >= 300 && status < 400 && location) {
      current = new URL(location, current).href;
      continue;
    }
    return { status, url: current };
  }
  return { status: 0, url: current };
}

function verifyConfigBasics() {
  const SITE_URL = resolveSiteUrl();
  if (!SITE_URL.startsWith('https://')) {
    fail(`SITE_URL must use https:// (got ${SITE_URL})`);
  }
  if (SITE_URL.endsWith('/')) {
    fail(`SITE_URL must not have a trailing slash (got ${SITE_URL})`);
  }

  const host = getCanonicalHost(SITE_URL);
  if (host === APEX_HOST && !host.startsWith('www.')) {
    warn(
      `Canonical host is apex (${host}). Vercel recommends www as primary for CDN control.`,
    );
  }

  const retired = new Set(RETIRED_PATHS.map((r) => r.path));
  for (const path of SITEMAP_PATHS) {
    if (retired.has(path)) {
      fail(`Retired path ${path} must not be listed in SITEMAP_PATHS`);
    }
    if (!path.startsWith('/')) {
      fail(`SITEMAP_PATHS entry must start with / (got ${path})`);
    }
  }
}

function verifyGeneratedFiles() {
  const publicRobots = join(root, 'public/robots.txt');
  const publicSitemap = join(root, 'public/sitemap.xml');
  const distRobots = join(root, 'dist/robots.txt');
  const distSitemap = join(root, 'dist/sitemap.xml');

  const robotsPath = existsSync(distRobots) ? distRobots : publicRobots;
  const sitemapPath = existsSync(distSitemap) ? distSitemap : publicSitemap;

  if (!existsSync(robotsPath)) fail(`Missing robots.txt at ${robotsPath}`);
  if (!existsSync(sitemapPath)) fail(`Missing sitemap.xml at ${sitemapPath}`);

  if (!existsSync(robotsPath) || !existsSync(sitemapPath)) return;

  const robots = read(robotsPath);
  const sitemap = read(sitemapPath);
  const expectedRobots = renderRobotsTxt();
  const expectedSitemap = renderSitemapXml();

  const robotsSitemap = parseRobotsSitemap(robots);
  if (robotsSitemap !== expectedSitemapUrl()) {
    fail(
      `robots.txt Sitemap must be ${expectedSitemapUrl()} (got ${robotsSitemap || 'none'})`,
    );
  }

  if (robots.trim() !== expectedRobots.trim()) {
    fail(
      'robots.txt is out of sync with site.config — run npm run seo:generate',
    );
  }

  if (sitemap.trim() !== expectedSitemap.trim()) {
    fail(
      'sitemap.xml is out of sync with site.config — run npm run seo:generate',
    );
  }

  const locs = parseSitemapLocs(sitemap);
  const expectedLocs = SITEMAP_PATHS.map((p) => buildCanonicalUrl(p));

  if (locs.length !== expectedLocs.length) {
    fail(
      `sitemap.xml has ${locs.length} URLs but SITEMAP_PATHS has ${expectedLocs.length}`,
    );
  }

  const canonicalHost = getCanonicalHost(resolveSiteUrl());
  for (const loc of locs) {
    let parsed;
    try {
      parsed = new URL(loc);
    } catch {
      fail(`Invalid sitemap loc: ${loc}`);
      continue;
    }
    if (parsed.host !== canonicalHost) {
      fail(`Sitemap URL host mismatch: ${loc} (expected host ${canonicalHost})`);
    }
    if (parsed.protocol !== 'https:') {
      fail(`Sitemap URL must be https: ${loc}`);
    }
  }

  for (const retired of RETIRED_PATHS) {
    const retiredLoc = buildCanonicalUrl(retired.path);
    if (locs.includes(retiredLoc) || locs.some((l) => l.endsWith(retired.path))) {
      fail(`Retired path still in sitemap: ${retired.path}`);
    }
  }

  for (const expected of expectedLocs) {
    if (!locs.includes(expected)) {
      fail(`Missing sitemap loc: ${expected}`);
    }
  }
}

function verifyRoutesAndMeta() {
  const appPath = join(root, 'src/App.jsx');
  const metaPath = join(root, 'src/seo/pageMeta.js');

  if (!existsSync(appPath)) {
    fail('src/App.jsx not found');
    return;
  }
  if (!existsSync(metaPath)) {
    fail('src/seo/pageMeta.js not found');
    return;
  }

  const appRoutes = extractAppRoutes(read(appPath));
  const metaKeys = extractPageMetaKeys(read(metaPath));

  for (const path of SITEMAP_PATHS) {
    if (!appRoutes.has(path)) {
      fail(`Sitemap path ${path} has no matching <Route> in App.jsx`);
    }
    if (!metaKeys.has(path)) {
      fail(`Sitemap path ${path} has no PAGE_META entry in pageMeta.js`);
    }
  }

  for (const retired of RETIRED_PATHS) {
    if (appRoutes.has(retired.path)) {
      warn(
        `Retired path ${retired.path} still has a Route — prefer redirect-only (vercel.json)`,
      );
    }
    if (metaKeys.has(retired.path)) {
      warn(`Retired path ${retired.path} still has PAGE_META — remove it`);
    }
  }
}

function verifyNoMixedHosts() {
  const canonicalHost = getCanonicalHost(resolveSiteUrl());
  const { withWww, withoutWww } = hostVariants(canonicalHost);
  const wrongHost = canonicalHost.startsWith('www.') ? withoutWww : withWww;

  const scanRoots = [
    join(root, 'public'),
    join(root, 'src'),
    join(root, 'index.html'),
    join(root, 'docs'),
    join(root, 'platform'),
  ];
  if (existsSync(join(root, 'dist'))) scanRoots.push(join(root, 'dist'));

  const files = [];
  for (const target of scanRoots) {
    if (!existsSync(target)) continue;
    const st = statSync(target);
    if (st.isFile()) files.push(target);
    else collectFiles(target, ['.html', '.js', '.jsx', '.mjs', '.txt', '.xml', '.md', '.css'], files);
  }

  // Allowlisted patterns that may mention the apex/email/app hosts without being public site URLs
  const allow = [
    /mailto:/i,
    /app\.nexorasystems\.ca/i,
    /info@nexorasystems\.ca/i,
    /APEX_HOST/,
    /nexorasystems\.ca'/,  // apex redirect source in vercel / config comments
    /"nexorasystems\.ca"/,
    /value": "nexorasystems\.ca"/,
    /host", "value": "nexorasystems\.ca"/,
  ];

  const wrongAbsolute = new RegExp(
    `https?://${wrongHost.replace(/\./g, '\\.')}(?![a-z0-9-])`,
    'gi',
  );

  for (const file of files) {
    const rel = relative(root, file).replace(/\\/g, '/');
    // Config that intentionally documents the apex redirect source
    if (rel === 'vercel.json' || rel.endsWith('site.config.mjs')) continue;
    if (rel.includes('platform/seo/verify.mjs')) continue;
    if (rel.includes('docs/platform/')) continue; // docs may show examples

    const content = read(file);
    const matches = content.match(wrongAbsolute);
    if (!matches) continue;

    const suspicious = matches.filter((m) => {
      const idx = content.indexOf(m);
      const window = content.slice(Math.max(0, idx - 40), idx + m.length + 40);
      return !allow.some((re) => re.test(window));
    });

    if (suspicious.length) {
      fail(
        `Non-canonical host URL(s) in ${rel}: ${[...new Set(suspicious)].join(', ')} (canonical is https://${canonicalHost})`,
      );
    }
  }
}

function verifyIndexHtml() {
  const distIndex = join(root, 'dist/index.html');
  const srcIndex = join(root, 'index.html');
  const indexPath = existsSync(distIndex) ? distIndex : srcIndex;

  if (!existsSync(indexPath)) {
    fail('index.html not found');
    return;
  }

  const html = read(indexPath);
  const isDist = indexPath === distIndex;
  const expectedHome = buildCanonicalUrl('/');

  if (
    html.includes('__SITE_URL__') ||
    html.includes('__CANONICAL_URL__') ||
    html.includes('%SITE_URL%') ||
    html.includes('%CANONICAL_URL%')
  ) {
    if (isDist) {
      fail('dist/index.html still contains unresolved SEO placeholders');
    }
    return;
  }

  const canonical =
    html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) ||
    html.match(/href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  const ogUrl =
    html.match(/property=["']og:url["'][^>]*content=["']([^"']+)["']/i) ||
    html.match(/content=["']([^"']+)["'][^>]*property=["']og:url["']/i);

  if (canonical && canonical[1] !== expectedHome) {
    fail(`index.html canonical is ${canonical[1]} (expected ${expectedHome})`);
  } else if (!canonical) {
    fail('index.html missing rel=canonical');
  }

  if (ogUrl && ogUrl[1] !== expectedHome) {
    fail(`index.html og:url is ${ogUrl[1]} (expected ${expectedHome})`);
  }
}

function verifyLegalWebsiteFields() {
  const SITE_URL = resolveSiteUrl();
  const legalDir = join(root, 'docs/legal');
  if (!existsSync(legalDir)) return;

  for (const file of collectFiles(legalDir, ['.md'])) {
    const content = read(file);
    const matches = [...content.matchAll(/\*\*Website:\*\*\s*(\S+)/g)];
    for (const match of matches) {
      const url = match[1].replace(/\/$/, '');
      if (url !== SITE_URL) {
        fail(
          `Legal Website field in ${relative(root, file)} is ${match[1]} (expected ${SITE_URL})`,
        );
      }
    }
  }
}

function verifyVercelRedirects() {
  const SITE_URL = resolveSiteUrl();
  const vercelPath = join(root, 'vercel.json');
  if (!existsSync(vercelPath)) {
    warn('vercel.json missing — ensure apex→canonical host redirect is configured in the host dashboard');
    return;
  }

  const vercel = JSON.parse(read(vercelPath));
  const redirects = vercel.redirects || [];
  const hostRedirect = redirects.find(
    (r) =>
      Array.isArray(r.has) &&
      r.has.some((h) => h.type === 'host' && h.value === APEX_HOST),
  );

  if (!hostRedirect) {
    warn(
      `vercel.json has no host redirect from ${APEX_HOST} — confirm Vercel Domains redirects to ${SITE_URL}`,
    );
  } else if (!String(hostRedirect.destination).startsWith(SITE_URL)) {
    fail(
      `Apex host redirect destination must target ${SITE_URL} (got ${hostRedirect.destination})`,
    );
  }

  for (const retired of RETIRED_PATHS) {
    const rule = redirects.find((r) => r.source === retired.path);
    if (!rule) {
      fail(
        `Missing permanent redirect for retired path ${retired.path} → ${retired.redirectTo}`,
      );
    } else if (rule.destination !== retired.redirectTo) {
      fail(
        `Retired path ${retired.path} redirects to ${rule.destination} (expected ${retired.redirectTo})`,
      );
    }
  }
}

async function verifyLiveUrls() {
  const SITE_URL = resolveSiteUrl();
  const canonicalHost = getCanonicalHost(SITE_URL);
  console.log(`[seo:verify] Live checks against ${SITE_URL} …`);

  const robotsLive = await resolveFinalUrl(`${SITE_URL}/robots.txt`);
  if (robotsLive.status !== 200) {
    fail(`Live robots.txt returned ${robotsLive.status}`);
  } else {
    const res = await fetch(`${SITE_URL}/robots.txt`);
    const text = await res.text();
    const sm = parseRobotsSitemap(text);
    if (sm !== expectedSitemapUrl()) {
      fail(`Live robots.txt Sitemap is ${sm} (expected ${expectedSitemapUrl()})`);
    }
  }

  const sitemapLive = await resolveFinalUrl(`${SITE_URL}/sitemap.xml`);
  if (sitemapLive.status !== 200) {
    fail(`Live sitemap.xml returned ${sitemapLive.status}`);
  } else {
    const res = await fetch(`${SITE_URL}/sitemap.xml`);
    const xml = await res.text();
    const locs = parseSitemapLocs(xml);
    for (const loc of locs) {
      const result = await resolveFinalUrl(loc);
      if (result.status !== 200) {
        fail(`Sitemap URL ${loc} returned HTTP ${result.status}`);
      } else {
        const finalHost = new URL(result.url).host;
        if (finalHost !== canonicalHost) {
          fail(
            `Sitemap URL ${loc} resolved to non-canonical host ${finalHost}`,
          );
        }
      }
    }
  }
}

async function main() {
  const SITE_URL = resolveSiteUrl();
  console.log(`[seo:verify] Canonical SITE_URL = ${SITE_URL}`);

  verifyConfigBasics();
  verifyGeneratedFiles();
  verifyRoutesAndMeta();
  verifyNoMixedHosts();
  verifyIndexHtml();
  verifyLegalWebsiteFields();
  verifyVercelRedirects();

  if (live) {
    await verifyLiveUrls();
  } else {
    console.log(
      '[seo:verify] Skipping live HTTP checks (pass --live or SEO_VERIFY_LIVE=1 after deploy)',
    );
  }

  for (const w of warnings) {
    console.warn(`  WARN  ${w}`);
  }
  for (const e of errors) {
    console.error(`  ERROR ${e}`);
  }

  if (errors.length || (strictWarnings && warnings.length)) {
    console.error(
      `[seo:verify] Failed with ${errors.length} error(s), ${warnings.length} warning(s)`,
    );
    process.exit(1);
  }

  console.log(
    `[seo:verify] OK — ${warnings.length} warning(s), canonical host ${getCanonicalHost(SITE_URL)}`,
  );
}

const isMain =
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href;

if (isMain) {
  main().catch((err) => {
    console.error('[seo:verify] Unexpected failure:', err);
    process.exit(1);
  });
}

export { main as verifySeo };
