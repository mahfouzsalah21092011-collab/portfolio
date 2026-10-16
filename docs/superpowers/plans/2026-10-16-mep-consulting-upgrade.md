# Implementation Plan: Upgrade Mahfouz Salah Suleiman's Professional Profile with New MEP Consulting Experience

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate new consultant-side MEP drawing review, tenant coordination, and execution follow-up experience across Madinat Masr Developments (3 malls, 20+ tenants), Sky Walk (10 tenants), and Muse Mall (35+ tenants) into Mahfouz's CV, Portfolio, Master Reference, Personal Website, LinkedIn positioning, and Interview preparation materials.

**Architecture:** Maintain existing visual identity, design systems, and verified career history. Enhance the existing Mega Plan employment entry and project showcase sections. Synchronize across Word documents (.docx), native PDF exports (.pdf via Word COM), HTML/CSS website (`index.html`), and strategic markdown guides.

**Tech Stack:** Microsoft Word COM Automation (PowerShell), python-docx, pypdf, HTML5/CSS3 (DM Sans, Manrope, responsive flex/grid), Git/GitHub Pages, Markdown.

**Spec:** User prompt dated 2026-10-16.

## Global Constraints
- Preserve all existing verified employment dates (Mega Plan: Oct 2024 – Present; Al-Amal: Jan 2017 – Sep 2024; Hyper One: Nov 2016 – Jan 2017; Eng. Contracting Office: Nov 2014 – Aug 2016; Muntaser: Nov 2010 – Oct 2014).
- Official Job Title at Mega Plan remains: `Facilities / MEP Department Manager – Consultant-side Technical Oversight`.
- Madinat Masr Developments scope: 3 malls (Mall Arena at Sarai, Mall Taj at Taj City, Mall Kinda) with 20+ tenants **collectively** across the three malls (never 20+ per mall).
- Sky Walk scope: 6th of October City, 10 tenants drawing review & execution follow-up.
- Muse Mall scope: Near Al Naib Al Aam Bridge, 35+ tenants execution supervision.
- Do not invent project dates, client contracts, budgets, building areas, team sizes, load calculations, or unverified software skills.
- Distinguish clearly between reviewing drawings, coordinating technical comments, supervising execution, and formally approving designs.
- Zero broken links, zero placeholder regressions, 100% data consistency.

---

### Task 1: Audit & Master Reference Extended Update
**Files:**
- Modify: `downloads/Mahfouz_Salah_Master_Reference_Extended.docx`
- Create: `C:\Users\wolfn\.gemini\antigravity\brain\e1a569e5-e38e-449d-b974-eefc7456d32b\mep_consulting_upgrade_change_plan.md`

- [ ] Step 1: Write python script using `python-docx` to inspect and update `downloads/Mahfouz_Salah_Master_Reference_Extended.docx` with new sections for Madinat Masr (Arena, Taj, Kinda), Sky Walk, and Muse Mall.
- [ ] Step 2: Run script and verify paragraph insertion and text integrity.
- [ ] Step 3: Verify that 20+ tenants are explicitly noted as collective for Madinat Masr, 10 for Sky Walk, and 35+ for Muse Mall.

### Task 2: CV Update (Word DOCX & Native PDF Re-Export)
**Files:**
- Modify: `downloads/Mahfouz_Salah_CV.docx`
- Output: `downloads/Mahfouz_Salah_CV.pdf`

- [ ] Step 1: Write python script to update `downloads/Mahfouz_Salah_CV.docx` under Egyptian International Architecture Group (Mega Plan) to integrate the suggested professional bullets concisely.
- [ ] Step 2: Verify formatting, font styles, bullet hierarchy, and table alignment.
- [ ] Step 3: Re-export `downloads/Mahfouz_Salah_CV.pdf` using Microsoft Word COM Automation (`wdFormatPDF = 17`).
- [ ] Step 4: Validate PDF text extraction via `pypdf` to ensure all new keywords, project names, and tenant metrics are present and that layout pagination is pristine.

### Task 3: Professional Portfolio Update (Word DOCX & Native PDF Re-Export)
**Files:**
- Modify: `downloads/Mahfouz_Salah_Portfolio.docx`
- Output: `downloads/Mahfouz_Salah_Portfolio.pdf`

- [ ] Step 1: Update `downloads/Mahfouz_Salah_Portfolio.docx` using python-docx to add structured project case studies/highlights for:
  1. Madinat Masr Commercial Malls (Arena, Taj, Kinda - 20+ tenants combined)
  2. Sky Walk (6th of October City - 10 tenants)
  3. Muse Mall (Near Al Naib Al Aam Bridge - 35+ tenants)
- [ ] Step 2: Keep existing Case Studies 01, 02, and 03 intact.
- [ ] Step 3: Re-export `downloads/Mahfouz_Salah_Portfolio.pdf` via Microsoft Word COM Automation.
- [ ] Step 4: Validate PDF layout and text extraction with `pypdf`.

### Task 4: Personal Website Enhancement (`index.html`)
**Files:**
- Modify: `index.html`

- [ ] Step 1: Update Stats Grid (e.g. "8 Developments", "75+ Retail Tenants", "15+ Years", "6 Systems").
- [ ] Step 2: Enhance Hero and About section copy to emphasize MEP Consulting, tenant drawing reviews, and site supervision.
- [ ] Step 3: Expand the Experience section for Mega Plan to list the new developments and tenant coordination figures.
- [ ] Step 4: Enhance the Projects section to feature the new commercial developments (Madinat Masr Malls, Sky Walk, Muse Mall) in a responsive, scan-friendly grid.
- [ ] Step 5: Test locally and verify HTML validity, mobile responsiveness, styling, and navigation links.
- [ ] Step 6: Commit and push changes to GitHub repository `mahfouzsalah21092011-collab/portfolio`.

### Task 5: LinkedIn Positioning & Profile Deliverable Update
**Files:**
- Modify: `LINKEDIN_PROFILE_ENHANCEMENT.md`
- Create: `C:\Users\wolfn\.gemini\antigravity\brain\e1a569e5-e38e-449d-b974-eefc7456d32b\linkedin_mep_consulting_recommendations.md`

- [ ] Step 1: Formulate targeted LinkedIn Headline options emphasizing MEP Consultant / Technical Office & Site Supervision.
- [ ] Step 2: Update About section copy to integrate the 65+ tenant drawing review & supervision scope.
- [ ] Step 3: Update Mega Plan experience bullets and prepare copy for 3 new LinkedIn Project cards (Madinat Masr, Sky Walk, Muse Mall).
- [ ] Step 4: Verify that all figures comply strictly with non-invention rules and non-conflation guidelines.

### Task 6: Comprehensive Interview Preparation Guide
**Files:**
- Create: `INTERVIEW_PREPARATION_GUIDE.md`
- Create: `C:\Users\wolfn\.gemini\antigravity\brain\e1a569e5-e38e-449d-b974-eefc7456d32b\interview_preparation_guide.md`

- [ ] Step 1: Prepare recruiter-facing summaries (30-second elevator pitch, 90-second technical introduction).
- [ ] Step 2: Formulate verified, credible model answers for the 6 specific required interview questions:
  1. Experience with commercial malls and retail tenants.
  2. Role in reviewing tenant MEP drawings.
  3. Coordinating drawing reviews with site execution.
  4. Scope across Madinat Masr malls (Arena, Taj, Kinda).
  5. Distinction between Sky Walk (drawing review) and Muse Mall (large-scale 35+ tenant supervision).
  6. Managing multiple tenant submissions and competing execution priorities.
- [ ] Step 3: Highlight explicit placeholders/clarification questions for Mahfouz where deeper project-specific data would strengthen interview storytelling.

### Task 7: Quality Assurance, Verification & Final Report
**Files:**
- Create: `C:\Users\wolfn\.gemini\antigravity\brain\e1a569e5-e38e-449d-b974-eefc7456d32b\mep_consulting_upgrade_final_report.md`

- [ ] Step 1: Run verification scripts across all documents, web pages, and exports.
- [ ] Step 2: Verify tenant numbers (20+ collective for Madinat Masr, 10 for Sky Walk, 35+ for Muse Mall).
- [ ] Step 3: Confirm all PDF downloads exist, open, and match Word sources.
- [ ] Step 4: Deliver final executive report summarizing files changed, facts integrated, questions for Mahfouz, and publication readiness.
