import { Page, test, expect, Locator } from "@playwright/test";
import { CommonPage } from "./common.page";
import copyText from '../data/ui/copy-text/dashboard-page.copytext';

//Page class:
export class DashboardPage extends CommonPage {

  //Constructor:
  constructor(page: Page) {
    super(page);
  }

  //Locators:
  dashboardHeading: Locator = this.page.getByRole('heading', { name: 'Dashboard' });
  welcomeMessage: Locator = this.page.getByRole('link', { name: 'Welcome Admin' });
 
  //Methods:
  /**
   * @description This method is to verify if the user is navigated to a next page after login and dashboard page title is displayed
   */
  public async confirmPage() {
    await this.welcomeMessage.isVisible({ timeout: Number(process.env.VISIBLE_TIMEOUT) });
    await expect(this.dashboardHeading, 'Dashboard page').toContainText(copyText.pageTitle);
  }

  /**
  * @description This method is to verify if the user is navigated to a next page after login with welcome message
  */
    public async verifyLoginSuccessful() {
      await this.welcomeMessage.isVisible({ timeout: Number(process.env.VISIBLE_TIMEOUT) });
      await expect(this.welcomeMessage, 'Successfully logged in..!').toHaveText(copyText.welcomeMessage);
  }
}
