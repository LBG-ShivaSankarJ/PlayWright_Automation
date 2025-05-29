import { globalTestData } from '@qecoe/playwright_automation';

/**
 * Purpose: Global TearDown method- Which helps to setup the after test execution
 * clean up or dispose methods or storing of logs.
 *
 * @param - None
 *
 * @returns None
 *
 */
async function globalTearDown() {
    await globalTestData.cleardata();
}

export default globalTearDown;
