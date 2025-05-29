import { devices } from '@playwright/test';
import { defineBddConfig, cucumberReporter } from 'playwright-bdd';
import { BrowserSetup } from '@qecoe/playwright_automation';
import dotenv from 'dotenv';
import { resolve } from 'path';
const timeInMin = 60 * 1000;


/**
 * See https://playwright.dev/docs/test-configuration.
 */
dotenv.config();
if (process.env.ENV_FILE_NAME) {
    dotenv.config({
        path: resolve(__dirname, '..', 'env', process.env.ENV_FILE_NAME),
        override: true
    });
}

const testDir = defineBddConfig({
  // If running tests via Sauce Labs and using config.yml, you need to provide a relative paths due to the root specified in the yml file.
  featuresRoot: resolve(__dirname, '..'),
  paths: ['../features/ui/**/*.feature'],
  require: ['../step-definitions/ui/**/*.{ts,js}'],
  outputDir: '../.features-gen'
  // uncomment and install 'ts-node' if using TypeScript
  // requireModule: ['ts-node/register'],
});

const xrayReportOptions = {
    embedAnnotationsAsProperties: true,
    textContentAnnotations: ['test_description'],
    embedAttachmentsAsProperty: 'testrun_evidence',
    outputFile: process.env.JUNIT_REPORTPATH
};

const isProxyEnabled = process.env.SCAN_FLAG_ENABLED.toLowerCase() === 'true';

const config = {
    use: {
        browserName: BrowserSetup.type(process.env.BROWSER_NAME.toLowerCase()),
        trace: 'off',
        headless: BrowserSetup.convertToBoolean(process.env.HEADLESS_MODE),
        launchOptions: {
            args: ['--start-maximized', '--disable-plugins', '--disable-extensions', ...(isProxyEnabled ? [`--proxy-server=${BrowserSetup.enableProxy(process.env.DASTScanFlag)}`] : [])],
            timeout: Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT, 10)
        },
        ignoreHTTPSErrors: true,
        screenshot: 'only-on-failure',
        channel: BrowserSetup.channel(process.env.BROWSER_NAME.toLowerCase()),
        video: 'retain-on-failure',
        viewport: null,
        actionTimeout: Number.parseInt(process.env.ACTION_TIMEOUT, 10) * timeInMin,
        navigationTimeout: Number.parseInt(process.env.NAVIGATION_TIMEOUT, 10) * timeInMin
    },
    testDir: testDir,
    expect: {
        timeout: process.env.EXPECT_TIMEOUT
    },
    globalSetup: require.resolve('../hooks/global-setup'),
    globalTeardown: require.resolve('../hooks/global-teardown'),
    globalTimeout: process.env.CI ? 60 * 60 * 1000 : undefined,
    timeout: Number.parseInt(process.env.TEST_TIMEOUT, 10) * timeInMin,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: Number.parseInt(process.env.RETRIES, 10),
    workers: Number.parseInt(process.env.PARALLEL_THREAD, 10),
    reporter: [
        //uncomment the below reporter for Xray Integration enablement
        ['@qecoe/playwright_automation/dist/cjs/src/logger/XrayTestListener'],
        ['@xray-app/playwright-junit-reporter', xrayReportOptions],
        cucumberReporter('html', { outputFile: '../cucumber-report/index.html' }),
        ['html', { open: 'never' }],
    ],
    projects: [
        {
            name: 'local',
            testMatch: '*.spec.js',
            /* Any test needs to be ignored can be mentioned in below field */
            testIgnore: ''
        },
        {
            name: 'Mobile_IOS',
            use: Object.assign(Object.assign({}, devices[process.env.IOS_DEVICE_NAME]), {
                headless: false,
                screenshot: 'only-on-failure',
                trace: 'off',
                launchOptions: {
                    args: ['--disable-plugins', '--disable-extensions'],
                    timeout: Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT, 10)
                }
            }),
            testMatch: '*.spec.js',
            /* Any test needs to be ignored can be mentioned in below field */
            testIgnore: ''
        },
        {
            name: 'Mobile_Android',
            use: Object.assign(Object.assign({}, devices[process.env.ANDROID_DEVICE_NAME]), {
                headless: false,
                screenshot: 'only-on-failure',
                trace: 'off',
                launchOptions: {
                    args: ['--disable-plugins', '--disable-extensions'],
                    timeout: Number.parseInt(process.env.BROWSER_LAUNCH_TIMEOUT, 10)
                }
            }),
            testMatch: '*.spec.js',
            /* Any test needs to be ignored can be mentioned in below field */
            testIgnore: ''
        }
    ]
};
export default config;
