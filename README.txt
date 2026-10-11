MAHFOUZ SALAH SULEIMAN — PORTFOLIO WEBSITE
===========================================

Files & Directories
-------------------
- index.html: responsive one-page portfolio website with complete Open Graph & Twitter Card social metadata.
- assets/: profile images, company emblems, project cards, and social preview assets:
    * assets/portfolio-social-preview.png (1200 x 630 px social sharing thumbnail)
    * assets/mahfouz-profile-photo.png (high-resolution portrait)
    * assets/mahfouz-headshot-square-800x800.png (square profile portrait)
- downloads/: CV and professional portfolio in PDF and Word formats:
    * downloads/Mahfouz_Salah_CV.pdf
    * downloads/Mahfouz_Salah_CV.docx
    * downloads/Mahfouz_Salah_Portfolio.pdf
    * downloads/Mahfouz_Salah_Portfolio.docx

Social-Sharing Thumbnail & Open Graph Metadata
----------------------------------------------
The portfolio website includes full social metadata tags within <head> in `index.html`:
1. Open Graph (og:type, og:site_name, og:url, og:title, og:description, og:image, og:image:width, og:image:height, og:image:alt)
2. Twitter Cards (twitter:card="summary_large_image", twitter:url, twitter:title, twitter:description, twitter:image, twitter:image:alt)
3. Canonical URL tag (<link rel="canonical">)

Thumbnail Specifications:
- Asset Path: assets/portfolio-social-preview.png
- Dimensions: exactly 1200 x 630 pixels (1.91:1 standard aspect ratio)
- Format: PNG (RGB, high contrast, safe margins for mobile & desktop card previews)
- Typography: MAHFOUZ SALAH SULEIMAN | FACILITIES MANAGEMENT | MEP | SHOPPING MALLS | OPERATIONS | TECHNICAL OVERSIGHT

Public Hosting Configuration
----------------------------
Social media crawlers (LinkedIn, Twitter/X, Facebook, WhatsApp, Telegram, Slack) require absolute, fully qualified HTTPS URLs to fetch and render preview cards.
- Current Production URL:
    https://mahfouzsalah21092011-collab.github.io/portfolio/
- Configured Thumbnail URL:
    https://mahfouzsalah21092011-collab.github.io/portfolio/assets/portfolio-social-preview.png

If deploying to a custom domain (e.g., https://www.mahfouzsalah.com/) in the future, update the following attributes in `index.html`:
- <link rel="canonical" href="https://your-custom-domain.com/">
- <meta property="og:url" content="https://your-custom-domain.com/">
- <meta property="og:image" content="https://your-custom-domain.com/assets/portfolio-social-preview.png">
- <meta property="og:image:secure_url" content="https://your-custom-domain.com/assets/portfolio-social-preview.png">
- <meta name="twitter:url" content="https://your-custom-domain.com/">
- <meta name="twitter:image" content="https://your-custom-domain.com/assets/portfolio-social-preview.png">

How to Test & Clear Preview Caches
----------------------------------
Social platforms cache link previews aggressively. When updating thumbnails or metadata:
1. LinkedIn Post Inspector:
   https://www.linkedin.com/post-inspector/
   Enter the public URL to inspect metadata and force LinkedIn to fetch the latest preview image.
2. Facebook / WhatsApp Sharing Debugger:
   https://developers.facebook.com/tools/debug/
   Click "Scrape Again" to flush the CDN cache.
3. Twitter / X Card Validator:
   Test by creating a draft post with the portfolio URL on Twitter/X to preview the summary_large_image card.
4. OpenGraph.xyz:
   https://www.opengraph.xyz/
   Provides a multi-platform visual simulation across LinkedIn, Facebook, Twitter, and Discord.

Preview Locally
---------------
1. Extract the ZIP or clone the repository.
2. Open index.html in a modern browser.
3. Keep the assets/ and downloads/ folders alongside index.html.

Before Publishing / Deploying
-----------------------------
- Verify all phone numbers, email addresses, and LinkedIn profile links.
- Confirm permission for publishing specific project metrics or company details.
- Validate that all PDF and Word assets in downloads/ are kept synchronized with index.html.
