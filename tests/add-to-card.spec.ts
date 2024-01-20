import { expect, test } from '@playwright/test';

test('Add to cart', async ({ page }) => {
  await page.goto('/sneakers/485842');
  await page.getByRole('radio', { name: '12' }).click();
  await page.getByRole('button', { name: 'ADD TO CART' }).click();
  const toast = page.getByRole('status');
  await expect(toast).toContainText('Added to cart.');

  await page.getByRole('link', { name: 'Cart' }).click();
  await page.waitForURL('/cart');

  const cartItem = page.getByRole('listitem');
  await expect(cartItem).toContainText('The Air Jordan 1 Retro High');
  await expect(cartItem).toContainText('Size: 12');
  await expect(cartItem).toContainText('$180');
  await expect(page.getByText('TOTAL PRICE : $180')).toBeVisible();
});
