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
  console.log('Navigating to profile page...');
  await page.goto('https://www.linkedin.com/in/me/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  const editProfileBtn = await page.$('button[aria-label="Edit profile"]');
  if (!editProfileBtn) {
    console.error('Could not find button[aria-label="Edit profile"]');
    await context.close();
    return;
  }

  console.log('Clicking button[aria-label="Edit profile"]...');
  await editProfileBtn.click();
  await page.waitForTimeout(3000);

  // Look for modal
  const modal = await page.$('div[role="dialog"]');
  if (!modal) {
    console.error('Modal did not appear');
    await context.close();
    return;
  }

  console.log('Modal found! Inspecting fields in modal...');
  const inputs = await modal.$$('input, textarea');
  for (let i = 0; i < inputs.length; i++) {
    const id = await inputs[i].getAttribute('id');
    const name = await inputs[i].getAttribute('name');
    const label = await inputs[i].getAttribute('aria-label');
    const val = await inputs[i].inputValue().catch(() => '');
    console.log(`Field ${i}: id="${id}", name="${name}", aria-label="${label}", value="${val.substring(0, 40)}"`);
  }

  // Find headline field (matching id or name containing headline or matching current value)
  let headlineInput = await modal.$('input[id*="headline" i], textarea[id*="headline" i], input[name*="headline" i], textarea[name*="headline" i]');
  if (!headlineInput) {
    // Try finding input with value matching "Facilities Manager"
    for (const inp of inputs) {
      const val = await inp.inputValue().catch(() => '');
      if (val.includes('Facilities Manager') || val.includes('MEP Systems')) {
        headlineInput = inp;
        break;
      }
    }
  }

  if (headlineInput) {
    console.log('Found headline field! Updating headline...');
    await headlineInput.click();
    await headlineInput.fill('');
    await headlineInput.fill(NEW_HEADLINE);
    console.log('New headline filled successfully.');
    await page.waitForTimeout(1000);

    // Click Save button
    const saveBtn = await modal.$('button:has-text("Save"), button.artdeco-button--primary');
    if (saveBtn) {
      console.log('Clicking Save button...');
      await saveBtn.click();
      await page.waitForTimeout(4000);
      console.log('Headline saved successfully!');
    } else {
      console.log('Could not find Save button.');
    }
  } else {
    console.log('Could not find headline input field.');
  }

  await page.screenshot({ path: 'assets/linkedin_headline_updated.png' });
  console.log('Screenshot saved to assets/linkedin_headline_updated.png');

  await context.close();
}

run().catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
