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

    const dialog = page.locator('dialog[data-testid="dialog"]');
    await dialog.waitFor({ timeout: 10000 });
    console.log('Dialog located!');

    const editor = dialog.locator('div[contenteditable="true"].tiptap');
    await editor.waitFor({ timeout: 5000 });
    console.log('TipTap editor located inside dialog!');

    await editor.click();
    await page.waitForTimeout(500);

    console.log('Selecting all text and typing new headline...');
    await page.keyboard.press('Control+A');
    await page.waitForTimeout(300);
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(300);

    await page.keyboard.type(NEW_HEADLINE, { delay: 5 });
    console.log('Typed new headline.');
    await page.waitForTimeout(1000);

    // Save button strictly inside dialog
    const saveBtn = dialog.locator('button:has-text("Save")');
    console.log('Clicking dialog Save button...');
    await saveBtn.click();
    console.log('Save clicked! Waiting 5s...');
    await page.waitForTimeout(5000);

    // Navigate to profile to verify
    console.log('Navigating to profile to take verification screenshot...');
    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true', { waitUntil: 'load' });
    await page.waitForTimeout(4000);

    const resultPath = 'assets/linkedin_headline_SAVED_FINAL.png';
    await page.screenshot({ path: resultPath });
    console.log('VERIFICATION SCREENSHOT SAVED TO:', resultPath);

  } finally {
    await context.close();
    console.log('Browser closed cleanly.');
  }
}

run().catch(console.error);
