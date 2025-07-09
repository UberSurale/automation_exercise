import { test } from "./base.ts";
import { ModalButtonEnum, ModalLinkEnum } from "./enums/ModalButtons.ts";
import productData from './data/productData.json';

productData.forEach(({ products, expectedQuantity, expectedRows }) => {
    test.describe('Cart basic test', () => {

        test.beforeEach(async ({ mainPage, modalComponent }) => {
            let totalCounter: number = 0;
            for (const { productName, quantity } of products) {
                for (let i: number = 0; i < quantity; i++) {
                    totalCounter++;

                    await mainPage.product(productName).addToCard();

                    await modalComponent.expectToBeVisible();
                    if (totalCounter != expectedQuantity) {
                        await modalComponent.clickContinueButton(ModalButtonEnum.continueGeneral);
                    } else {
                        await modalComponent.clickLink(ModalLinkEnum.viewCart);
                    }
                }
            }
        });

        for (const { productName, quantity } of products) {
            test.skip(`Added ${productName} must be ${quantity}`, async ({ cartPage }) => {
                await cartPage.expectProductRow(productName);
                await cartPage.toHaveExpectedQuantity(productName, quantity);
            });
        }

        test(`Verify deleting ${products} from cart`, async ({ cartPage }) => {
            // Test deleting each product sequentially
            for (let i = 0; i < products.length; i++) {
                const { productName } = products[i];
                const isLastItem = i === products.length - 1;
                
                await cartPage.deleteFromCart(productName, isLastItem);
            }
        });
    });
})