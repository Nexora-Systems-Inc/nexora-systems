/** Canonical public site URL — override via VITE_SITE_URL at build time. */
export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://nexorasystems.ca').replace(/\/$/, '');

export const SITE_NAME = 'Nexora Systems';

export const DEFAULT_OG_IMAGE = '/og-image.svg';

export const SITE_TAGLINE = 'Where intelligence comes to life.';
