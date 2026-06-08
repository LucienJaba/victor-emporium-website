import { test, expect } from '@playwright/test';

test('home page boots', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/.*/);
});
