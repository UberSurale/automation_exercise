import {test as base} from "@playwright/test"
import { MainPage } from "./pages/MainPage"
import { CartPage } from "./pages/CartPage"
import { ModalComponent } from "./components/Modal"

type TestOptions = {
    mainPage: MainPage,
    cartPage: CartPage,
    modalComponent: ModalComponent,
}

export const test = base.extend<TestOptions>({
    mainPage: async ({page}, use) => {
        const mainPage = new MainPage(page);
        await mainPage.navigate("https://automationexercise.com/")
        await mainPage.expectAt();
        await mainPage.agreeOnPersonalData();
        await use(mainPage);
    },
    cartPage: async({page}, use) => {
        await use(new CartPage(page))
    },
    modalComponent: async({page}, use) => {
        await use(new ModalComponent(page))

    }
})

export {expect} from "@playwright/test"