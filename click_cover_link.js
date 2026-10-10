const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');

async function test() {
  const context = await playwright.chromium.launchPersistentContext("C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze", { channel: "chrome", headless: false });
  try {
    const page = context.pages()[0] || await context.newPage();
    await page.goto("https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true", { waitUntil: "load" });
    await page.waitForTimeout(4000);
    const btn = page.locator('button[aria-label="Edit background image"]');
    await btn.click();
    await page.waitForTimeout(1000);

    const coverLink = page.locator('div[role="menu"] a, div[role="menu"] [aria-label="Edit cover image"]').first();
    console.log('Clicking cover link...');
    await coverLink.click();
    await page.waitForTimeout(3000);

    await page.screenshot({ path: 'assets/after_click_cover_link.png' });

    const modalData = await page.evaluate(() => {
      const modal = document.querySelector('dialog, .artdeco-modal');
      if (!modal) return { found: false };
      return {
        found: true,
        text: modal.innerText.slice(0, 300),
        fileInputs: Array.from(modal.querySelectorAll('input[type="file"]')).map(i => ({ id: i.id, name: i.name })),
        buttons: Array.from(modal.querySelectorAll('button')).map(b => b.innerText.trim())
      };
    });

    console.log('Modal data:', JSON.stringify(modalData, null, 2));

  } finally {
    await context.close();
  }
}
test().catch(console.error);
