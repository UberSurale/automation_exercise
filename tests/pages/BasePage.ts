import { Page } from "@playwright/test";

export abstract class BasePage {
    protected page: Page

    constructor(page: Page) {
        this.page = page
    }

    abstract navigate(url: string): Promise<void>
}