const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';

async function test() {
  const context = await playwright.chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: { width: 1400, height: 900 }
  });

  try {
    const page = context.pages()[0] || await context.newPage();
    await page.goto("https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true", { waitUntil: "load" });
    await page.waitForTimeout(4000);

    const btn = page.locator('button[aria-label="Edit background image"]');
    await btn.click();
    await page.waitForTimeout(1000);

    const coverLink = page.locator('div[role="menu"] a, div[role="menu"] [aria-label="Edit cover image"]').first();
    await coverLink.click();
    await page.waitForTimeout(2000);

    const links = await page.evaluate(() => {
      const dialog = document.querySelector('dialog[data-testid="dialog"]');
      return Array.from(dialog.querySelectorAll('a, button, div[role="button"]')).map(el => ({
        tag: el.tagName,
        role: el.getAttribute('role'),
        href: el.getAttribute('href'),
        text: el.innerText.trim().replace(/\n+/g, ' '),
        outer: el.outerHTML.slice(0, 250)
      }));
    });

    console.log('Action items inside Cover photo modal:');
    console.log(JSON.stringify(links, null, 2));

  } finally {
    await context.close();
  }
}

test().catch(console.error);
