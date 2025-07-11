import { test, expect } from "./base.ts";
import loginDataSuccess from "./data/login/loginSuccess.json";
import loginDataError from "./data/login/loginError.json";
import loginDataNativeErrors from "./data/login/loginHTMLErrors.json"
import { BASE_URL } from "./common/const.ts";

test.describe.only('Login cases', () => {

    test.beforeEach(async ({mainPage}) => {
        await mainPage.useLinkFromHeader('Signup / Login');
    })

    loginDataSuccess.forEach(({userEmail, password, userName}) => {

        test(`Succefull login`, async ({ loginPage, mainPage }) => {
            await loginPage.expectAt();
            await loginPage.loginTo(userEmail, password);
            await mainPage.expectUserNameAtHeaded(userName);
        })

    });

    test.describe('Correct validation', () => {
        loginDataError.forEach(({userEmail, password, expectedMessage}) => {

            test(`Wrong ${userEmail} and ${password} are used, expect to have ${expectedMessage}`, async ({loginPage}) => {
                await loginPage.loginTo(userEmail, password);
                await loginPage.expectError(expectedMessage);
            })

        });

        loginDataNativeErrors.forEach(({userEmail, password}) => {

            test(`Validate with HTML5 validation for ${userEmail} and ${password}`, async ({loginPage, page}) => {
                await loginPage.loginTo(userEmail, password);
                const isValid = await page.$eval('form', (form: HTMLFormElement) => form.checkValidity())
                expect(isValid).toBe(false);
            });

        })

    })
})