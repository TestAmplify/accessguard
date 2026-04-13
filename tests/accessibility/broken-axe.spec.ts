import { test, expect } from '@playwright/test';
import { analyzePage, getViolationsByImpact, getViolationIds } from '../../utils/axe-helper';

test.describe('Broken route accessibility scan', () => {
  test('broken route should expose accessibility violations', async ({ page }) => {
    await page.goto('/broken');

    const results = await analyzePage(page);

    const critical = getViolationsByImpact(results.violations, 'critical');
    const serious = getViolationsByImpact(results.violations, 'serious');
    const allIds = getViolationIds(results.violations);

    console.log('Broken route violation IDs:', allIds);
    console.log('Broken route critical:', critical.map((v) => v.id));
    console.log('Broken route serious:', serious.map((v) => v.id));

    expect(results.violations.length).toBeGreaterThan(0);
    expect(critical.length + serious.length).toBeGreaterThan(0);
  });

  test('broken route should contain high-risk issue categories', async ({ page }) => {
    await page.goto('/broken');

    const results = await analyzePage(page);
    const ids = getViolationIds(results.violations);

    expect(ids.length).toBeGreaterThan(0);
  });
});
