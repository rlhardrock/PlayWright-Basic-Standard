import { test, expect } from '@playwright/test';

test('T2 - get started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');

    // Click the get started link.
    await page.getByRole('link', { name: 'Get started' }).click();

    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
});

test('T4 - get product - 2', async ({ page }) => {
    await page.goto('https://www.mercadolibre.com.co/');
    await page.locator('input[id=\'cb1-edit\']').fill('iPhone');
    await page.keyboard.press('Enter');
    await expect(page.locator('//ol[contains(@class, \'ui-search-layout\')]')).toBeVisible();
    //await page.pause();
    const productos = await page.locator('//ol[contains(@class, \'ui-search-layout\')]//li//h2').allInnerTexts();

    console.log(productos.length);
    for(let titulo of productos){
        console.log(titulo)
    }
});