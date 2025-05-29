import {Given, When, Then} from '@cucumber/cucumber';
import { CustomWorld } from './custom-world';


Then('user should be displayed with dashboard page and welcome message', async function (this: CustomWorld) {
  await this.dashboardPage.confirmPage();
});
