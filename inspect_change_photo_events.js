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

    const changePhotoAnchor = page.locator('dialog[data-testid="dialog"] a:has-text("Change photo")');

    // Let's inspect the full outerHTML and parent/children of Change photo
    const htmlInfo = await changePhotoAnchor.evaluate(el => {
      return {
        outerHTML: el.outerHTML,
        innerHTML: el.innerHTML,
        hasInput: !!el.querySelector('input'),
        parentHTML: el.parentElement.outerHTML
      };
    });
    console.log('Change photo info:', JSON.stringify(htmlInfo, null, 2));

    // Also let's check what all inputs exist in the document right now
    const allInputs = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('input')).map(i => ({
        type: i.type,
        id: i.id,
        name: i.name,
        accept: i.accept,
        style: i.getAttribute('style')
      }));
    });
    console.log('All inputs on page:', allInputs);

  } finally {
    await context.close();
  }
}

test().catch(console.error);
