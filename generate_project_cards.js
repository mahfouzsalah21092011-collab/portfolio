const fs = require('fs');
const path = require('path');

const cards = [
  {
    id: 'project-east-plaza',
    roleBadge: 'MEGA PLAN · CONSULTANT-SIDE TECHNICAL OVERSIGHT',
    title: 'East Plaza Mall',
    subtitle: 'Commercial Shopping Center · MEP Technical Audits & Commissioning',
    location: 'Cairo, Egypt · October 2024 – Present',
    badges: ['MEP Design Review', 'Shop Drawings Audit', 'Civil Defense Compliance', 'Snagging & Handover'],
    stats: [
      { label: 'Scope', val: 'Full MEP Systems' },
      { label: 'Authority', val: 'Consultant Oversight' },
      { label: 'Standards', val: 'Civil Defense & Codes' }
    ],
    svgType: 'hvac-duct'
  },
  {
    id: 'project-kayan-plaza',
    roleBadge: 'MEGA PLAN · CONSULTANT-SIDE TECHNICAL OVERSIGHT',
    title: 'Kayan Plaza Mall',
    subtitle: 'Commercial Shopping Center · Execution Follow-Up & Snagging Governance',
    location: 'Cairo, Egypt · October 2024 – Present',
    badges: ['Site Inspection Progress', 'MEP Clash Resolution', 'Quality Snag Lists', 'Defect-Free Handover'],
    stats: [
      { label: 'Role', val: 'Technical Governance' },
      { label: 'Focus', val: 'Contractor Compliance' },
      { label: 'Phase', val: 'Execution & Snagging' }
    ],
    svgType: 'electrical-grid'
  },
  {
    id: 'project-souq-el-madina',
    roleBadge: 'MEGA PLAN · CONSULTANT-SIDE TECHNICAL OVERSIGHT',
    title: 'Souq El Madina Mall',
    subtitle: 'Drainage Gradient Remediation & Pump Control Automation Overhaul',
    location: 'Cairo, Egypt · October 2024 – Present',
    badges: ['Gravitational Inverts', 'Alternating Pump Sequence', 'Dedicated Chambers', 'F&B Grease Traps'],
    stats: [
      { label: 'Challenge', val: 'Suspended Slab Leaks' },
      { label: 'Solution', val: 'Invert & Panel Rework' },
      { label: 'Outcome', val: 'Zero Slab Penetration' }
    ],
    svgType: 'pump-hydraulics'
  },
  {
    id: 'project-60-feddan',
    roleBadge: 'MEGA PLAN · CONSULTANT-SIDE TECHNICAL OVERSIGHT',
    title: '60 Feddan Club Mall',
    subtitle: 'Commercial & Sports Complex · Retail Tenant Fit-Outs & Life Safety',
    location: 'Cairo, Egypt · October 2024 – Present',
    badges: ['Retail Tenant Reviews', 'Fire Alarm Loops', 'Smoke Management', 'Base-Building Interfaces'],
    stats: [
      { label: 'Property', val: 'Sports & Retail Club' },
      { label: 'Fit-Outs', val: 'Retail Interfaces' },
      { label: 'Life Safety', val: 'Egyptian Civil Defense' }
    ],
    svgType: 'fire-life-safety'
  },
  {
    id: 'project-cross10-ops',
    roleBadge: 'AL-AMAL FOR DEVELOPMENT AND TRADE · FACILITIES MANAGEMENT',
    title: 'Cross 10 Mall (~22,000 m²)',
    subtitle: 'Full-Lifecycle Commercial Mall Operations & Retail Tenant Fit-Outs',
    location: '10th of Ramadan City, Egypt · January 2017 – September 2024',
    badges: ['25-Person Team Leadership', 'PPM/CM Asset Schedules', 'EGP 150k/mo Contracts', 'Tier-1 Retail Handover'],
    stats: [
      { label: 'Asset Area', val: '~22,000 m² BUA' },
      { label: 'Team Size', val: '25 O&M Staff' },
      { label: 'Key Tenants', val: 'Vodafone, NBE, Adidas' }
    ],
    svgType: 'mall-operations'
  },
  {
    id: 'project-cross10-water',
    roleBadge: 'AL-AMAL FOR DEVELOPMENT AND TRADE · INFRASTRUCTURE OPTIMIZATION',
    title: 'Cross 10 Mall – Water Route',
    subtitle: 'Municipal Water Infrastructure Optimization & Booster Pump Avoidance',
    location: '10th of Ramadan City, Egypt · January 2017 – December 2017',
    badges: ['Boundary Coordination', 'Booster Station Avoidance', 'Hydraulic Level Survey', 'Indicative Cost Optimization'],
    stats: [
      { label: 'Initial Est.', val: '~EGP 5,000,000' },
      { label: 'Executed Route', val: '~EGP 750,000' },
      { label: 'OPEX Impact', val: 'Zero Booster Energy' }
    ],
    svgType: 'water-infrastructure'
  },
  {
    id: 'project-hyperone',
    roleBadge: 'HYPER ONE TRADING COMPANY · FACILITIES SUPERVISION',
    title: 'Hyper One Retail Facility',
    subtitle: 'High-Traffic Retail Hypermarket Facilities & Critical Plant Supervision',
    location: '10th of Ramadan City, Egypt · November 2016 – January 2017',
    badges: ['Sales Floor Supervision', 'Cold Chain Power Feeds', 'Emergency Generators', 'HSE Retail Standards'],
    stats: [
      { label: 'Facility Type', val: 'Retail Hypermarket' },
      { label: 'Power Backup', val: 'Diesel Generators' },
      { label: 'Compliance', val: 'HSE & Fire Safety' }
    ],
    svgType: 'hypermarket-plant'
  },
  {
    id: 'project-municipal-lighting',
    roleBadge: 'INTERNATIONAL CONTRACTING CO. (MUNTASER) · ELECTRICAL ENGINEERING',
    title: 'Urban Public Lighting Networks',
    subtitle: 'Municipal Low-Voltage Infrastructure & Substation Distribution Works',
    location: 'Sheikh Zayed · 15 May · Shorouk · Luxor · 2010 – 2014',
    badges: ['LV Feeder Pillars', 'Cable Insulation Testing', 'Substation Interfacing', 'Automation Photocells'],
    stats: [
      { label: 'Coverage', val: '4 Satellite Cities' },
      { label: 'Infrastructure', val: 'LV Distribution & Pillars' },
      { label: 'Testing', val: 'Megger & Load Balance' }
    ],
    svgType: 'lighting-grid'
  }
];

function getSvgSchematic(type) {
  switch (type) {
    case 'hvac-duct':
      return `
        <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="schematic">
          <rect x="20" y="40" width="280" height="200" rx="8" stroke="#00A389" stroke-width="2" stroke-dasharray="6 4" fill="rgba(0,163,137,0.03)"/>
          <path d="M40 90 H280 M40 140 H280 M40 190 H280" stroke="#CCD6F6" stroke-width="1.5" stroke-opacity="0.3"/>
          <path d="M100 40 V240 M200 40 V240" stroke="#CCD6F6" stroke-width="1.5" stroke-opacity="0.3"/>
          <!-- Chiller & AHU loop -->
          <circle cx="100" cy="90" r="22" stroke="#00A389" stroke-width="2.5" fill="#0A192F"/>
          <path d="M90 90 L110 90 M100 80 L100 100" stroke="#00A389" stroke-width="2"/>
          <circle cx="200" cy="140" r="22" stroke="#D4AF37" stroke-width="2.5" fill="#0A192F"/>
          <path d="M190 140 L210 140 M200 130 L200 150" stroke="#D4AF37" stroke-width="2"/>
          <!-- Duct flows -->
          <path d="M122 90 Q160 90 178 130" stroke="#00A389" stroke-width="3" stroke-linecap="round"/>
          <polygon points="182,130 170,124 176,136" fill="#00A389"/>
          <!-- VAV Box -->
          <rect x="70" y="175" width="60" height="30" rx="4" stroke="#00E5C0" stroke-width="2" fill="rgba(0,229,192,0.1)"/>
          <text x="100" y="195" fill="#00E5C0" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">AHU-01</text>
          <!-- Pressure metric -->
          <rect x="170" y="175" width="60" height="30" rx="4" stroke="#D4AF37" stroke-width="2" fill="rgba(212,175,55,0.1)"/>
          <text x="200" y="195" fill="#D4AF37" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">250 Pa</text>
        </svg>`;

    case 'electrical-grid':
      return `
        <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="schematic">
          <rect x="30" y="30" width="260" height="220" rx="10" stroke="#00A389" stroke-width="2" fill="rgba(10,25,47,0.7)"/>
          <!-- Main Busbar -->
          <line x1="60" y1="70" x2="260" y2="70" stroke="#D4AF37" stroke-width="5" stroke-linecap="round"/>
          <text x="160" y="60" fill="#D4AF37" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">MDB 380V / 3-PHASE BUSBAR</text>
          <!-- Feeders -->
          <line x1="90" y1="72" x2="90" y2="130" stroke="#00A389" stroke-width="2.5"/>
          <line x1="160" y1="72" x2="160" y2="130" stroke="#00A389" stroke-width="2.5"/>
          <line x1="230" y1="72" x2="230" y2="130" stroke="#00A389" stroke-width="2.5"/>
          <!-- Breakers / Meters -->
          <rect x="75" y="130" width="30" height="40" rx="3" stroke="#00E5C0" stroke-width="2" fill="#0A192F"/>
          <text x="90" y="155" fill="#00E5C0" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">SMDB1</text>
          <rect x="145" y="130" width="30" height="40" rx="3" stroke="#00E5C0" stroke-width="2" fill="#0A192F"/>
          <text x="160" y="155" fill="#00E5C0" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">SMDB2</text>
          <rect x="215" y="130" width="30" height="40" rx="3" stroke="#00E5C0" stroke-width="2" fill="#0A192F"/>
          <text x="230" y="155" fill="#00E5C0" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">EMERG</text>
          <!-- Snagging checklist marks -->
          <circle cx="90" cy="205" r="14" stroke="#00A389" stroke-width="2" fill="rgba(0,163,137,0.2)"/>
          <path d="M84 205 L88 209 L97 200" stroke="#00E5C0" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="160" cy="205" r="14" stroke="#00A389" stroke-width="2" fill="rgba(0,163,137,0.2)"/>
          <path d="M154 205 L158 209 L167 200" stroke="#00E5C0" stroke-width="2.5" stroke-linecap="round"/>
          <circle cx="230" cy="205" r="14" stroke="#D4AF37" stroke-width="2" fill="rgba(212,175,55,0.2)"/>
          <path d="M224 205 L228 209 L237 200" stroke="#D4AF37" stroke-width="2.5" stroke-linecap="round"/>
        </svg>`;

    case 'pump-hydraulics':
      return `
        <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="schematic">
          <!-- Invert gradient line -->
          <path d="M30 60 L180 120 L270 120" stroke="#D4AF37" stroke-width="3" stroke-dasharray="4 2"/>
          <text x="100" y="80" fill="#D4AF37" font-size="11" font-family="sans-serif" font-weight="bold">1.5% GRAVITATIONAL INVERT</text>
          <!-- Pit / Sump Basin -->
          <rect x="170" y="120" width="110" height="110" rx="4" stroke="#00A389" stroke-width="2" fill="rgba(0,163,137,0.06)"/>
          <text x="225" y="140" fill="#00E5C0" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">LIFT WET PIT</text>
          <!-- Dual Alternating Pumps -->
          <circle cx="195" cy="180" r="16" stroke="#00E5C0" stroke-width="2" fill="#0A192F"/>
          <text x="195" y="184" fill="#00E5C0" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">P-1</text>
          <circle cx="255" cy="180" r="16" stroke="#D4AF37" stroke-width="2" fill="#0A192F"/>
          <text x="255" y="184" fill="#D4AF37" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">P-2</text>
          <!-- Automation Control Box -->
          <rect x="40" y="130" width="90" height="85" rx="6" stroke="#00A389" stroke-width="2" fill="#0A192F"/>
          <rect x="50" y="145" width="20" height="8" rx="2" fill="#00E5C0"/>
          <rect x="75" y="145" width="20" height="8" rx="2" fill="#D4AF37"/>
          <text x="85" y="175" fill="#CCD6F6" font-size="10" font-family="sans-serif" text-anchor="middle">ALTERNATING</text>
          <text x="85" y="195" fill="#00E5C0" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">LEAD / LAG</text>
        </svg>`;

    case 'fire-life-safety':
      return `
        <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="schematic">
          <circle cx="160" cy="130" r="95" stroke="#00A389" stroke-width="1.5" stroke-dasharray="6 4" fill="rgba(0,163,137,0.03)"/>
          <!-- Central Fire Alarm Matrix -->
          <rect x="110" y="80" width="100" height="100" rx="8" stroke="#D4AF37" stroke-width="2.5" fill="#0A192F"/>
          <path d="M160 100 L175 125 H145 Z" fill="#D4AF37"/>
          <text x="160" y="150" fill="#FFFFFF" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle">FACP</text>
          <text x="160" y="165" fill="#00E5C0" font-size="9" font-family="sans-serif" text-anchor="middle">CIVIL DEFENSE</text>
          <!-- Peripheral devices -->
          <circle cx="70" cy="70" r="18" stroke="#00A389" stroke-width="2" fill="#0A192F"/>
          <text x="70" y="74" fill="#00E5C0" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">SMOKE</text>
          <line x1="88" y1="78" x2="110" y2="95" stroke="#00A389" stroke-width="2"/>
          <circle cx="250" cy="70" r="18" stroke="#00A389" stroke-width="2" fill="#0A192F"/>
          <text x="250" y="74" fill="#00E5C0" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">SPRINK</text>
          <line x1="232" y1="78" x2="210" y2="95" stroke="#00A389" stroke-width="2"/>
          <circle cx="160" cy="225" r="18" stroke="#00A389" stroke-width="2" fill="#0A192F"/>
          <text x="160" y="229" fill="#00E5C0" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">PRESS</text>
          <line x1="160" y1="207" x2="160" y2="180" stroke="#00A389" stroke-width="2"/>
        </svg>`;

    case 'mall-operations':
      return `
        <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="schematic">
          <!-- Mall Building Profile -->
          <path d="M40 210 L40 120 L160 70 L280 120 L280 210 Z" stroke="#00A389" stroke-width="2" fill="rgba(0,163,137,0.05)"/>
          <line x1="40" y1="210" x2="280" y2="210" stroke="#00A389" stroke-width="3"/>
          <!-- Retail Concourse Units -->
          <rect x="65" y="145" width="40" height="40" rx="3" stroke="#00E5C0" stroke-width="1.5" fill="#0A192F"/>
          <text x="85" y="169" fill="#00E5C0" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">SHOP 1</text>
          <rect x="120" y="145" width="40" height="40" rx="3" stroke="#00E5C0" stroke-width="1.5" fill="#0A192F"/>
          <text x="140" y="169" fill="#00E5C0" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">SHOP 2</text>
          <rect x="175" y="145" width="40" height="40" rx="3" stroke="#00E5C0" stroke-width="1.5" fill="#0A192F"/>
          <text x="195" y="169" fill="#00E5C0" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">SHOP 3</text>
          <rect x="230" y="145" width="30" height="40" rx="3" stroke="#D4AF37" stroke-width="1.5" fill="#0A192F"/>
          <text x="245" y="169" fill="#D4AF37" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">NBE</text>
          <!-- Operations Center Badge -->
          <rect x="100" y="85" width="120" height="25" rx="12" stroke="#D4AF37" stroke-width="1.5" fill="#0A192F"/>
          <text x="160" y="102" fill="#D4AF37" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">22,000 m² BUA · O&M</text>
        </svg>`;

    case 'water-infrastructure':
      return `
        <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="schematic">
          <!-- Municipal Mains -->
          <rect x="30" y="40" width="80" height="45" rx="6" stroke="#00A389" stroke-width="2" fill="#0A192F"/>
          <text x="70" y="62" fill="#00E5C0" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">MUNICIPAL</text>
          <text x="70" y="75" fill="#CCD6F6" font-size="9" font-family="sans-serif" text-anchor="middle">MAINS</text>
          <!-- Original Long Route (Cancelled) -->
          <path d="M110 50 Q240 20 270 120" stroke="#E63946" stroke-width="2" stroke-dasharray="5 4" stroke-opacity="0.6"/>
          <text x="230" y="45" fill="#E63946" font-size="10" font-family="sans-serif" font-weight="bold">ORIGINAL ROUTE</text>
          <text x="230" y="60" fill="#E63946" font-size="9" font-family="sans-serif">MANDATED BOOSTER</text>
          <!-- Optimized Direct Route -->
          <path d="M110 65 L200 135 L200 200" stroke="#00E5C0" stroke-width="4"/>
          <polygon points="200,205 194,195 206,195" fill="#00E5C0"/>
          <text x="130" y="115" fill="#D4AF37" font-size="11" font-family="sans-serif" font-weight="bold">OPTIMIZED ROUTE</text>
          <text x="130" y="130" fill="#00E5C0" font-size="10" font-family="sans-serif">NO BOOSTER NEEDED</text>
          <!-- Mall Intake Station -->
          <rect x="150" y="205" width="100" height="45" rx="6" stroke="#D4AF37" stroke-width="2" fill="#0A192F"/>
          <text x="200" y="226" fill="#D4AF37" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">MALL BOUNDARY</text>
          <text x="200" y="240" fill="#CCD6F6" font-size="9" font-family="sans-serif" text-anchor="middle">DIRECT GRAVITY HEAD</text>
        </svg>`;

    case 'hypermarket-plant':
      return `
        <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="schematic">
          <rect x="30" y="35" width="260" height="210" rx="8" stroke="#00A389" stroke-width="2" fill="rgba(10,25,47,0.8)"/>
          <!-- Generator & Rack -->
          <rect x="50" y="60" width="90" height="60" rx="4" stroke="#D4AF37" stroke-width="2" fill="#0A192F"/>
          <text x="95" y="85" fill="#D4AF37" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">DIESEL GENSET</text>
          <text x="95" y="102" fill="#CCD6F6" font-size="9" font-family="sans-serif" text-anchor="middle">STANDBY POWER</text>
          <rect x="180" y="60" width="90" height="60" rx="4" stroke="#00E5C0" stroke-width="2" fill="#0A192F"/>
          <text x="225" y="85" fill="#00E5C0" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">COLD CHAIN</text>
          <text x="225" y="102" fill="#CCD6F6" font-size="9" font-family="sans-serif" text-anchor="middle">REFRIGERATION</text>
          <!-- Sales floor monitoring lines -->
          <line x1="95" y1="120" x2="95" y2="160" stroke="#00A389" stroke-width="2"/>
          <line x1="225" y1="120" x2="225" y2="160" stroke="#00A389" stroke-width="2"/>
          <line x1="95" y1="160" x2="225" y2="160" stroke="#00A389" stroke-width="2"/>
          <rect x="110" y="175" width="100" height="40" rx="20" stroke="#00A389" stroke-width="1.5" fill="rgba(0,163,137,0.15)"/>
          <text x="160" y="199" fill="#FFFFFF" font-size="11" font-family="sans-serif" font-weight="bold" text-anchor="middle">HSE & DAILY AUDITS</text>
        </svg>`;

    case 'lighting-grid':
      return `
        <svg viewBox="0 0 320 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="schematic">
          <!-- Highway / Street Line -->
          <line x1="30" y1="140" x2="290" y2="140" stroke="#00A389" stroke-width="3" stroke-dasharray="10 6"/>
          <!-- Substation Transformer -->
          <rect x="40" y="40" width="80" height="50" rx="4" stroke="#D4AF37" stroke-width="2" fill="#0A192F"/>
          <text x="80" y="65" fill="#D4AF37" font-size="10" font-family="sans-serif" font-weight="bold" text-anchor="middle">11kV / 400V</text>
          <text x="80" y="78" fill="#CCD6F6" font-size="9" font-family="sans-serif" text-anchor="middle">SUBSTATION</text>
          <!-- Feeder Pillars -->
          <line x1="80" y1="90" x2="80" y2="180" stroke="#00E5C0" stroke-width="2.5"/>
          <rect x="65" y="180" width="30" height="45" rx="3" stroke="#00E5C0" stroke-width="2" fill="#0A192F"/>
          <text x="80" y="206" fill="#00E5C0" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">FP-1</text>
          <!-- Lighting Poles -->
          <line x1="160" y1="100" x2="160" y2="180" stroke="#CCD6F6" stroke-width="2"/>
          <circle cx="160" cy="95" r="8" fill="#D4AF37"/>
          <line x1="240" y1="100" x2="240" y2="180" stroke="#CCD6F6" stroke-width="2"/>
          <circle cx="240" cy="95" r="8" fill="#D4AF37"/>
          <!-- Cable Run -->
          <path d="M95 200 L160 200 L240 200" stroke="#00E5C0" stroke-width="2" stroke-dasharray="4 2"/>
          <text x="180" y="235" fill="#CCD6F6" font-size="10" font-family="sans-serif" text-anchor="middle">UNDERGROUND ARMORED LV CABLE</text>
        </svg>`;

    default:
      return '';
  }
}

function generateHtml(card) {
  const badgesHtml = card.badges.map(b => `<span class="badge">${b}</span>`).join('\n');
  const statsHtml = card.stats.map(s => `
    <div class="stat-col">
      <div class="stat-label">${s.label}</div>
      <div class="stat-val">${s.val}</div>
    </div>
  `).join('\n');
  const svg = getSvgSchematic(card.svgType);

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 1280px;
    height: 720px;
    background: #0A192F;
    background-image: 
      radial-gradient(circle at 85% 25%, rgba(0, 163, 137, 0.18) 0%, transparent 55%),
      radial-gradient(circle at 15% 85%, rgba(212, 175, 55, 0.08) 0%, transparent 45%),
      linear-gradient(135deg, #0A192F 0%, #112240 100%);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #FFFFFF;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 48px 56px 40px 56px;
  }
  /* Grid pattern overlay */
  .grid-bg {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-size: 40px 40px;
    background-image: 
      linear-gradient(to right, rgba(204, 214, 246, 0.03) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(204, 214, 246, 0.03) 1px, transparent 1px);
    pointer-events: none;
  }
  .accent-stripe {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #D4AF37 0%, #00A389 50%, #00E5C0 100%);
  }
  .main-container {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    gap: 40px;
  }
  .content-left {
    flex: 1.3;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .role-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #00E5C0;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 16px;
  }
  .role-pill::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    background: #00E5C0;
    border-radius: 50%;
    box-shadow: 0 0 8px #00E5C0;
  }
  h1 {
    font-size: 44px;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.5px;
    color: #FFFFFF;
    margin-bottom: 12px;
  }
  .subtitle {
    font-size: 20px;
    font-weight: 400;
    line-height: 1.4;
    color: #CCD6F6;
    margin-bottom: 8px;
  }
  .location-tag {
    font-size: 14px;
    font-weight: 500;
    color: #8892B0;
    margin-bottom: 24px;
  }
  .badges-row {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 28px;
  }
  .badge {
    padding: 6px 14px;
    border-radius: 16px;
    font-size: 13px;
    font-weight: 600;
    background: rgba(0, 163, 137, 0.12);
    border: 1px solid rgba(0, 229, 192, 0.35);
    color: #00E5C0;
  }
  .stats-card {
    display: flex;
    flex-direction: row;
    background: rgba(17, 34, 64, 0.85);
    border: 1px solid rgba(204, 214, 246, 0.12);
    border-radius: 12px;
    padding: 16px 20px;
    gap: 24px;
    backdrop-filter: blur(8px);
  }
  .stat-col {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  .stat-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #D4AF37;
    font-weight: 700;
  }
  .stat-val {
    font-size: 15px;
    font-weight: 600;
    color: #FFFFFF;
  }
  .graphic-right {
    flex: 0.9;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(10, 25, 47, 0.5);
    border: 1px solid rgba(0, 163, 137, 0.2);
    border-radius: 16px;
    padding: 24px;
    box-shadow: inset 0 0 30px rgba(0, 163, 137, 0.05), 0 12px 32px rgba(0,0,0,0.4);
  }
  .schematic {
    width: 100%;
    height: auto;
    max-height: 380px;
  }
  footer {
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(204, 214, 246, 0.1);
    padding-top: 16px;
    font-size: 12px;
    color: #8892B0;
    letter-spacing: 1px;
  }
  .brand-name {
    font-weight: 700;
    color: #CCD6F6;
  }
  .brand-badge {
    color: #D4AF37;
    font-weight: 600;
  }
</style>
</head>
<body>
  <div class="grid-bg"></div>
  <div class="accent-stripe"></div>
  <div class="main-container">
    <div class="content-left">
      <div class="role-pill">${card.roleBadge}</div>
      <h1>${card.title}</h1>
      <div class="subtitle">${card.subtitle}</div>
      <div class="location-tag">${card.location}</div>
      <div class="badges-row">
        ${badgesHtml}
      </div>
      <div class="stats-card">
        ${statsHtml}
      </div>
    </div>
    <div class="graphic-right">
      ${svg}
    </div>
  </div>
  <footer>
    <div class="brand-name">MAHFOUZ SALAH SULEIMAN</div>
    <div class="brand-badge">FACILITIES MANAGEMENT & MEP SYSTEMS PORTFOLIO</div>
    <div>16:9 TECHNICAL PROJECT CASE STUDY</div>
  </footer>
</body>
</html>`;
}

// Generate HTML files
const htmlDir = path.join(__dirname, 'scratch_cards');
if (!fs.existsSync(htmlDir)) fs.mkdirSync(htmlDir, { recursive: true });

cards.forEach(card => {
  const html = generateHtml(card);
  const filePath = path.join(htmlDir, `${card.id}.html`);
  fs.writeFileSync(filePath, html, 'utf8');
});

console.log(`Generated ${cards.length} HTML templates in ${htmlDir}`);

