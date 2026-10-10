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

    const aboutText = await page.evaluate(() => {
      // Find section with header About
      const h2s = Array.from(document.querySelectorAll('h2'));
      const aboutH2 = h2s.find(h => h.innerText.trim() === 'About');
      if (!aboutH2) return 'No H2 with About found';
      const sec = aboutH2.closest('section');
      return sec ? sec.innerText : 'Section not found for About H2';
    });

    console.log('=== EXACT PROFILE ABOUT SECTION ===');
    console.log(aboutText);

  } finally {
    await context.close();
  }
}

run().catch(console.error);
