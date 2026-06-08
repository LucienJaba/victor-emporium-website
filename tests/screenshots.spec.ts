import { test } from '@playwright/test';
import path from 'node:path';

const pages = [
  { path: '/', name: 'home' },
  { path: '/story', name: 'story' },
  { path: '/menu', name: 'menu' },
  { path: '/shop', name: 'shop' },
  { path: '/visit', name: 'visit' },
];

const outDir = path.join(import.meta.dirname, '..', 'screenshots');

for (const { path: p, name } of pages) {
  test(`screenshot ${name}`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(p, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    await page.screenshot({
      path: path.join(outDir, `${name}.png`),
      fullPage: true,
    });
  });
}
