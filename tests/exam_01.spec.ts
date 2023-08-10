import { test, expect } from '@playwright/test';

test('T1 - has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('T3 - get product - 1', async ({ page }) => {
  await page.goto('https://www.mercadolibre.com.co/');
  await page.getByPlaceholder('Buscar productos, marcas y más…').click();
  await page.getByPlaceholder('Buscar productos, marcas y más…').fill('prospectors crude oil');
  await page.getByPlaceholder('Buscar productos, marcas y más…').press('Enter');
  await expect(page).toHaveURL(/.*prospectors-crude-oil/);
});

