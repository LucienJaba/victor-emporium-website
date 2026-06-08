import { test, expect } from '@playwright/test';

test.describe('Visit page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./visit');
  });

  test('renders hero with address', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Visit the Emporium');
    await expect(page.getByText(/Victor, ID/).first()).toBeVisible();
  });

  test('shows phone and email links', async ({ page }) => {
    await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
    await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
  });

  test('shows summer and winter hours', async ({ page }) => {
    await expect(page.getByText(/Summer hours/i)).toBeVisible();
    await expect(page.getByText(/Winter hours/i)).toBeVisible();
  });

  test('contact placeholder shows phone and email', async ({ page }) => {
    await expect(page.getByText(/form coming soon/i)).toBeVisible();
    await expect(page.locator('a[href^="tel:"]').first()).toBeVisible();
    await expect(page.locator('a[href^="mailto:"]').first()).toBeVisible();
  });

  test('map iframe loads', async ({ page }) => {
    await expect(page.locator('iframe[title*="Map"]')).toBeVisible();
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.reload();
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
});
