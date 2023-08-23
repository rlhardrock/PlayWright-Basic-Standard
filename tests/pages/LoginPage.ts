import { Locator, Page, expect } from "@playwright/test";

// metodo implementado en exam_04

export class LoginPage {

    private readonly UserNameTextBox: Locator;
    private readonly PassWordTextBox: Locator;
    private readonly LoginButton: Locator;

    private readonly ShoppingCartIcon: Locator;

    constructor(page: Page){
        this.UserNameTextBox = page.getByRole('textbox', { name: 'Username' });
        this.PassWordTextBox = page.getByRole('textbox', { name: 'Password' });
        this.LoginButton = page.getByRole('button', { name: 'LOGIN' });
        this.ShoppingCartIcon = page.locator("xpath=//a[contains(@class,'shopping_cart_link')]");
    }

    async fillUsername(username: string){
        await this.UserNameTextBox.fill(username);
    }

    async fillPassword(password: string){
        await this.PassWordTextBox.fill(password);
    }

    async clickLoginButton(){
        await this.LoginButton.click();
    }

    async checkSuccessLogin(){
        await expect(this.ShoppingCartIcon).toBeVisible();
    }

    async loginSuccess(username: string, password: string){
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

}