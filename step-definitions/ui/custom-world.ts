import { setWorldConstructor } from '@cucumber/cucumber';
import { BddWorld, BddWorldOptions } from 'playwright-bdd';
import { LoginPage } from '../../pages/login.page';
import { DashboardPage } from '../../pages/dashboard.page';


export class CustomWorld extends BddWorld {
  
    constructor(public options: BddWorldOptions) {
        super(options);
    }

    async init() {
        //This method helps to setup beforeEach function for your scripts
    }

    async destroy() {
        //This method helps to setup afterEach function for your scripts
    }

    /**
     * Following methods shows how to add your project specific Pages to Basetest and make it available for stepdef
     */
       get loginPage(): LoginPage {
         return new LoginPage(this.page);
       }

       get dashboardPage(): DashboardPage {
        return new DashboardPage(this.page);
      }
}

setWorldConstructor(CustomWorld);
