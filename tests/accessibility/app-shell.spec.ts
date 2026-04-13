import { test, expect } from '@playwright/test';

test.describe('AccessReady app shell', () => {
  test('landing page shows project overview and route links', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: /AccessReady/i })).toBeVisible();
    await expect(page.getByText(/paired accessibility showcase/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /broken/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /fixed/i })).toBeVisible();
  });

  test('broken route loads demo content', async ({ page }) => {
    await page.goto('/broken');

    await expect(page.getByRole('link', { name: /home/i })).toBeVisible();
    await expect(page.getByText(/Premium Tech, Accessible to All/i)).toBeVisible();
    await expect(page.getByText(/Intentional Accessibility Issues Included/i)).toBeVisible();
    await expect(page.getByText(/unlabeled controls/i)).toBeVisible();
  });

  test('fixed route loads demo content', async ({ page }) => {
    await page.goto('/fixed');

    await expect(page.getByRole('heading', { name: /Premium Tech, Accessible to All/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Our Products/i })).toBeVisible();
    await expect(page.getByText(/Accessibility Improvements Applied/i)).toBeVisible();
    await expect(page.getByText(/semantic landmarks/i)).toBeVisible();
  });
});
