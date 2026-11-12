---
name: purepic-website
description: Design and implementation standards for the PurePic AI Photo Selection marketing website.
PurePic Website — Codex Skill
Mission
Build a premium, elegant, conversion-focused, mobile-first marketing website for PurePic, the Windows AI photo-selection application. Use the approved long-page mockup as a visual reference, not as a raster image to paste onto the website. Recreate sections as accessible, responsive HTML components. Preserve the official PurePic logo without redrawing or altering it.
Stack
Next.js App Router, TypeScript, Tailwind CSS.
Use `next/font/google` for Playfair Display and Inter.
Lucide React for consistent icons.
Use CSS transitions by default; add Framer Motion only when it clearly improves a specific interaction.
No CMS, complex state management, or separate backend in the first UI phase.
Typography
The generated visual reference has no exact font metadata; these are the chosen implementation fonts.
Display: `Playfair Display`, serif; 600/700 weights. Use for hero and major section headings.
UI/body: `Inter`, sans-serif; 400/500/600/700 weights. Use for all other content.
Hero: desktop 64–72px / mobile 38–44px; line-height 1.08–1.15.
Section headings: desktop 40–48px / mobile 30–34px; line-height 1.15–1.2.
Cards: 18–20px / mobile 16–18px; weight 600.
Body: 16–18px / mobile 15–16px; line-height 1.6–1.75.
Navigation: 14px/600; buttons: 15–16px/600; eyebrow labels: 12–13px/700 uppercase with modest letter spacing.
Avoid all-caps long headlines, excessive text density, and tiny descriptions.
Design tokens
Primary navy: `#092D60`
Deep navy: `#07182B`
Orange accent: `#F58212`
Soft peach: `#FFF3EA`
Off-white: `#F7F9FC`
White: `#FFFFFF`
Primary text: `#14243B`
Muted text: `#5D6B7D`
Subtle border: `#E6EAF0`
Use orange primarily for primary CTA, icon accents, small section labels, and selective headline emphasis.
Contrast: meet WCAG AA for body text and controls; avoid orange small text on white if contrast is insufficient.
Container max-width: 1240px; desktop horizontal padding 32px; tablet 24px; mobile 20px.
Vertical section padding: desktop 104px (acceptable 96–120), tablet 80px, mobile 64px (acceptable 56–72).
Grids: 12-column desktop, 2-column tablet where appropriate, 1-column mobile.
Grid gaps: 24–32px desktop, 16–20px mobile.
Card border radius 18px; media 20–24px; buttons pill radius 999px.
Use soft, subtle shadows; avoid thick outlines and loud gradients.
Alternate airy white/off-white/peach sections; reserve deep navy for hero, features, and final CTA.
Maintain strong hierarchy and generous separation between sections. Never create a dense poster-like page.
Visual assets
Official logo: `public/images/brand/purepic-logo.png` (copy supplied original there; preserve aspect ratio and transparent/white background as appropriate).
Hero: high-quality professional Indian wedding photography with intentional negative space for copy.
Product showcase: real screenshots of the PurePic Windows app, displayed in a laptop/device frame; never pass synthetic UI as an actual screenshot.
Challenges: event photo grids and tasteful photographic details.
Features: Lucide line icons; no inconsistent icon styles.
Use cases: separate wedding, pre-wedding, event, and portrait-studio photos.
Demo: real screen-recording poster and video when provided; otherwise clear placeholders.
Testimonials: only real, approved customer quotes and identities; otherwise a pilot invitation placeholder.
Optimize local media using Next.js Image, descriptive alt text, WebP/AVIF where suitable. Do not hotlink random images in production.
Required landing-page sections (in this order)
Sticky navigation: logo, Features, How It Works, Use Cases, Benefits, Share, FAQ, Get Free Demo.
Spacious cinematic hero: `Capture Every Moment. Let AI Find the Best.` Two CTAs: Get Free Demo / Watch How It Works. Trust notes: Windows, local processing, photographer control.
Meet PurePic: large real product screenshot, short product introduction, three benefits.
Photographer challenges: too many photos, repeated shots, missed expressions, delivery pressure.
Core features: duplicate detection; sharpness/blur analysis; closed-eye detection; two-step selection; face-quality review; organized export; local processing; project management.
How it works: choose source folder; run Step 1 duplicate/quality and Step 2 eye-quality refinement; review/export organized best and rejected folders.
Time savings: interactive, user-assumption-based calculator for photo count, manual hours, PurePic + review hours; show hours and percent difference. Label results illustrative, not verified performance.
Who it is for: wedding, pre-wedding, events, portrait studios.
Benefits: less repetitive work, consistent review, fewer comparisons, organized results, local processing, photographer control.
Sharing and handoff: explain organized export and sharing selected results with teammates/clients via their preferred tools. Do NOT claim native cloud sharing, share links, collaboration, or client galleries unless implemented and verified.
Product demo: video preview and short explanatory copy.
Customer stories: verified testimonials only; otherwise tasteful pilot-program CTA.
FAQ: offline processing, internet needed for activation/sign-in, originals, manual review, Windows compatibility, demo activation.
Final conversion CTA: `Your Time Belongs Behind the Camera.` Get Free Demo + WhatsApp Support.
Footer: official logo, navigation, contact placeholders, Privacy, Terms, social links only if provided.
Demo conversion flow
All Get Free Demo buttons navigate to `/demo`.
Form: name, mobile, studio/business name, city required; email optional.
Accessible validation, loading/error/success states, privacy consent notice.
`/demo/success`: registration confirmation, installer download placeholder, activation steps, support CTA.
Do not claim activation succeeded at registration time. The licensing backend handles device binding, license duration, activation, and sign-in.
UI phase only: no fake API success, no real customer data submission, no invented installer URLs or WhatsApp numbers.
Later backend integration: secure FastAPI endpoint, PostgreSQL lead records, duplicate handling, rate limiting, UTM attribution, and safe integration with existing licensing service.
Page routes
`/` marketing landing page
`/demo` demo registration
`/demo/success` confirmation and activation instructions
`/privacy` privacy page
`/terms` terms page
Suggested folder structure
```text
purepic-website/
├── SKILL.md
├── public/
│   ├── images/
│   │   ├── brand/purepic-logo.png
│   │   ├── hero/
│   │   ├── product/
│   │   ├── use-cases/
│   │   └── demo/
│   └── videos/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── globals.css
│   │   ├── page.tsx
│   │   ├── demo/page.tsx
│   │   ├── demo/success/page.tsx
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── components/
│   │   ├── layout/Header.tsx
│   │   ├── layout/Footer.tsx
│   │   ├── sections/Hero.tsx
│   │   ├── sections/ProductIntro.tsx
│   │   ├── sections/Challenges.tsx
│   │   ├── sections/Features.tsx
│   │   ├── sections/HowItWorks.tsx
│   │   ├── sections/TimeSavings.tsx
│   │   ├── sections/UseCases.tsx
│   │   ├── sections/Benefits.tsx
│   │   ├── sections/Sharing.tsx
│   │   ├── sections/ProductDemo.tsx
│   │   ├── sections/Testimonials.tsx
│   │   ├── sections/FAQ.tsx
│   │   └── sections/FinalCTA.tsx
│   └── lib/
│       └── site-content.ts
├── package.json
└── tsconfig.json
```
Do not add folders or abstractions until they are actually useful. Keep section copy in a simple content module if practical.
Responsive behavior
Mobile-first. Verify 320, 375, 430, 768, 1024, 1440 widths during user-run testing.
Mobile header collapses to a usable menu. Provide a compact sticky mobile demo CTA if it does not obstruct content.
Hero text and image must remain readable on mobile; use different crop/stacking as needed.
Features: 1 column mobile, 2 tablet, 4 desktop when comfortable.
Avoid horizontal overflow, tiny controls, clipped text, and dense section stacks.
Minimum 44px touch targets.
Quality and truthfulness
PurePic is a Windows desktop app; photo processing is local and can run offline after required online sign-in.
Do not promise guaranteed eye-detection accuracy, a fixed speedup, cloud sharing, cross-device collaboration, macOS support, or pricing without confirmation.
Preserve source images and avoid statements suggesting originals are automatically deleted.
Only use real testimonials and measured results.
Use semantic headings, alt text, visible focus, keyboard-accessible controls, reduced-motion preferences, and SEO metadata.
Use GA4/UTM only when configured; never fabricate IDs.
Agent workflow
Implement small sequential tasks, starting with visual frontend.
Make only requested code changes; briefly report changed files.
Do not run builds, tests, deployments, or installers unless the user explicitly requests them.
If a required asset, URL, or factual claim is missing, use a clearly labeled placeholder rather than inventing it.