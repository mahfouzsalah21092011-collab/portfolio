const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';

const NEW_HEADLINE = "Facilities & MEP Department Manager | Commercial Shopping Malls & Retail Fit-Outs | Consultant-Side Technical Oversight, Preventive Maintenance (O&M), Testing & Handover | AUC Diploma | KSA • UAE • Qatar • Egypt";

async function run() {
  console.log('Launching browser with mahfouze profile...');
  const context = await playwright.chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: null,
    args: ['--start-maximized']
  });

  const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
  console.log('Navigating directly to edit intro URL...');
  await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/edit/intro/', { waitUntil: 'load' });
  await page.waitForTimeout(4000);

  console.log('Page URL after navigation:', page.url());

  // Inspect form fields in the modal
  const inputs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input, textarea')).map(el => ({
      id: el.id,
      name: el.name,
      label: el.getAttribute('aria-label') || '',
      placeholder: el.placeholder,
      value: el.value ? el.value.substring(0, 50) : ''
    }));
  });
  console.log('Inputs found:', JSON.stringify(inputs, null, 2));

  // Find the headline field
  let headlineSelector = null;
  for (const inp of inputs) {
    if (inp.id.toLowerCase().includes('headline') || inp.name.toLowerCase().includes('headline') || inp.value.includes('Facilities Manager')) {
      headlineSelector = inp.id ? `#${inp.id}` : `[name="${inp.name}"]`;
      console.log('Selected headline selector:', headlineSelector);
      break;
    }
  }

  if (headlineSelector) {
    console.log('Updating headline...');
    await page.fill(headlineSelector, NEW_HEADLINE);
    await page.waitForTimeout(1000);

    // Find Save button
    console.log('Looking for Save button...');
    const saveBtn = await page.$('button.artdeco-button--primary, button:has-text("Save")');
    if (saveBtn) {
      console.log('Clicking Save...');
      await saveBtn.click();
      await page.waitForTimeout(5000);
      console.log('Save completed!');
    } else {
      console.log('Save button not found');
    }
  } else {
    console.log('Could not find headline selector');
  }

  // Take screenshot of result
  await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true', { waitUntil: 'load' });
  await page.waitForTimeout(4000);
  await page.screenshot({ path: 'assets/linkedin_headline_updated.png' });
  console.log('Screenshot saved to assets/linkedin_headline_updated.png');

  await context.close();
}

run().catch(console.error);
