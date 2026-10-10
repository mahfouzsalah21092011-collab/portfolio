const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';

async function run() {
  const context = await playwright.chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: null,
    args: ['--start-maximized']
  });

  try {
    const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/edit/intro/', { waitUntil: 'load' });
    await page.waitForTimeout(4000);

    const info = await page.evaluate(() => {
      // Find label containing "Headline"
      const labels = Array.from(document.querySelectorAll('*')).filter(el => {
        return el.childNodes.length === 1 && el.childNodes[0].nodeType === 3 && el.innerText.trim() === 'Headline';
      });

      if (labels.length === 0) return { error: 'No Headline label found' };

      const label = labels[0];
      const forAttr = label.getAttribute('for');
      let targetInput = forAttr ? document.getElementById(forAttr) : null;
      if (!targetInput) {
        // Find next input/textarea in parent or following sibling
        targetInput = label.parentElement.querySelector('input, textarea') || label.nextElementSibling;
      }

      return {
        labelTag: label.tagName,
        labelFor: forAttr,
        targetTag: targetInput ? targetInput.tagName : null,
        targetId: targetInput ? targetInput.id : null,
        targetClass: targetInput ? targetInput.className : null,
        targetValue: targetInput ? (targetInput.value || targetInput.innerText) : null
      };
    });

    console.log('Headline label and target element info:', JSON.stringify(info, null, 2));
  } finally {
    await context.close();
  }
}

run().catch(console.error);
