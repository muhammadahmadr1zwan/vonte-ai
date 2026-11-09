# VONTE clarity and conversion improvements

## Scope

Baseline: `558f2d2`, on a clean working tree. Changes are isolated on local branch
`improve/vonte-clarity`. Next.js 16, the five routes, the navy/gold/ivory identity,
local fonts, real prices, inquiry validation and private persistence are retained.
No dependency, paid provider or live integration was added.

Before editing, the source, components, styles, assets, routes and existing tests
were inspected. The production site and prior review preview were rendered at
375 and 1440px on every route. Both returned HTTP 200 without horizontal overflow
or captured page errors. The local source corresponds to the prior review preview;
production remains on the older approved release.

## What changed

- The hero states the inquiry-to-booking outcome, uses the supplied explanatory
  copy, identifies the target businesses and offers one gold consultation action
  with a quieter process link. The extra hero service navigation was removed.
- The homepage now has nine sections: hero, missed opportunity, five-stage system,
  three service cards, demo, capabilities/limits, process, pricing preview, final
  consultation action. Repeated full service explanations and the separate bundle
  section remain on Services. Industry examples moved to Services; FAQs moved to
  How It Works; the calculator stays on Pricing.
- The existing workflow component has a compact homepage mode and a detailed mode
  on How It Works. Both use the same five stages and keyboard behavior. Follow-up
  remains a service, with its existing interactive sequence on Services.
- Service cards identify the audience, problem, four included features, exact setup
  and monthly prices, and one link to the corresponding service details.
- Pricing uses the existing source of truth. The homepage shows three inclusions
  per package with a full comparison link; the Pricing page retains the complete
  inclusions and comparison. Setup and monthly fees stay explicit. Complete is
  highlighted for businesses needing all three services, without popularity claims.
- The new boundaries section explains inquiry capture, approved answers,
  qualification and appointment requests, alongside emergency-service and
  professional-advice limits. Scripted demo disclaimers, consent language, scope
  and usage terms remain available. Homepage commercial terms use a native details
  disclosure rather than being removed.
- The mobile header has a visible menu instead of a second consultation button.
  On desktop, the header action yields while an in-page consultation action is
  visible. It stays visible while keyboard-focused. Active route styling, native
  menu focus trapping, Escape, selection and resize cleanup remain.
- Page-specific descriptions and social titles now match. Detail-page social image
  references are explicit because overriding Open Graph fields replaces inherited
  fields. The social image copy is shorter and more specific.

## Observed size change

These are rendered layout measurements, not revenue, conversion or speed claims.
The prior review preview had 14 homepage sections; the revised homepage has nine.
At 375px the main-content height changed from approximately 22,468px to 11,327px;
at 1440px it changed from 14,141px to 6,391px. Detailed content is retained on the
relevant routes. Final measurements and screenshots are under
`/workspace/work/vonte-polish/`.

## Verification

`npm test`: 24 passing. `npm run test:e2e`: 30 passing against the production build.
Production build, TypeScript, lint and `git diff --check` pass. The browser suite
includes the existing regression tests plus homepage service
and package journeys, focused-header behavior, page metadata, heading order and
an internal-link/anchor crawl. Checks exclude Next.js's hidden cached route trees
when asserting the currently visible service destination.

All five routes fit 320, 375, 390, 430, 768, 1024 and 1440px in the regression suite.
Axe detected no WCAG 2 A/AA, 2.1 AA or 2.2 AA violations on any route at 390 and
1440px. Checks cover keyboard menus, focus, reduced motion, demo scenarios, the
calculator, all package prices, real locally persisted inquiries, failed-network
retries and input retention. This is not a complete manual accessibility audit.

The new route check confirms one H1 per page, no skipped heading levels, matching
page/social titles and descriptions, explicit social images, and successful HTTP
responses and anchor targets for every internal link found across the five routes.
No page or console errors were captured in that normal-navigation check. Source
review found no credential patterns in changed or new files; dependency manifests,
inquiry handlers, validation and storage modules are unchanged.

Lighthouse on the local production build measured the following in isolated audits:

| Measure | Mobile simulation | Desktop preset |
| --- | --- | --- |
| Performance | 99 | 100 |
| Accessibility / best practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 |
| LCP | 1.05 seconds | 0.27 seconds |
| CLS | 0 | 0 |
| Total blocking time | 119 ms | 3.5 ms |

The first mobile run overlapped another check and scored 81, with 766 ms total
blocking time. It is retained alongside the isolated rerun. Lab results vary with
executor load; they do not establish field Core Web Vitals or field INP. No added
image download, third-party script or animation library was required.

## Implementation files

Routes and metadata: `src/app/page.tsx`, the four detail-page route files,
`src/app/opengraph-image.tsx`, and `src/lib/page-metadata.ts`.

Presentation: `hero.tsx`, `operations-stage.tsx`, `problem.tsx`,
`intelligence-system.tsx`, `services-overview.tsx`, `service-boundaries.tsx`,
`product-demo.tsx`, `process.tsx`, `pricing-grid.tsx`, `industries.tsx`,
`site-header.tsx`, `cta-link.tsx`, `cta-band.tsx`, and `globals.css`.

Verification: `tests/browser/polish.spec.ts` plus the existing journey and flagship
suites updated for the moved content and five-stage workflow. No route was removed.

## Remaining operational limits

Email notifications are not configured. Inquiries use the existing private Netlify
Blobs store and need operator review. Illustrations do not create calls, messages
or bookings. No new professional advice, certification, client evidence or results
claims were introduced. Real Safari/iOS and field INP remain unverified; the prior
WebKit launch attempt was blocked by missing executor system libraries.

No production upload or GitHub push is part of this review work. Publication
awaits the user's approval, consistent with the earlier transformation brief.
