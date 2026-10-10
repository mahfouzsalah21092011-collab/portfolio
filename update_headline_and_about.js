const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';

const NEW_HEADLINE = "Facilities & MEP Department Manager | Commercial Shopping Malls & Retail Fit-Outs | Consultant-Side Technical Oversight, Preventive Maintenance (O&M), Testing & Handover | AUC Diploma | KSA • UAE • Qatar • Egypt";

const NEW_ABOUT = `Facilities and MEP Professional with 15+ years of experience across commercial shopping malls, retail fit-outs, facility operations, and consultant-side engineering oversight.

My career progression bridges practical engineering foundations with high-level asset management—advancing from electrical maintenance and industrial equipment into facilities supervision, mall operations, and consultant technical governance.

CONSULTANT TECHNICAL OVERSIGHT:
At Egyptian International Architecture Group (Mega Plan), I provide consultant-side technical oversight across 4 commercial malls: East Plaza, Kayan Plaza, Souq El Madina, and 60 Feddan Club Malls. My scope focuses on engineering rigor: reviewing MEP designs, specifications, and shop drawings; monitoring site execution; coordinating inspections, testing, and handover; compiling snag lists; and verifying Civil Defense life-safety compliance. I also periodically review ~11 retail fit-outs for base-building compliance.

FULL MALL FM OPERATIONS:
At Al-Amal for Development and Trade, I served as Facilities Manager for Course 10 Mall (~22,000 m²). I directed a 25-person facilities team (3 engineers, 4 supervisors, and technical staff), administered maintenance contracts valued at ~EGP 150k/month based on strict response and repair KPIs, managed operating budgets, monitored power/water consumption, and instituted inventory tracking. Supervised fit-outs for brands including Vodafone, Seif Pharmacy, Adidas, Active, NBE, Smart Furniture, 2B, and Tseppas.

VALUE CREATION HIGHLIGHTS:
• Route Optimization (Course 10 Mall): Coordinated an alternative water connection route, avoiding booster pumps and reducing expenditure from ~EGP 5M to ~EGP 750k (indicative estimate).
• System Rehabilitation (Souq El Madina Mall): Resolved slab drainage leakage by re-routing lines at correct gradients, creating inspection chambers, rehabilitating lift pumps, and adding grease traps.

CORE EXPERTISE:
Facilities Management | MEP Technical Oversight | Preventive & Corrective Maintenance (PPM/CM) | Commercial Mall Operations | Retail Fit-Out Supervision | Civil Defense Compliance | Testing & Handover | Utility Monitoring.

CREDENTIALS:
• Bachelor of Industrial Education (Electronics Technology) – Helwan University (Project: Excellent)
• Applied Supervisory Professional Diploma (210 hrs) – AUC School of Continuing Education

Open to Senior Facilities Manager & MEP Manager appointments across Saudi Arabia (KSA), UAE, Qatar, Kuwait, and Egypt.

Contact: Mahfouzsoliman2021@gmail.com | +2 01027629474 | +2 01221833667`;

async function run() {
  console.log('Connecting to browser with mahfouze profile...');
  const context = await playwright.chromium.launchPersistentContext(PROFILE_DIR, {
    channel: 'chrome',
    headless: false,
    viewport: { width: 1400, height: 900 }
  });

  try {
    const page = context.pages().length > 0 ? context.pages()[0] : await context.newPage();

    // ==========================================
    // 1. UPDATE HEADLINE
    // ==========================================
    console.log('\n--- STEP 1: Updating Headline ---');
    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/edit/intro/', { waitUntil: 'load' });
    await page.waitForTimeout(4000);

    const introDialog = page.locator('dialog[data-testid="dialog"]');
    await introDialog.waitFor({ timeout: 10000 });
    console.log('Intro Dialog located.');

    const headlineEditor = introDialog.locator('div[contenteditable="true"].tiptap');
    await headlineEditor.waitFor({ timeout: 5000 });
    await headlineEditor.click();
    await page.waitForTimeout(500);

    console.log('Clearing headline and inserting new headline...');
    await page.keyboard.press('Control+A');
    await page.waitForTimeout(300);
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(300);

    // Use page.keyboard.insertText to insert the full headline cleanly
    await page.keyboard.insertText(NEW_HEADLINE);
    await page.waitForTimeout(1000);

    const headlineTextAfter = await headlineEditor.innerText();
    console.log('Headline after insert:', headlineTextAfter.trim());

    const introSaveBtn = introDialog.locator('button:has-text("Save")');
    console.log('Clicking Intro Save button...');
    await introSaveBtn.click();
    await page.waitForTimeout(4000);

    // ==========================================
    // 2. UPDATE ABOUT SECTION
    // ==========================================
    console.log('\n--- STEP 2: Updating About Section ---');
    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/edit/forms/summary/new/', { waitUntil: 'load' });
    await page.waitForTimeout(4000);

    const aboutDialog = page.locator('dialog[data-testid="dialog"], .artdeco-modal');
    await aboutDialog.waitFor({ timeout: 10000 });
    console.log('About Dialog located.');

    const aboutEditor = aboutDialog.locator('div[contenteditable="true"].tiptap');
    await aboutEditor.waitFor({ timeout: 5000 });
    await aboutEditor.click();
    await page.waitForTimeout(500);

    console.log('Clearing About and inserting new About text...');
    await page.keyboard.press('Control+A');
    await page.waitForTimeout(300);
    await page.keyboard.press('Backspace');
    await page.waitForTimeout(300);

    await page.keyboard.insertText(NEW_ABOUT);
    await page.waitForTimeout(1500);

    const aboutLength = (await aboutEditor.innerText()).length;
    console.log(`Inserted About text length: ${aboutLength} characters`);

    await page.screenshot({ path: 'assets/about_before_save.png' });

    const aboutSaveBtn = aboutDialog.locator('button:has-text("Save")');
    console.log('Clicking About Save button...');
    await aboutSaveBtn.click();
    await page.waitForTimeout(5000);

    // ==========================================
    // 3. VERIFY PROFILE
    // ==========================================
    console.log('\n--- STEP 3: Verifying Profile ---');
    await page.goto('https://www.linkedin.com/in/mahfouz-salah-suleiman-9058b2207/?isSelfProfile=true', { waitUntil: 'load' });
    await page.waitForTimeout(4000);

    await page.screenshot({ path: 'assets/profile_headline_and_about_saved.png' });
    console.log('Profile screenshot saved to assets/profile_headline_and_about_saved.png');

  } finally {
    await context.close();
    console.log('Browser closed cleanly.');
  }
}

run().catch(console.error);
