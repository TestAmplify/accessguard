import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage accessibility scan - critical issues only', async ({ page }) => {
  await page.goto('https://mini-shop.testamplify.com');

  const results = await new AxeBuilder({ page }).analyze();

  // Log all issues for visibility
  console.log('All Violations:', results.violations);

  // Filter only critical issues
  const criticalIssues = results.violations.filter(
    violation => violation.impact === 'critical'
  );

  console.log('Critical Violations:', criticalIssues);

  // Fail only if critical issues exist
  expect(criticalIssues.length).toBe(0);
});