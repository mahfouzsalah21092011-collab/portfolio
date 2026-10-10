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
    console.log('Navigating to Edit About modal...');
    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/edit/forms/summary/new/', { waitUntil: 'load' });
    await page.waitForTimeout(4000);

    await page.screenshot({ path: 'assets/edit_about_modal.png' });
    console.log('Screenshot saved to assets/edit_about_modal.png');

    const inputs = await page.evaluate(() => {
      const dialog = document.querySelector('dialog, .artdeco-modal');
      const container = dialog || document.body;
      const textareas = Array.from(container.querySelectorAll('textarea, div[contenteditable="true"]')).map(el => ({
        tag: el.tagName,
        id: el.id,
        name: el.name,
        className: el.className,
        valLength: (el.value || el.innerText || '').length,
        valPreview: (el.value || el.innerText || '').slice(0, 100)
      }));
      const buttons = Array.from(container.querySelectorAll('button')).map(b => ({
        text: b.innerText.trim(),
        aria: b.getAttribute('aria-label')
      }));
      return { textareas, buttons };
    });

    console.log('Found fields in Edit About:', JSON.stringify(inputs, null, 2));

  } finally {
    await context.close();
  }
}

run().catch(console.error);
