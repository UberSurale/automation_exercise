import { expect, Locator, Page } from "@playwright/test";

export class ModalComponent {
    readonly container: Locator;

    constructor(
        page: Page
    ) {
        this.container = page.locator('.modal')
    }

    async clickContinueButton(buttonName: string): Promise<void> {
        await this.container.getByRole('button', {name: buttonName}).click();
        console.log(buttonName)
    }

    async clickLink(linkName: string): Promise<void> {
        await this.container.getByRole('link', {name: linkName}).click();
    }

    async expectToBeVisible(): Promise<void> {
        await expect(this.container).toBeVisible();
    }

    async expectNotVisible(): Promise<void> {
        await expect(this.container).not.toBeVisible();
    }
}