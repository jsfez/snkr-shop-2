import { test } from '@playwright/test';

test('Add to cart', async ({ page }) => {
  // Go to product list
  await page.goto('/sneakers/485842');

  // Add to cart
  await page.getByRole('radio', { name: '12' }).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  await page.getByText('Added to cart.');

  // Go to cart
  await page.getByRole('button', { name: 'Open Cart →' });

  // Check cart content
  await page.getByText('Crimson Tint');
  await page.getByText('Size: 12');
  await page.getByText('TOTAL PRICE : $180');
});
