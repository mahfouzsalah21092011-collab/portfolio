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

    const aboutData = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      const aboutSec = sections.find(s => s.innerText.includes('About'));
      if (!aboutSec) return { found: false };
      return {
        found: true,
        text: aboutSec.innerText
      };
    });

    console.log('About section data:');
    console.log(aboutData.text);

  } finally {
    await context.close();
  }
}

run().catch(console.error);
