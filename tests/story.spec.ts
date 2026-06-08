import { test, expect } from '@playwright/test';

test.describe('Story page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/story');
  });

  test('renders the hero', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('75 Years on Main Street');
  });

  test('shows all 7 ownership eras', async ({ page }) => {
    const expectedYears = ['1950–1963', '1963–1978', '1978–1985', '1985–1989', '1989–1999', '1999–2025', '2025–present'];
    for (const y of expectedYears) {
      await expect(page.getByText(y).first()).toBeVisible();
    }
  });

  test('shows the Belushi pull quote', async ({ page }) => {
    const quote = page.locator('blockquote').filter({ hasText: /Continental Divide/i });
    await quote.scrollIntoViewIfNeeded();
    await expect(quote).toBeVisible();
  });

  test('closing CTA links to /visit', async ({ page }) => {
    const cta = page.getByRole('link', { name: /plan your visit/i }).last();
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/visit');
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
