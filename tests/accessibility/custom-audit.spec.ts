import { test, expect } from '@playwright/test';
import { runCustomAudit } from '../../utils/accessibility-audit';

test('custom accessibility audit', async ({ page }) => {
  await page.goto('https://mini-shop.testamplify.com');

  const issues = await runCustomAudit(page);

  expect(issues.length).toBe(0);
});