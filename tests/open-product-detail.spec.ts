import { expect, test } from '@playwright/test';

test('Open product detail', async ({ page }) => {
  // Go to product list
  await page.goto('/sneakers');

  // Go to product page
  await page
    .locator('div', { hasText: 'Crimson Tint' })
    .filter({ has: page.getByRole('button') })
    .last()
    .getByRole('button', { name: 'Preview' })
    .click();

  // Check product detail
  await expect(
    page.getByRole('heading', {
      name: "HIGH OG 'CRIMSON TINT'",
    }),
  ).toBeVisible();
});
