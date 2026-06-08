import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  use: {
    baseURL: 'http://localhost:4321/victor-emporium-website/',
    headless: true,
  },
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:4321/victor-emporium-website/',
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
