import { test, expect } from '@playwright/test';

test.describe('Menu page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('./menu');
  });

  test('renders hero and feature', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Menu');
    await expect(page.getByRole('heading', { name: 'Huckleberry Milkshake' })).toBeVisible();
  });

  test('shows the four sections', async ({ page }) => {
    for (const s of ['Milkshakes', 'Sundaes', 'Sodas & Floats', 'Espresso']) {
      await expect(page.getByRole('heading', { name: s })).toBeVisible();
    }
  });

  test('shows the rotating-flavors note', async ({ page }) => {
    await expect(page.getByText(/seasonal flavors rotate/i)).toBeVisible();
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
