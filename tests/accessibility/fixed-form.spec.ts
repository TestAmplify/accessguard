import { test, expect } from '@playwright/test';

test.describe('Fixed route checkout form', () => {
  test('checkout form fields have accessible labels', async ({ page }) => {
    await page.goto('/fixed');

    await expect(page.getByLabel(/full name/i)).toBeVisible();
    await expect(page.getByLabel(/email address/i)).toBeVisible();
    await expect(page.getByLabel(/shipping address/i)).toBeVisible();
    await expect(page.getByLabel(/country/i)).toBeVisible();
  });

  test('user can complete the form fields using keyboard input', async ({ page }) => {
    await page.goto('/fixed');

    await page.getByLabel(/full name/i).fill('Tony Mak');
    await page.getByLabel(/email address/i).fill('tony@example.com');
    await page.getByLabel(/shipping address/i).fill('123 Main Street');
    await page.getByLabel(/country/i).selectOption({ label: 'United States' });

    await page.getByLabel(/standard/i).check();

    await expect(page.getByLabel(/full name/i)).toHaveValue('Tony Mak');
    await expect(page.getByLabel(/email address/i)).toHaveValue('tony@example.com');
    await expect(page.getByLabel(/shipping address/i)).toHaveValue('123 Main Street');
  });

  test('submit control is clearly named', async ({ page }) => {
    await page.goto('/fixed');

    await expect(page.getByRole('button', { name: /complete order/i })).toBeVisible();
  });
});
