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

    // Find the "Change photo" button or file input
    const changeBtn = page.locator('button:has-text("Change photo"), div:has-text("Change photo")').last();
    console.log('Waiting for file chooser and clicking Change photo...');

    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser', { timeout: 10000 }).catch(err => {
        console.log('filechooser wait error:', err.message);
        return [null];
      }),
      changeBtn.click()
    ]);

    if (fileChooser) {
      console.log('File chooser opened! Uploading banner:', BANNER_FILE);
      await fileChooser.setFiles(BANNER_FILE);
      await page.waitForTimeout(3000);
      await page.screenshot({ path: 'assets/banner_uploaded_preview.png' });

      // Find Apply button
      console.log('Looking for Apply button...');
      const applyBtn = page.locator('button:has-text("Apply")');
      await applyBtn.waitFor({ timeout: 5000 });
      await applyBtn.click();
      console.log('Apply button clicked! Waiting 5s...');
      await page.waitForTimeout(5000);

      await page.screenshot({ path: 'assets/banner_saved_live.png' });
    } else {
      console.log('No file chooser event received.');
      // Inspect what input[type="file"] exists
      const inputs = await page.evaluate(() => {
        return Array.from(document.querySelectorAll('input[type="file"]')).map(i => ({ id: i.id, name: i.name, class: i.className }));
      });
      console.log('File inputs in DOM:', inputs);
    }

  } finally {
    await context.close();
  }
}

test().catch(console.error);
