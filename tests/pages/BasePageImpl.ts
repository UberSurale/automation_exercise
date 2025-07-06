import { Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class BasePageImpl extends BasePage {
    constructor(page: Page) {
        super(page)
    }

    async navigate(url: string): Promise<void> {
        await this.page.goto(url);
    }
}