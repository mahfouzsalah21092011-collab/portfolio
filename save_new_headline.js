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

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
  console.log('Navigating to edit intro modal...');
  await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/edit/intro/', { waitUntil: 'load' });
  await page.waitForTimeout(3000);

  console.log('Waiting for Edit intro modal...');
  await page.waitForSelector('text=Edit intro', { timeout: 10000 });

  // Locate headline input
  console.log('Locating Headline field...');
  const headlineInput = page.getByRole('textbox', { name: 'Headline' });
  await headlineInput.waitFor({ timeout: 5000 });

  console.log('Current value before edit:', await headlineInput.inputValue());
  console.log('Clearing and filling new headline...');
  await headlineInput.click();
  await headlineInput.fill('');
  await headlineInput.fill(NEW_HEADLINE);
  console.log('Filled headline to:', NEW_HEADLINE);
  await page.waitForTimeout(1000);

  // Click Save
  console.log('Clicking Save button...');
  const saveBtn = page.getByRole('button', { name: 'Save' });
  await saveBtn.click();
  console.log('Save clicked. Waiting for save to persist...');
  await page.waitForTimeout(5000);

  // Go to profile view and screenshot
  console.log('Navigating to profile view to verify...');
  await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true', { waitUntil: 'load' });
  await page.waitForTimeout(4000);

  const screenshotPath = 'assets/linkedin_headline_SAVED.png';
  await page.screenshot({ path: screenshotPath });
  console.log('Verification screenshot saved to:', screenshotPath);

  await context.close();
  console.log('Browser closed successfully.');
}

run().catch(console.error);
