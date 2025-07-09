import { test } from "./base.ts";


test.describe('Login cases', async() => {
    test.beforeEach(async( { mainPage } ) => {
        mainPage.useLinkFromHeader('Signup / Login');
    })
})