const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';

async function run() {
  const context = await playwright.chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: null,
    args: ['--start-maximized']
  });

  try {
    const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/edit/intro/', { waitUntil: 'load' });
    await page.waitForTimeout(4000);

    const detail = await page.evaluate(() => {
      const p = Array.from(document.querySelectorAll('p')).find(el => el.innerText.trim() === 'Headline');
      if (!p) return 'No P with Headline';
      const container = p.nextElementSibling || p.parentElement.querySelector('.gflanb');
      if (!container) return 'No container';
      return {
        containerHtml: container.outerHTML.substring(0, 1000)
      };
    });

    console.log('Container detail:', detail);
  } finally {
    await context.close();
  }
}

run().catch(console.error);
