import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.VITE_SITE_URL) process.env.VITE_SITE_URL = env.VITE_SITE_URL;
  if (env.SITE_URL) process.env.SITE_URL = env.SITE_URL;

  const { resolveSiteUrl } = await import('./platform/seo/site.config.mjs');
  const { nexoraSeoPlugin } = await import('./platform/seo/vite-plugin.mjs');
  const siteUrl = resolveSiteUrl();

  return {
    plugins: [react(), nexoraSeoPlugin()],
    define: {
      'import.meta.env.VITE_SITE_URL': JSON.stringify(siteUrl),
    },
  };
});
