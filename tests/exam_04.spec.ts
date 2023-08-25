import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/LoginPage';

test('T6 - EtE loading the cart with POM', async ({ page }) => {
    // await page.goto('https://www.saucedemo.com/v1/');
    await page.goto(process.env.URL_MAIN);

    // invocar el constructor "page"
    const LogIn = new LoginPage(page);
    await LogIn.loginSuccess('standard_user', 'secret_sauce');
    await LogIn.checkSuccessLogin();

    const containerProducts = await page.locator('#inventory_container .inventory_item').all();

    const randomIndex = Math.floor(Math.random() * containerProducts.length);

    const randomProduct = containerProducts[randomIndex];

    const expectProductName = await randomProduct.locator('.inventory_item_name').innerText();
    const expectProductPrice = await randomProduct.locator('.inventory_item_price').innerText();
    const expectProductDescription = await randomProduct.locator('.inventory_item_desc').innerText();

    //console.log(`Name: ${expectProductName} | Price: ${expectProductPrice} | Description: ${expectProductDescription} `);

    await randomProduct.getByRole('button', {name: 'ADD TO CART'}).click();

    await page.locator('a.shopping_cart_link').click();

    const cartName = await page.locator('.inventory_item_name').innerText();
    const cartPrice = await page.locator('.inventory_item_price').innerText();
    const cartDescription = await page.locator('.inventory_item_desc').innerText();

    expect(cartName).toEqual(expectProductName);
    expect(expectProductPrice).toContain(cartPrice);
    expect(cartDescription).toEqual(expectProductDescription);

    expect(page.getByRole('link', { name: 'CHECKOUT' })).toBeVisible();
    await page.getByRole('link', { name: 'CHECKOUT' }).click();

    await page.getByRole('textbox', { name: 'First Name' }).fill('Zorro');
    await page.getByRole('textbox', { name: 'Last Name' }).fill('Meyers');
    await page.getByRole('textbox', { name: 'Zip/Postal Code' }).fill('666');

    expect(page.getByRole('button', {name:'CONTINUE'})).toBeVisible();
    await page.getByRole('button', {name:'CONTINUE'}).click();

    expect(page.getByRole('link', { name: 'FINISH' })).toBeVisible();
    await page.getByRole('link', { name: 'FINISH' }).click();

    await expect(page.getByRole('heading', { name:'THANK YOU FOR YOUR ORDER'})).toBeVisible();

});