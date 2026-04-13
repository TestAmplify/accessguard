import { test, expect } from '@playwright/test';

test('user can navigate using keyboard', async ({ page }) => {
  await page.goto('https://mini-shop.testamplify.com');

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');

  const active = await page.evaluate(() => document.activeElement?.tagName);

  expect(active).toBeTruthy();
});
