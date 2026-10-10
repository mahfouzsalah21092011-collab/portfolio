const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';

async function run() {
  const context = await playwright.chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: null,
    args: ['--start-maximized']
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
  await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/edit/intro/', { waitUntil: 'load' });
  await page.waitForTimeout(3000);

  const headlineInfo = await page.evaluate(() => {
    // find all elements on page whose value contains "Facilities Manager"
    const all = Array.from(document.querySelectorAll('input, textarea, div[contenteditable="true"]'));
    return all.map(el => ({
      tag: el.tagName,
      id: el.id,
      name: el.name,
      value: el.value || el.innerText,
      className: el.className,
      parentElementTag: el.parentElement ? el.parentElement.tagName : null,
      parentClass: el.parentElement ? el.parentElement.className : null
    })).filter(x => x.value && (x.value.includes('Facilities') || x.value.includes('MEP')));
  });

  console.log('Found headline candidates:', JSON.stringify(headlineInfo, null, 2));

  await context.close();
}

run().catch(console.error);
