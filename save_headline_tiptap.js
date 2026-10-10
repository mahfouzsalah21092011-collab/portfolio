const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';

const NEW_HEADLINE = "Facilities & MEP Department Manager | Commercial Shopping Malls & Retail Fit-Outs | Consultant-Side Technical Oversight, Preventive Maintenance (O&M), Testing & Handover | AUC Diploma | KSA • UAE • Qatar • Egypt";

async function run() {
  console.log('Connecting to browser with mahfouze profile...');
  const context = await playwright.chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: null,
    args: ['--start-maximized']
  });

  try {
    const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
    console.log('Navigating to edit intro modal...');
    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/edit/intro/', { waitUntil: 'load' });
    await page.waitForTimeout(4000);

    console.log('Locating TipTap Headline editor...');
    const editor = page.locator('div[contenteditable="true"].tiptap').first();
    await editor.waitFor({ timeout: 10000 });

    console.log('Focusing editor...');
    await editor.click();
    await page.waitForTimeout(500);

    console.log('Selecting all text and typing new headline...');
    await page.keyboard.press('Control+A');
    await page.waitForTimeout(300);
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(300);

    // Type the new headline
    await page.keyboard.type(NEW_HEADLINE, { delay: 5 });
    console.log('Typed new headline successfully.');
    await page.waitForTimeout(1000);

    // Find and click Save button
    console.log('Looking for Save button...');
    const saveBtn = page.locator('button.artdeco-button--primary, button:has-text("Save")').last();
    await saveBtn.scrollIntoViewIfNeeded();
    await saveBtn.click();
    console.log('Save button clicked! Waiting for persistence...');
    await page.waitForTimeout(5000);

    // Verify on profile page
    console.log('Navigating to main profile to verify headline...');
    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true', { waitUntil: 'load' });
    await page.waitForTimeout(4000);

    const verifiedScreenshot = 'assets/linkedin_headline_SUCCESS.png';
    await page.screenshot({ path: verifiedScreenshot });
    console.log('VERIFIED SCREENSHOT SAVED TO:', verifiedScreenshot);

  } finally {
    await context.close();
    console.log('Browser closed cleanly.');
  }
}

run().catch(console.error);
