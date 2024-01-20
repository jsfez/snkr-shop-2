import { expect, test } from '@playwright/test';

test('Add to cart', async ({ page }) => {
  await page.goto('/sneakers/485842');
  await page.getByRole('radio', { name: '12' }).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  const toast = page.getByRole('status');
  await expect(toast).toContainText('Added to cart.');
});

test('Cart is filled', async ({ page }) => {
  await page.getByRole('link', { name: 'Cart' }).click();
  await page.waitForURL('/cart');

  const cartItem = page.getByRole('heading', { name: 'Crimson Tint' });
  await expect(cartItem).toBeVisible();
  await expect(page.getByText('Size: 12')).toBeVisible();
  await expect(page.getByText('TOTAL PRICE : $180')).toBeVisible();
});
