import { test, expect } from '@playwright/test';

test.describe('Shop page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./shop');
  });

  test('renders hero', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Souvenirs, goods, and gifts');
  });

  test('shows all 5 categories', async ({ page }) => {
    for (const t of ['Apparel', 'Souvenirs', 'Local Goods', 'Fishing & Outdoor', 'Gifts']) {
      await expect(page.getByRole('heading', { name: t, exact: true })).toBeVisible();
    }
  });

  test('category anchors work', async ({ page }) => {
    await page.goto('./shop#fishing');
    await expect(page.locator('#fishing')).toBeInViewport();
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.reload({ waitUntil: 'networkidle' });
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });
});
