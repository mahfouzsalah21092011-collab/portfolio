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

    // Let's scroll down slowly and inspect all section headings
    const sectionInfo = await page.evaluate(async () => {
      const results = [];
      for (let i = 0; i < 10; i++) {
        window.scrollBy(0, 800);
        await new Promise(r => setTimeout(r, 500));
      }

      const sections = document.querySelectorAll('main section');
      sections.forEach((sec, idx) => {
        const header = sec.querySelector('h2, .pv-profile-card__title, span[aria-hidden="true"]');
        const id = sec.id || sec.getAttribute('data-section') || '';
        const text = sec.innerText.slice(0, 200).replace(/\n+/g, ' | ');
        const editBtns = Array.from(sec.querySelectorAll('a[href*="/edit/"], button[aria-label*="Edit"], button[aria-label*="Add"]')).map(b => ({
          aria: b.getAttribute('aria-label'),
          href: b.getAttribute('href'),
          text: b.innerText.trim()
        }));
        results.push({ idx, id, headerText: header ? header.innerText.trim() : '', snippet: text, editBtns });
      });
      return results;
    });

    console.log('Sections found on profile:');
    console.log(JSON.stringify(sectionInfo, null, 2));

    await page.screenshot({ path: 'assets/profile_scrolled_view.png', fullPage: false });
  } finally {
    await context.close();
  }
}

run().catch(console.error);
