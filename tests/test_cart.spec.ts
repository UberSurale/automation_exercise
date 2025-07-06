import { test } from "./base.ts";
import { ModalButtonEnum, ModalLinkEnum } from "./enums/ModalButtons.ts";
import productData from './data/productData.json';

productData.forEach(({ products, expectedQuantity }) => {
    test.describe('Cart basic test', () => {

        test.beforeEach(async ({ mainPage, modalComponent }) => {
            for (const { productName, quantity } of products) {
                let totalCounter: number = 0;
                for (let i: number = 0; i < quantity; i++) {
                    totalCounter += i;
                    console.log(totalCounter);

                    await mainPage.product(productName).addToCard();

                    await modalComponent.expectToBeVisible();
                    if (totalCounter < products.length) {
                        await modalComponent.clickContinueButton(ModalButtonEnum.continueGeneral);
                    }
                }
            }
            await modalComponent.clickLink(ModalLinkEnum.viewCart);
        });

        for (const { productName } of products) {
            test(`Added ${productName} must be ${expectedQuantity}`, async ({ cartPage }) => {
                await cartPage.expectProductRow(productName);
                await cartPage.toHaveExpectedQuantity(productName, expectedQuantity);
            });
        }

        for (const { productName } of products) {
            test(`Verify deleting ${productName} from cart`, async ({ cartPage }) => {
                await cartPage.deleteFromCart(productName);
            });
        }

    });
})