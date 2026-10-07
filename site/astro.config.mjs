// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import { site } from './src/content/site.ts';

export default defineConfig({
  site: site.url,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404') && (site.features.blog || !page.includes('/blog/')),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
    // 0 = never inline scripts or fonts, so the CSP in vercel.json (script-src 'self', font-src 'self') holds
    build: { assetsInlineLimit: 0 },
  },
});
