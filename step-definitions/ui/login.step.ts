import {Given, When, Then} from '@cucumber/cucumber';
import { CustomWorld } from './custom-world';


Given('user launches the Orange HRM application site', async function (this: CustomWorld) {
  await this.loginPage.launchOrangeHrmApp();
  await this.loginPage.verifyLoginPageIsDisplayed();
});

When('user provides {string} and {string} to login into application', async function (this: CustomWorld , userName: string, password: string) {
  await this.loginPage.login(userName, password);
});
