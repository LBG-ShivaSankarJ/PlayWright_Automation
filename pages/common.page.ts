import { Page, test, expect, Locator } from "@playwright/test";
import { BasePage } from "@qecoe/playwright_automation";

//Page class:
export class CommonPage extends BasePage {

    //Constructor:
    constructor(page: Page) {
        super(page);
    }

    //Common locators for all page classes
    marketPlaceBtn: Locator = this.page.getByRole('button', { name: 'Marketplace' });
    subscribeBtn: Locator = this.page.getByRole('button', { name: 'Subscribe' });
    orangeHrmLnk: Locator = this.page.getByRole('link', { name: 'OrangeHRM', exact: true });

    //Common methods for all page classes:
    /**
     * @description This method is for clicking 'Market Place' button
     */
    public async clickMarketPlaceButton() {
        await test.step(`Click on marketPlace button`, async () => {
            await this.marketPlaceBtn.click();
        });
    }

    /**
     * @description This method is for clicking 'Subscribe' button
     */
    public async clickSubscribeButton() {
        await test.step(`Click on susbscribe button`, async () => {
            await this.subscribeBtn.click();
        });
    }

    /**
     * @description This method is for clicking 'Orange Hrm' button
     */
    public async clickOrangeHrmButton() {
        await test.step(`Click on Orange Hrm button`, async () => {
            await this.orangeHrmLnk.click();
        });
    }
}