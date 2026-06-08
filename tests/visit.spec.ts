import { test, expect } from '@playwright/test';

test.describe('Visit page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/visit');
  });

  test('renders hero with address', async ({ page }) => {
    await expect(page.locator('main h1').first()).toContainText('Visit the Emporium');
    await expect(page.getByText(/Victor, ID/).first()).toBeVisible();
  });

  test('shows phone and email links', async ({ page }) => {
    await expect(page.locator('a[href^="tel:"]')).toBeVisible();
    await expect(page.locator('a[href^="mailto:"]')).toBeVisible();
  });

  test('shows summer and winter hours', async ({ page }) => {
    await expect(page.getByText(/Summer hours/i)).toBeVisible();
    await expect(page.getByText(/Winter hours/i)).toBeVisible();
  });

  test('contact form has required fields and submit', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('select[name="reason"]')).toBeVisible();
    await expect(page.locator('textarea[name="message"]')).toBeVisible();
    await expect(page.getByRole('button', { name: /send message/i })).toBeVisible();
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
