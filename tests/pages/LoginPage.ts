import { expect, Locator, Page } from "@playwright/test";
import { BasePageImpl } from "./BasePageImpl";
import { MainPage } from "./MainPage";

export class LoginPage extends BasePageImpl {
    readonly loginForm: Locator
    readonly signupForm: Locator

    constructor(page: Page) {
        super(page);
        this.loginForm = page.locator('.login-form');
        this.signupForm = page.locator('.signup-form');
    }

    async expectAt(): Promise<void> {
        expect(this.loginForm).toBeVisible();
        expect(this.signupForm).toBeVisible();
    }

    async succecfullLogin(email: string, password: string, mainPage: MainPage): Promise<void> {
        const emailLogin = this.loginForm.getByRole('textbox', { name: "Email Address"});
        const passwordLogin = this.loginForm.getByRole('textbox', { name: "Password" });
        const loginButton = this.loginForm.getByRole('button', { name: "Login" });

        await emailLogin.fill(email);
        await passwordLogin.fill(password);
        await loginButton.click();
    }
}