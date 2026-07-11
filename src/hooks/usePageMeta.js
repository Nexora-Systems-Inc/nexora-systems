import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_NAME } from '../config/site';
import { buildCanonicalUrl, resolvePageMeta } from '../seo/pageMeta';
import {
  organizationJsonLd,
  websiteJsonLd,
  toJsonLdScript,
} from '../../platform/seo/structured-data.mjs';

function upsertMeta(attr, key, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = toJsonLdScript(data);
}

export function usePageMeta() {
  const { pathname } = useLocation();
  const meta = resolvePageMeta(pathname);
  const canonical = buildCanonicalUrl(pathname);

  useEffect(() => {
    document.title = meta.title;

    upsertMeta('name', 'description', meta.description);
    upsertMeta('name', 'robots', meta.noindex ? 'noindex, nofollow' : 'index, follow');

    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:image', meta.ogImage);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', SITE_NAME);

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', meta.title);
    upsertMeta('name', 'twitter:description', meta.description);
    upsertMeta('name', 'twitter:image', meta.ogImage);

    upsertLink('canonical', canonical);

    upsertJsonLd('nexora-ld-organization', organizationJsonLd());
    upsertJsonLd('nexora-ld-website', websiteJsonLd());
  }, [pathname, meta.title, meta.description, meta.ogImage, meta.noindex, canonical]);
}
