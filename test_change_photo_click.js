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

    let fileChooserReceived = null;
    page.on('filechooser', fc => {
      console.log('EVENT: filechooser received!', fc);
      fileChooserReceived = fc;
    });

    console.log('Clicking Change photo in browser evaluate...');
    await page.evaluate(() => {
      const a = Array.from(document.querySelectorAll('dialog a')).find(el => el.innerText.includes('Change photo'));
      if (a) {
        a.onclick = (e) => console.log('Change photo anchor clicked');
        a.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
      }
    });

    await page.waitForTimeout(3000);
    console.log('FileChooser status:', fileChooserReceived ? 'YES' : 'NO');
    console.log('Current URL after click:', page.url());

    await page.screenshot({ path: 'assets/after_js_click_change_photo.png' });

  } finally {
    await context.close();
  }
}

test().catch(console.error);
