// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Update site + base when a custom domain is registered.
  site: 'https://lucienjaba.github.io',
  base: '/victor-emporium-website',
  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react(), sitemap()]
});