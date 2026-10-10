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
    const textNodes = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll('*'));
      return all.filter(el => el.innerText && el.innerText.trim() === "Edit cover image").map(el => ({
        tag: el.tagName,
        className: el.className,
        parentTag: el.parentElement ? el.parentElement.tagName : null,
        parentHtml: el.parentElement ? el.parentElement.outerHTML.slice(0, 300) : null
      }));
    });
    console.log("Matching nodes:", JSON.stringify(textNodes, null, 2));
  } finally {
    await context.close();
  }
}
test().catch(console.error);
