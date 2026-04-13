import type { Page } from '@playwright/test';

export async function runCustomAudit(page: Page): Promise<string[]> {
  const issues: string[] = [];

  const images = await page.locator('img').all();

  for (const img of images) {
    const alt = await img.getAttribute('alt');
    if (!alt) issues.push('Image missing alt text');
  }

  return issues;
}
