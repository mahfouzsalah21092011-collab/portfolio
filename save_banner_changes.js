const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');
const path = require('path');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';
const BANNER_FILE = path.resolve('d:/hamada/mahfouze.cv/assets/linkedin-banner.png');

async function run() {
  console.log('Connecting to browser with mahfouze profile...');
  const context = await playwright.chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: { width: 1400, height: 900 }
  });

  try {
    const page = context.pages()[0] || await context.newPage();
    await page.goto("https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true", { waitUntil: "load" });
    await page.waitForTimeout(4000);

    // 1. Click edit background image
    const btn = page.locator('button[aria-label="Edit background image"]');
    await btn.click();
    await page.waitForTimeout(1000);

    // 2. Click Edit cover image
    const coverLink = page.locator('div[role="menu"] a, div[role="menu"] [aria-label="Edit cover image"]').first();
    await coverLink.click();
    await page.waitForTimeout(2000);

    // 3. Click Change photo
    await page.evaluate(() => {
      const a = Array.from(document.querySelectorAll('dialog a')).find(el => el.innerText.includes('Change photo'));
      if (a) a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
    });
    await page.waitForTimeout(2000);

    // 4. Click Upload single photo with file chooser
    const uploadBtn = page.locator('button:has-text("Upload single photo")').first();
    await uploadBtn.waitFor({ timeout: 5000 });

    const [fileChooser] = await Promise.all([
      page.waitForEvent('filechooser', { timeout: 10000 }),
      uploadBtn.click()
    ]);

    console.log('Uploading banner file:', BANNER_FILE);
    await fileChooser.setFiles(BANNER_FILE);
    await page.waitForTimeout(3000);

    // 5. Click "Save changes" button
    console.log('Locating and clicking Save changes button...');
    const saveChangesBtn = page.locator('button:has-text("Save changes")');
    await saveChangesBtn.waitFor({ timeout: 5000 });
    await saveChangesBtn.click();
    console.log('Save changes clicked! Waiting 6s for upload to complete...');
    await page.waitForTimeout(6000);

    // 6. Check if "Add a cover image" modal has a Save button
    const finalSaveBtn = page.locator('dialog button:has-text("Save")');
    if (await finalSaveBtn.isVisible()) {
      console.log('Clicking final Save button...');
      await finalSaveBtn.click();
      await page.waitForTimeout(4000);
    }

    // 7. Verify on profile
    console.log('Navigating to profile to verify banner...');
    await page.goto("https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true", { waitUntil: "load" });
    await page.waitForTimeout(4000);

    const verifiedScreenshot = 'assets/profile_banner_SAVED_FINAL.png';
    await page.screenshot({ path: verifiedScreenshot });
    console.log('VERIFIED SCREENSHOT SAVED TO:', verifiedScreenshot);

  } finally {
    await context.close();
    console.log('Browser closed cleanly.');
  }
}

run().catch(console.error);
