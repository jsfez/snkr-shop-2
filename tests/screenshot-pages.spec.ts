import { argosScreenshot } from '@argos-ci/playwright';
import { test } from '@playwright/test';

const pages = [
  { name: 'homepage', path: '/' },
  { name: 'sneakers-list', path: '/sneakers' },
  { name: 'sneakers-detail', path: '/sneakers/404758' },
  { name: 'cart', path: '/cart' },
];

test('screenshot pages', async ({ page }) => {
  for (const { name, path } of pages) {
    await page.goto(path);
    await page.waitForTimeout(3000);
    await argosScreenshot(page, name);
  }
});
