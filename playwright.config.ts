import { devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';
import dotenv from 'dotenv';
import { resolve } from 'path';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
dotenv.config();
if (process.env.ENV_FILE_NAME) {
    dotenv.config({
        path: resolve(__dirname, 'env', process.env.ENV_FILE_NAME),
        override: true
    });
}

const testDir = defineBddConfig({
    paths: ['features/**/*.feature'],
    require: ['step-definitions/**/*.{ts,js}'],
    outputDir: '.features-gen'
    // uncomment and install 'ts-node' if using TypeScript
    // requireModule: ['ts-node/register'],
});

const config = {
    testDir: testDir,
    /* Maximum time one test can run for. */
    timeout: 30 * 1000,
    expect: {
        timeout: 5000
    },
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    globalTimeout: process.env.CI ? 60 * 60 * 1000 : undefined,
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
        /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
        actionTimeout: 0
    },
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'Google Chrome',
            use: {
                channel: 'chrome',
                trace: 'off',
                headless: false,
                screenshot: 'only-on-failure'
            }
        },
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                trace: 'off',
                headless: false,
                screenshot: 'only-on-failure'
            }
        },
        {
            name: 'webkit',
            use: {
                ...devices['Desktop Safari'],
                trace: 'off',
                headless: false,
                screenshot: 'only-on-failure'
            }
        }
    ]
};
export default config;
