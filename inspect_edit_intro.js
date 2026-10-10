const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');
const fs = require('fs');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';

async function run() {
  const context = await playwright.chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: null,
    args: ['--start-maximized']
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
  await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/edit/intro/', { waitUntil: 'load' });
  await page.waitForTimeout(4000);

  // Take screenshot of the edit/intro page
  await page.screenshot({ path: 'assets/edit_intro_view.png', fullPage: true });

  const forms = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('form, .artdeco-modal, [data-view-name*="edit"]')).map(el => ({
      tagName: el.tagName,
      className: el.className,
      id: el.id,
      textPreview: el.innerText.substring(0, 300)
    }));
  });

  console.log('Forms/Modals found:', JSON.stringify(forms, null, 2));

  await context.close();
}

run().catch(console.error);
