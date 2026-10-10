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

    // Click Change photo to open Add a cover image modal
    await page.evaluate(() => {
      const a = Array.from(document.querySelectorAll('dialog a')).find(el => el.innerText.includes('Change photo'));
      if (a) a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    });
    await page.waitForTimeout(2000);

    console.log('Locating Upload single photo button...');
    const uploadBtn = page.locator('button:has-text("Upload single photo"), [aria-label*="Upload single photo"]').first();
    await uploadBtn.waitFor({ timeout: 5000 });

    console.log('Waiting for file chooser and clicking Upload single photo...');
    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser', { timeout: 10000 }),
      uploadBtn.click()
    ]);

    console.log('File chooser caught! Setting banner image file...');
    await fileChooser.setFiles(BANNER_FILE);
    await page.waitForTimeout(3000);

    await page.screenshot({ path: 'assets/banner_cropped_preview.png' });

    // Look for Apply or Save button in the editor modal
    console.log('Looking for Apply or Save button...');
    const saveBtn = page.locator('button:has-text("Apply"), button:has-text("Save")').last();
    await saveBtn.waitFor({ timeout: 5000 });
    console.log('Clicking Apply/Save button...');
    await saveBtn.click();
    await page.waitForTimeout(5000);

    // Refresh profile to verify banner
    await page.goto("https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true", { waitUntil: "load" });
    await page.waitForTimeout(4000);

    await page.screenshot({ path: 'assets/profile_banner_SAVED_FINAL.png' });
    console.log('NEW BANNER SAVED AND VERIFIED ON PROFILE!');

  } finally {
    await context.close();
  }
}

test().catch(console.error);
