import { test, expect } from '@playwright/test';

test.describe('Fixed route keyboard support', () => {
  test('navigation links are keyboard focusable', async ({ page }) => {
    await page.goto('/fixed');

    const homeLink = page.getByRole('link', { name: /home/i });
    const brokenLink = page.getByRole('link', { name: /broken/i });
    const fixedLink = page.getByRole('link', { name: /fixed/i });

    await expect(homeLink).toBeVisible();
    await expect(brokenLink).toBeVisible();
    await expect(fixedLink).toBeVisible();

    await homeLink.focus();
    await expect(homeLink).toBeFocused();

    await brokenLink.focus();
    await expect(brokenLink).toBeFocused();

    await fixedLink.focus();
    await expect(fixedLink).toBeFocused();
  });

  test('primary interactive controls are keyboard focusable', async ({ page }) => {
    await page.goto('/fixed');

    const shopNowButton = page.getByRole('button', { name: /shop now/i });
    const categorySelect = page.getByLabel(/category/i);
    const sortSelect = page.getByLabel(/sort by/i);
    const fullNameInput = page.getByLabel(/full name/i);
    const emailInput = page.getByLabel(/email address/i);

    await expect(shopNowButton).toBeVisible();
    await expect(categorySelect).toBeVisible();
    await expect(sortSelect).toBeVisible();
    await expect(fullNameInput).toBeVisible();
    await expect(emailInput).toBeVisible();

    await shopNowButton.focus();
    await expect(shopNowButton).toBeFocused();

    await categorySelect.focus();
    await expect(categorySelect).toBeFocused();

    await sortSelect.focus();
    await expect(sortSelect).toBeFocused();

    await fullNameInput.focus();
    await expect(fullNameInput).toBeFocused();

    await emailInput.focus();
    await expect(emailInput).toBeFocused();
  });
});
