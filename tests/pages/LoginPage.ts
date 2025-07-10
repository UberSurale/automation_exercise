import { expect, Locator, Page } from "@playwright/test";
import { BasePageImpl } from "./BasePageImpl";
import { MainPage } from "./MainPage";

export class LoginPage extends BasePageImpl {
    readonly loginForm: Locator
    readonly signupForm: Locator
    readonly emailLogin: Locator
    readonly passwordLogin: Locator

    constructor(page: Page) {
        super(page);
        this.loginForm = page.locator('.login-form');
        this.signupForm = page.locator('.signup-form');
        this.emailLogin = this.loginForm.getByRole('textbox', { name: "Email Address"});
        this.passwordLogin = this.loginForm.getByRole('textbox', { name: "Password" });
    }

    async expectAt(): Promise<void> {
        expect(this.loginForm).toBeVisible();
        expect(this.signupForm).toBeVisible();
    }

    async loginTo(email: string, password: string): Promise<void> {
        const loginButton = this.loginForm.getByRole('button', { name: "Login" });

        await this.emailLogin.fill(email);
        await this.passwordLogin.fill(password);
        await loginButton.click();
    }

    async expectError(expectedError: string): Promise<void> {
        await expect(this.emailLogin).toHaveAttribute('type', 'email');
        await expect(this.passwordLogin).toHaveAttribute('type', 'password');
        await expect(this.loginForm.locator('p')).toBeVisible();
        await expect(this.loginForm.locator('p')).toHaveText(expectedError);
    }
}