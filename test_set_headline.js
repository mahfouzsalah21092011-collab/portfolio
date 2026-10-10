const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';

const NEW_HEADLINE = "Facilities & MEP Department Manager | Commercial Shopping Malls & Retail Fit-Outs | Consultant-Side Technical Oversight, Preventive Maintenance (O&M), Testing & Handover | AUC Diploma | KSA • UAE • Qatar • Egypt";

async function run() {
  const context = await playwright.chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: { width: 1400, height: 900 }
  });

  try {
    const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();
    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/edit/intro/', { waitUntil: 'load' });
    await page.waitForTimeout(4000);

    const dialog = page.locator('dialog[data-testid="dialog"]');
    await dialog.waitFor({ timeout: 10000 });

    // Let's set Additional Name (Arabic) if empty
    const additionalNameInput = dialog.locator('input[id*="additionalName"], input[name*="additionalName"], input').nth(2); // check
    console.log('Testing headline update via execCommand...');

    const res = await page.evaluate((text) => {
      const editor = document.querySelector('dialog[data-testid="dialog"] div[contenteditable="true"].tiptap');
      if (!editor) return { error: 'Editor not found' };

      editor.focus();
      // Select all text in editor
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(editor);
      selection.removeAllRanges();
      selection.addRange(range);

      // Execute insertText
      const success = document.execCommand('insertText', false, text);
      return { success, innerText: editor.innerText, textLength: editor.innerText.length };
    }, NEW_HEADLINE);

    console.log('Result of execCommand:', res);

    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'assets/headline_after_execcommand.png' });

    // Also let's check Additional Name input
    const inputs = await page.evaluate(() => {
      const dialog = document.querySelector('dialog[data-testid="dialog"]');
      const allInputs = Array.from(dialog.querySelectorAll('input')).map((inp, idx) => ({
        idx,
        id: inp.id,
        name: inp.name,
        value: inp.value,
        placeholder: inp.placeholder
      }));
      return allInputs;
    });
    console.log('All dialog inputs:', inputs);

    if (res.success && res.textLength > 50) {
      console.log('Clicking Save button in dialog...');
      const saveBtn = dialog.locator('button:has-text("Save")');
      await saveBtn.click();
      await page.waitForTimeout(4000);
      console.log('Saved successfully!');
    }

    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true', { waitUntil: 'load' });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: 'assets/profile_headline_updated_live.png' });

  } finally {
    await context.close();
  }
}

run().catch(console.error);
