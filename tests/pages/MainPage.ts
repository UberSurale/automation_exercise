import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { BasePageImpl } from "./BasePageImpl";
import { ProductCard } from "../components/ProductCard";
import { ModalComponent } from "../components/Modal";

export class MainPage extends BasePageImpl {
    readonly sliderCarousel: Locator
    readonly featureItems: Locator
    readonly logoImage: Locator
    readonly pesonalDataAgree: Locator

    constructor(page: Page) {
        super(page);
        this.sliderCarousel = this.page.locator('#slider');
        this.featureItems = this.page.locator('.features_items');
        this.logoImage = this.page.locator('img[src="/static/images/home/logo.png"]');
        this.pesonalDataAgree = this.page.getByRole('button', {name: "Consent"});
    }

    product(name: string): ProductCard {
        return new ProductCard(this.page, name);
    }

    async useLinkFromHeader(name: string): Promise<void> {
        const signUpLink = this.page.getByRole('link', {name: name});
        await signUpLink.click()
    }

    async expectAt(): Promise<void> {
        await expect(this.sliderCarousel).toBeVisible();
        await expect(this.featureItems).toBeVisible();
        await expect(this.logoImage).toBeVisible();
    }

    async agreeOnPersonalData(): Promise<void> {
        await this.pesonalDataAgree.click();
    }

    async expectUserNameAtHeaded(userName: string): Promise<void> {
        // TODO: хз че ему надо, отдебажить
        const loggedAsElement = this.page.getByText(` Logged in as `);
        expect(loggedAsElement).toBeVisible();
    }
}