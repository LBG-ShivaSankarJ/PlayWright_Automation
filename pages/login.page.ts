import { Page, test, expect, Locator } from "@playwright/test";
import copyText from '../data/ui/copy-text/login-page.copytext';
import { CommonPage } from "./common.page";

//Page class:
export class LoginPage extends CommonPage {

    // Constructor:
    constructor(page: Page) {
        super(page);
    }

    //Locators:
    userNameInput: Locator = this.page.locator('#txtUsername');
    passwordInput: Locator = this.page.locator('#txtPassword');
    loginBtn: Locator = this.page.getByRole('button', { name: 'LOGIN' });

    //Methods:
    /**
     * @description This method is to login to Orange HRM web application
     * @param userName
     * @param password
     */
    public async login(userName: string, password: string) {
        await test.step(`Login to Orange HRM application credentials as ${userName} & ${password}`, async () => {
            await this.userNameInput.fill(userName);
            await this.passwordInput.fill(password);
            await this.loginBtn.click();
        });
    }

    /**
     * @description This method launches Orange HRM web page
     */
    public async launchOrangeHrmApp() {
        await this.page.goto(process.env.UI_URL);
    }

    /**
     * @description This method validates Orange Hrm page title
     */
    public async verifyLoginPageIsDisplayed() {
        await expect(this.page).toHaveTitle(copyText.pageTitle);
    }
}