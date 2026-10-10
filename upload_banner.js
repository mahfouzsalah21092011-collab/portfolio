const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');
const path = require('path');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';
const BANNER_PATH = path.resolve('d:/hamada/mahfouze.cv/assets/linkedin-banner.png');

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

    const editBannerBtn = page.locator('button[aria-label="Edit background image"]');
    console.log('Clicking Edit background image button...');
    await editBannerBtn.click();
    await page.waitForTimeout(1000);

    const editCoverOption = page.locator('text=Edit cover image, div:has-text("Edit cover image")').first();
    console.log('Clicking Edit cover image option...');
    await editCoverOption.click();
    await page.waitForTimeout(3000);

    await page.screenshot({ path: 'assets/cover_editor_modal.png' });

    // Look for file input or Change photo button in modal
    const modalButtons = await page.evaluate(() => {
      const modal = document.querySelector('dialog, .artdeco-modal');
      if (!modal) return [];
      return Array.from(modal.querySelectorAll('button, input, label')).map(el => ({
        tag: el.tagName,
        text: el.innerText ? el.innerText.trim() : '',
        aria: el.getAttribute('aria-label'),
        type: el.getAttribute('type'),
        id: el.id
      }));
    });
    console.log('Elements in cover editor modal:', JSON.stringify(modalButtons, null, 2));

    // Check if there is an input[type="file"]
    const fileInput = page.locator('input[type="file"]');
    const count = await fileInput.count();
    console.log('File inputs found on page:', count);

    // If there's a Change photo or Change cover button, let's see
    const changeBtn = page.locator('button:has-text("Change photo"), button:has-text("Change cover"), label:has-text("Change photo")');
    if (await changeBtn.count() > 0) {
      console.log('Change photo button found! Preparing file upload...');
      const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser', { timeout: 5000 }).catch(() => null),
        changeBtn.first().click().catch(() => null)
      ]);
      if (fileChooser) {
        console.log('Setting file via fileChooser...');
        await fileChooser.setFiles(BANNER_PATH);
      } else {
        console.log('No fileChooser event, trying setInputFiles on file input...');
        await fileInput.first().setInputFiles(BANNER_PATH);
      }
    } else if (count > 0) {
      console.log('Directly setting input files on file input...');
      await fileInput.first().setInputFiles(BANNER_PATH);
    }

    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'assets/cover_after_file_set.png' });

    // Look for Apply or Save button
    const applyBtn = page.locator('button:has-text("Apply"), button:has-text("Save")').last();
    if (await applyBtn.isVisible()) {
      console.log('Clicking Apply/Save button...');
      await applyBtn.click();
      await page.waitForTimeout(5000);
      console.log('Banner applied!');
    }

    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true', { waitUntil: 'load' });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'assets/profile_with_new_banner.png' });

  } finally {
    await context.close();
  }
}

run().catch(console.error);
