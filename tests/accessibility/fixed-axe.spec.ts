import { test, expect } from '@playwright/test';
import { analyzePage, getViolationsByImpact, getViolationIds } from '../../utils/axe-helper';

test.describe('Fixed route accessibility scan', () => {
  test('fixed route should have zero critical accessibility violations', async ({ page }) => {
    await page.goto('/fixed');

    const results = await analyzePage(page);

    const critical = getViolationsByImpact(results.violations, 'critical');
    const serious = getViolationsByImpact(results.violations, 'serious');

    console.log('Fixed route violation IDs:', getViolationIds(results.violations));
    console.log('Fixed route critical:', critical.map((v) => v.id));
    console.log('Fixed route serious:', serious.map((v) => v.id));

    expect(critical.length).toBe(0);
  });

  test('fixed route should stay under an acceptable serious-issue threshold', async ({ page }) => {
    await page.goto('/fixed');

    const results = await analyzePage(page);
    const serious = getViolationsByImpact(results.violations, 'serious');

    expect(serious.length).toBeLessThanOrEqual(2);
  });
});
