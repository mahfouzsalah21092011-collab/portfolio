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
    await editBannerBtn.click();
    await page.waitForTimeout(1500);

    // Let's dump all clickable items or dropdown items
    const items = await page.evaluate(() => {
      // Find all elements appearing recently or positioned near the top right
      const all = Array.from(document.querySelectorAll('*'));
      const matches = all.filter(el => {
        const text = el.innerText || '';
        return text.includes('cover') || text.includes('slideshow');
      });
      return matches.map(el => ({
        tag: el.tagName,
        className: el.className,
        text: el.innerText.slice(0, 100),
        id: el.id
      })).slice(0, 15);
    });

    console.log('Dropdown items found:', JSON.stringify(items, null, 2));

  } finally {
    await context.close();
  }
}

run().catch(console.error);
