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

    const matchInfo = await page.evaluate(() => {
      // Find every node that contains "Facilities Manager"
      const results = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT);
      let node;
      while (node = walker.nextNode()) {
        const val = node.value || (node.tagName !== 'SCRIPT' && node.tagName !== 'STYLE' && node.innerText) || '';
        if (typeof val === 'string' && val.includes('Facilities Manager | MEP Systems')) {
          results.push({
            tagName: node.tagName,
            id: node.id,
            name: node.getAttribute('name'),
            role: node.getAttribute('role'),
            className: node.className,
            isContentEditable: node.isContentEditable,
            ariaLabel: node.getAttribute('aria-label'),
            outerHTML: node.outerHTML.substring(0, 300)
          });
        }
      }
      return results;
    });

    console.log('DOM search for Facilities Manager:', JSON.stringify(matchInfo, null, 2));
  } finally {
    await context.close();
    console.log('Browser closed cleanly.');
  }
}

run().catch(console.error);
