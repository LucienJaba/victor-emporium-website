import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('renders hero with wordmark and CTA', async ({ page }) => {
    await expect(page.locator('main h1')).toContainText('Victor Emporium');
    await expect(page.getByRole('link', { name: /plan your visit/i }).first()).toBeVisible();
  });

  test('shows the four what-we-are tiles', async ({ page }) => {
    for (const label of ['Soda Fountain', 'General Store', 'Apparel', 'Local Goods']) {
      await expect(page.getByRole('heading', { name: label })).toBeVisible();
    }
  });

  test('shows the story pull-quote and link', async ({ page }) => {
    await expect(page.getByText(/handshake/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /75 years on main street/i })).toBeVisible();
  });

  test('shows the milkshake feature with image', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /The Huckleberry Milkshake/i })).toBeVisible();
    await expect(page.locator('img[alt*="milkshake sign"]')).toBeVisible();
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
