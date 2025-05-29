import { PlaywrightTestOptions } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Purpose: Global setup method- Which helps to setup the initial
 * environment setup or authentication setup for your execution
 *
 * @param - None
 *
 * @returns None
 *
 */
async function globalSetup() {
    // let testOption: PlaywrightTestOptions;
    // testOption.ignoreHTTPSErrors= true;
    // testOption.extraHTTPHeaders={
    // };
    // testOption.httpCredentials={
    //     username: '',
    //   password: '',
    // };
}

export default globalSetup;
