const path = require('path');
const fs = require('fs');
const playwright = require('C:/Users/wolfn/AppData/Local/npm-cache/_npx/9833c18b2d85bc59/node_modules/playwright-core');

const PROFILE_DIR = 'C:/Users/wolfn/AppData/Local/ms-playwright-mcp/mahfouze';

const NEW_HEADLINE = "Facilities & MEP Department Manager | Commercial Shopping Malls & Retail Fit-Outs | Consultant-Side Technical Oversight, Preventive Maintenance (O&M), Testing & Handover | AUC Diploma | KSA • UAE • Qatar • Egypt";

const NEW_ABOUT = `I am a Facilities and MEP Professional with over 15 years of technical and operational experience spanning commercial shopping mall developments, retail fit-outs, facility operations, and consultant-side engineering oversight.

My career progression bridges practical engineering foundations with high-level asset management. Starting with hands-on electrical maintenance and heavy equipment reliability, I advanced into facilities supervision and long-term shopping mall operations, before taking on my current role delivering consultant-side technical oversight across a portfolio of commercial malls.

At Egyptian International Architecture Group (Mega Plan), I provide consultant-side technical oversight across four commercial mall developments: East Plaza Mall, Kayan Plaza Mall, Souq El Madina Mall, and 60 Feddan Club Mall. My mandate focuses on engineering rigor: reviewing MEP designs, calculations, technical specifications, and shop drawings; following execution progress step by step; coordinating inspections, testing, and handover; preparing comprehensive technical snag lists; and overseeing technical compliance with applicable Civil Defense fire and life-safety requirements. In addition, I periodically review approximately 11 tenant fit-outs across the mall portfolio to ensure structural and MEP interface compliance.

Previously, at Al-Amal for Development and Trade, I served as Facilities Manager for Course 10 Mall in 10th of Ramadan City (~22,000 m²). I supported the asset across its lifecycle—from late construction and fit-out through operational handover and long-term facility management. I directed a 25-person facilities team (3 engineers, 4 supervisors, and technicians/operators), administered maintenance contracts valued at approximately EGP 150,000/month based on strict response and repair KPIs, managed operating budgets, monitored power and water consumption, and instituted structured inventory tracking. I supervised fit-outs and operational interfaces for major retail brands including Vodafone, Seif Pharmacy, Adidas, Active, National Bank of Egypt, Smart Furniture, 2B, and Tseppas.

My approach combines engineering precision with practical problem-solving:
• Route Optimization: At Course 10 Mall, coordinated with adjacent site stakeholders to identify a closer alternative water-supply route, avoiding the originally planned booster-pump approach and reducing the estimated connection expenditure from ~EGP 5M to ~EGP 750k (indicative project estimate).
• System Rehabilitation: At Souq El Madina Mall, resolved chronic concrete-slab drainage leakage by re-routing lines at correct gradients, creating dedicated shop-to-main inspection chambers, rehabilitating lift pumps with an alternating sequence, and integrating restaurant grease traps.

Core Technical & Management Competencies:
• Facilities Operations: Preventive & Corrective Maintenance (PPM/CM), Operating Budgets, Utility Monitoring, SLA/KPI Tracking.
• MEP Technical Delivery: Shop Drawing Review, Installation Monitoring, Testing & Commissioning (T&C), Snagging, Handover.
• Retail Mall Management: Tenant Fit-Out Coordination, Retail Interfaces, Civil Defense / Life Safety Compliance.
• Systems Covered: Electrical Distribution, HVAC, Firefighting, Fire Alarms, Plumbing & Drainage, Pumps & Controls.

Education & Credentials:
• Bachelor of Industrial Education, Electronics Technology Dept. – Helwan University (Graduation Project Grade: Excellent)
• Applied Supervisory Professional Diploma (210 Contact Hours) – AUC School of Continuing Education

Targeting Senior Facilities Manager, Facilities Manager, and MEP Manager appointments across Saudi Arabia (KSA), United Arab Emirates (UAE), Qatar, Kuwait, and Egypt.

Contact: Mahfouzsoliman2021@gmail.com | +2 01027629474 | +2 01221833667
LinkedIn: linkedin.com/in/mahfouz-salah-suleiman-9058b2207`;

async function main() {
  console.log('Connecting to Playwright with profile:', PROFILE_DIR);
  
  let context;
  try {
    context = await playwright.chromium.launchPersistentContext(PROFILE_DIR, {
      channel: 'chrome',
      headless: false,
      viewport: null,
      args: ['--start-maximized']
    });
  } catch (err) {
    if (err.message.includes('Process singleton') || err.message.includes('Timeout')) {
      console.error('\n>>> ERROR: Chrome is currently open with the mahfouze profile!');
      console.error('>>> Please close the open Chrome window first so Playwright can attach to the profile session.\n');
      process.exit(2);
    }
    throw err;
  }

  const pages = context.pages();
  const page = pages.length > 0 ? pages[0] : await context.newPage();

  console.log('Navigating to LinkedIn profile page...');
  await page.goto('https://www.linkedin.com/in/me/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(4000);

  const currentUrl = page.url();
  console.log('Current URL:', currentUrl);

  // Take screenshot
  const screenshotPath = 'assets/linkedin_current_view.png';
  await page.screenshot({ path: screenshotPath, fullPage: false });
  console.log('Screenshot saved to:', screenshotPath);

  // Check if logged in
  if (currentUrl.includes('/login') || currentUrl.includes('/authwall')) {
    console.error('User is not logged in. Please log in first.');
    return;
  }

  console.log('Verified profile page access. Ready for automated editing.');
  
  // Keep open for user inspection
  console.log('Browser is active on mahfouze profile.');
}

main().catch(err => {
  console.error('Execution error:', err);
  process.exit(1);
});
