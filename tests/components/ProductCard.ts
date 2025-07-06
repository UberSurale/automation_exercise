import { Locator, Page } from "@playwright/test";

export class ProductCard {
    readonly container: Locator;
    readonly addToCartButton: Locator;
    readonly viewProductButton: Locator;

    constructor(
        page: Page,
        productName: string
    ) {
        this.container = page.locator('.single-products').filter({hasText: productName}).first();
        this.addToCartButton = this.container.locator('a:has-text("Add to cart")');
    }

    async addToCard(): Promise<void> {
        // await this.container.hover();
        await this.addToCartButton.nth(0).click();
    }

    async clickViewProductButton(): Promise<void> {
        await this.viewProductButton.click();
    }
}