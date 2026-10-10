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
    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true', { waitUntil: 'load' });
    await page.waitForTimeout(4000);

    // Scroll down to load all sections
    await page.evaluate(async () => {
      for (let i = 0; i < 5; i++) {
        window.scrollBy(0, 1000);
        await new Promise(r => setTimeout(r, 600));
      }
    });

    const editLinks = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href*="/edit/"], button[aria-label*="Edit"], button[aria-label*="Add"]'));
      return links.map(el => ({
        tag: el.tagName,
        ariaLabel: el.getAttribute('aria-label'),
        text: el.innerText.trim().replace(/\n/g, ' '),
        href: el.getAttribute('href')
      }));
    });

    console.log('All edit/add elements on profile page:', JSON.stringify(editLinks, null, 2));

    await page.screenshot({ path: 'assets/linkedin_full_page_scroll.png', fullPage: true });
    console.log('Full page screenshot saved to assets/linkedin_full_page_scroll.png');
  } finally {
    await context.close();
  }
}

run().catch(console.error);
