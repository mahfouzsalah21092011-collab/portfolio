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
    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/edit/intro/', { waitUntil: 'load' });
    await page.waitForTimeout(4000);

    const dialog = page.locator('dialog[data-testid="dialog"]');
    await dialog.waitFor({ timeout: 10000 });

    const headlineDetails = await page.evaluate(() => {
      const dialog = document.querySelector('dialog[data-testid="dialog"]');
      const labels = Array.from(dialog.querySelectorAll('label, div[data-testid*="tiptap"]'));
      const editors = Array.from(dialog.querySelectorAll('div[contenteditable="true"]'));
      return {
        editors: editors.map(e => ({
          tag: e.tagName,
          className: e.className,
          text: e.innerText,
          parentHtml: e.parentElement.outerHTML.slice(0, 300)
        })),
        labels: labels.map(l => l.innerText.slice(0, 50))
      };
    });

    console.log('Headline dialog inspection:', JSON.stringify(headlineDetails, null, 2));
    await page.screenshot({ path: 'assets/headline_dialog_detailed.png' });

  } finally {
    await context.close();
  }
}

run().catch(console.error);
