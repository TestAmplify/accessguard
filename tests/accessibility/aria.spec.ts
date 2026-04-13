import { test, expect } from '@playwright/test';

test('buttons have accessible names', async ({ page }) => {
  await page.goto('https://mini-shop.testamplify.com');

  const buttons = await page.locator('button').all();

  for (const btn of buttons) {
    const label = await btn.getAttribute('aria-label');
    const text = await btn.textContent();

    expect(label || text).toBeTruthy();
  }
});
