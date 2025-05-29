import { defineBddConfig, cucumberReporter } from 'playwright-bdd';
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
  paths: ['../features/api/**/*.feature'],
  require: ['../step-definitions/api/**/*.{ts,js}'],
  outputDir: '../.features-gen'
});

const xrayReportOptions = {
    embedAnnotationsAsProperties: true,
    textContentAnnotations: ['test_description'],
    embedAttachmentsAsProperty: 'testrun_evidence',
    outputFile: process.env.JUNIT_REPORTPATH
};

const config = {
    use: {
        trace: process.env.TRACE_FLAG.toLowerCase(),
        ignoreHTTPSErrors: true
    },
    testDir: testDir,
    expect: {
        timeout: 15000
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
            testIgnore: ''
        }
    ]
};
export default config;
