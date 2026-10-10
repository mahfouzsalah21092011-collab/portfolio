const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';

async function run() {
  const context = await playwright.chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: { width: 1400, height: 900 }
  });

  try {
    const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true', { waitUntil: 'load' });
    await page.waitForTimeout(4000);

    const editBannerBtn = page.locator('button[aria-label="Edit background image"]');
    console.log('Clicking Edit background image button...');
    await editBannerBtn.click();
    await page.waitForTimeout(2000);

    await page.screenshot({ path: 'assets/banner_edit_modal.png' });

    const modalInfo = await page.evaluate(() => {
      const modal = document.querySelector('dialog, .artdeco-modal');
      if (!modal) return { found: false };
      const fileInputs = Array.from(modal.querySelectorAll('input[type="file"]')).map(i => ({ id: i.id, name: i.name, accept: i.accept }));
      const buttons = Array.from(modal.querySelectorAll('button')).map(b => ({ text: b.innerText.trim(), aria: b.getAttribute('aria-label') }));
      return { found: true, fileInputs, buttons };
    });

    console.log('Modal info:', JSON.stringify(modalInfo, null, 2));

  } finally {
    await context.close();
  }
}

run().catch(console.error);
