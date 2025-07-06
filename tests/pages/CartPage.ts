import { expect, Locator, Page } from "@playwright/test";
import { BasePageImpl } from "./BasePageImpl";

export class CartPage extends BasePageImpl {
    readonly cartInfo: Locator
    readonly proceedToCheckout: Locator

    constructor(page: Page) {
        super(page);
        this.cartInfo = this.page.locator('.cart_info');
        this.proceedToCheckout = this.page.getByText("Proceed To Checkout");
    }

    async expectProductRow(productName: string): Promise<void> {
        const linkToProduct = this.cartInfo.getByRole('link', {name: productName});

        await expect(this.cartInfo).toBeVisible();
        await expect(this.proceedToCheckout).toBeVisible();
        await expect(linkToProduct).toBeVisible();
    }

    async toHaveExpectedQuantity(productName: string, expectedQuantity: number): Promise<void> {
        const productRow = this.cartInfo.locator('tr').filter({ hasText: productName });
        const quantityButton = productRow.locator('td.cart_quantity >> button');
        await expect(quantityButton).toBeVisible();
        await expect(quantityButton).toHaveText(expectedQuantity.toString());
    }

    async deleteFromCart(productName: string): Promise<void> {
        const productRow = this.cartInfo.locator('tr').filter({ hasText: productName });
        const deleteButton = productRow.locator('a.cart_quantity_delete');
        const emptyCard = this.page.locator('#empty_cart')
        await deleteButton.click();
        await expect(productRow).not.toBeVisible();
        await expect(emptyCard).toBeVisible();
    }
}