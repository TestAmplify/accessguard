import { test, expect } from '@playwright/test';
import { analyzePage, getViolationsByImpact } from '../../utils/axe-helper';

test.describe('Broken vs fixed accessibility comparison', () => {
  test('fixed route should improve on broken route', async ({ page }) => {
    await page.goto('/broken');
    const brokenResults = await analyzePage(page);

    await page.goto('/fixed');
    const fixedResults = await analyzePage(page);

    const brokenCritical = getViolationsByImpact(brokenResults.violations, 'critical').length;
    const fixedCritical = getViolationsByImpact(fixedResults.violations, 'critical').length;

    const brokenSerious = getViolationsByImpact(brokenResults.violations, 'serious').length;
    const fixedSerious = getViolationsByImpact(fixedResults.violations, 'serious').length;

    console.log({
      brokenTotal: brokenResults.violations.length,
      fixedTotal: fixedResults.violations.length,
      brokenCritical,
      fixedCritical,
      brokenSerious,
      fixedSerious,
    });

    expect(fixedCritical).toBeLessThanOrEqual(brokenCritical);
    expect(fixedResults.violations.length).toBeLessThanOrEqual(brokenResults.violations.length);
  });
});
