import { setWorldConstructor } from '@cucumber/cucumber';
import { BddWorld, BddWorldOptions } from 'playwright-bdd';


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

}

setWorldConstructor(CustomWorld);
