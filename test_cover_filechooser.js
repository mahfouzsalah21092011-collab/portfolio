const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');
const path = require('path');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';
const BANNER_FILE = path.resolve('d:/hamada/mahfouze.cv/assets/linkedin-banner.png');

async function test() {
  const context = await playwright.chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: { width: 1400, height: 900 }
  });

  try {
    const page = context.pages()[0] || await context.newPage();
    await page.goto("https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true", { waitUntil: "load" });
    await page.waitForTimeout(4000);

    const btn = page.locator('button[aria-label="Edit background image"]');
    await btn.click();
    await page.waitForTimeout(1000);

    const coverLink = page.locator('div[role="menu"] a, div[role="menu"] [aria-label="Edit cover image"]').first();
    await coverLink.click();
    await page.waitForTimeout(2000);

    const changePhotoAnchor = page.locator('dialog[data-testid="dialog"] a:has-text("Change photo")');
    console.log('Change photo anchor count:', await changePhotoAnchor.count());

    console.log('Waiting for file chooser and clicking Change photo anchor...');
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser', { timeout: 10000 }),
      changePhotoAnchor.click()
    ]);

    console.log('File chooser successfully caught!');
    await fileChooser.setFiles(BANNER_FILE);
    console.log('Files set. Waiting 3s...');
    await page.waitForTimeout(3000);

    await page.screenshot({ path: 'assets/banner_in_crop_modal.png' });

    // Look for Apply button
    const applyBtn = page.locator('button:has-text("Apply")');
    if (await applyBtn.isVisible()) {
      console.log('Clicking Apply button...');
      await applyBtn.click();
      await page.waitForTimeout(5000);
      console.log('Banner saved!');
    }

    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true', { waitUntil: 'load' });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'assets/profile_banner_SAVED_FINAL.png' });

  } finally {
    await context.close();
  }
}

test().catch(console.error);
