const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';

async function run() {
  const context = await playwright.chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: null,
    args: ['--start-maximized']
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
  console.log('Navigating to https://www.linkedin.com/in/me/ ...');
  await page.goto('https://www.linkedin.com/in/me/', { waitUntil: 'load' });
  await page.waitForTimeout(5000);

  console.log('Page loaded URL:', page.url());

  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, a')).map(el => ({
      tag: el.tagName,
      ariaLabel: el.getAttribute('aria-label') || '',
      text: el.innerText.trim().replace(/\n/g, ' '),
      href: el.getAttribute('href') || '',
      className: el.className
    })).filter(b => b.ariaLabel.toLowerCase().includes('edit') || b.href.includes('edit') || b.text.toLowerCase().includes('edit'));
  });

  console.log('Found edit elements:', JSON.stringify(buttons, null, 2));

  await context.close();
}

run().catch(console.error);
