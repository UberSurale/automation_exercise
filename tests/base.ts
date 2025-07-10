import {test as base} from "@playwright/test"
import { MainPage } from "./pages/MainPage"
import { CartPage } from "./pages/CartPage"
import { ModalComponent } from "./components/Modal"
import { LoginPage } from "./pages/LoginPage"
import { BASE_URL } from "./common/const"

type TestOptions = {
    mainPage: MainPage,
    cartPage: CartPage,
    modalComponent: ModalComponent,
    loginPage: LoginPage,
}

export const test = base.extend<TestOptions>({
    mainPage: async ({page}, use) => {
        const mainPage = new MainPage(page);
        await mainPage.navigate(`${BASE_URL}`)
        await mainPage.expectAt();
        await mainPage.agreeOnPersonalData();
        await use(mainPage);
    },
    cartPage: async({page}, use) => {
        await use(new CartPage(page))
    },
    modalComponent: async({page}, use) => {
        await use(new ModalComponent(page))
    },
    loginPage: async({page}, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    }
})

export {expect} from "@playwright/test"