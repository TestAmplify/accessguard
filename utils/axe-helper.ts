import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

type ViolationImpact = 'critical' | 'serious' | 'moderate' | 'minor';

export type AxeViolation = {
  id: string;
  impact?: ViolationImpact | null;
};

export type AxeAnalyzeResults = {
  violations: AxeViolation[];
};

export async function analyzePage(page: Page): Promise<AxeAnalyzeResults> {
  return new AxeBuilder({ page }).analyze();
}

export function getViolationsByImpact(
  violations: AxeViolation[],
  impact: ViolationImpact
): AxeViolation[] {
  return violations.filter((violation) => violation.impact === impact);
}

export function getViolationIds(violations: Array<{ id: string }>): string[] {
  return violations.map((violation) => violation.id).sort();
}
