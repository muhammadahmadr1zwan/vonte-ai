# VONTE repository audit

Baseline: main at ffa6f414c6a0b6f4e27ebcf822b156d4b72349ae. Clean checkout; work branch `improve/vonte-experience`.

## Existing inventory (before changes)

| Feature / route | Implementation | Baseline classification / coverage | Improvement |
| --- | --- | --- | --- |
| Home `/` | `app/page.tsx`, Hero, Problem, OperationsStage | WORKING composition; workflow MOCKED OR SIMULATED | Hero composition, compact mobile workflow |
| Services `/services` | ServicesOverview, FollowUpSequence, content.ts | WORKING navigation; call/chat/sequence MOCKED OR SIMULATED | Product presentation, readable responsive rhythm |
| System tabs `/#system` | IntelligenceSystem | PARTIALLY WORKING: up/down supported; Home/End missing | Complete keyboard pattern |
| Scenarios `/#experience` | ProductDemo | MOCKED OR SIMULATED; click works, tab keyboard pattern incomplete | Keyboard navigation, replay/step-through, relevant CTA |
| Industries `/` | Industries | PARTIALLY WORKING: listbox semantics without listbox keyboard behavior | Semantic selection controls |
| Process `/how-it-works` | Process, PageHero | WORKING; text only | Editorial layout and clearer headings |
| Pricing `/pricing` and `/` | pricing.ts, PricingGrid | WORKING data / nine baseline unit tests include pricing and ROI | Less cramped fees and CTAs; mobile lists; accurate savings |
| ROI `/pricing#calculator`, `/#calculator` | roi.ts, RoiCalculator | WORKING arithmetic; animation, tiny sliders; extreme values risk overflow | Immediate accessible output, touch targets, consultation CTA |
| Contact `/contact?package=…` | ContactForm, server action, inquiry-schema.ts | PARTIALLY WORKING: validates and persists; displayed package stays at initial choice; stale server errors; no idempotency | Current selection summary, error recovery, duplicate handling |
| Storage / notification | inquiries.ts, data/inquiries | WORKING local file store covered by unit test; live webhook/email UNVERIFIED and UNCONFIGURED | Private modes, atomic deduplication, failure tests |
| Booking / phone sample | site.ts, CtaLink | MISSING configuration; meaningful fallback to contact | Preserve honest fallback; no paid provider |
| Desktop/mobile navigation | SiteHeader | PARTIALLY WORKING: modal focus trap, but same-route link does not close; resize can keep scroll locked; backdrop filter contains fixed modal | Native modal dialog, close on every selection and desktop resize |
| FAQ `/` | FaqList, Base UI Accordion | WORKING expandable content, no browser tests | Browser verification |
| SEO | layout, per-page metadata, sitemap, robots, JsonLd, image routes | PARTIALLY WORKING: public origin unset; sitemap emits localhost | No fake origin; verify metadata routes |
| Analytics, auth, customer CRM, native mobile app | None | MISSING; not visitor features to invent | Document scope |

## Highest-impact functional priorities

1. Contact retry / duplicate submissions can create multiple records. Add idempotent, atomic local persistence and focused tests.
2. Contact package summary and validation errors can contradict current inputs. Keep values and summary current through errors and edits.
3. Mobile menu lifecycle: same-route close, viewport resize, modal background/focus handling. Verify all in browser.
4. Demo tabs and industry controls lack expected keyboard behavior. Finish semantic controls and scenario journey.
5. Calculator controls have a 2px track and animated live region; extreme outputs can overflow. Make results exact and controls comfortable; add conversion CTA.

## Highest-impact visual priorities

1. Hero's long first line and tall card stack compete on narrow screens. Recompose into a compact signal console with a fluid headline.
2. Repeated framed text panels weaken product storytelling. Add a purposeful phone interface and sequential demo controls.
3. Four pricing columns begin at 1024px, leaving little room for fees and CTA labels. Use two columns until wide desktop; emphasize recurring price.
4. Heading breaks, long title-case sentences, and narrow grids produce inconsistent hierarchy. Refine editorial type and mobile flow.
5. Setup/configuration copy appears in public sections (pricing buttons, contact channels, legal footer). Replace with useful visitor copy; put deployment details in documentation.

## Implementation plan

1. Preserve Next.js 16.4.5 and current routes. Read bundled Next docs; run tests, typecheck, lint and production build.
2. Fix `inquiries.ts`, `contact/actions.ts`, and `contact-form.tsx`; test storage, validation, retries, notification and failure conditions.
3. Repair `site-header.tsx`, tab controls and calculator accessibility.
4. Refine existing hero, OperationsStage, pricing, service previews, footer and shared design tokens. Keep prices and scope centralized.
5. Add Playwright journeys with axe checks; inspect full-page screenshots at every requested width; measure production lab performance.
6. Record exact results and remaining deployment configuration. No push, production deployment, paid APIs or external email.

## Baseline checks

- `npm ci` initially failed because the default cache directory was not writable. Retried successfully with a workspace-local npm cache; dependency versions and integrity unchanged.
- `npm test`: 9/9 passed.
- `npm run lint`, `npm run typecheck`, `npm run build`: passed.
- Production server and Chromium browser review: evidence in the delivery report.

## Additional findings during browser/security verification

- The original CtaLink used Base UI Button with an anchor render, which exposed navigation as `role=button`. Replaced the wrapper with semantic anchors and Next Links using the same centralized button styles.
- The original production dependency tree included the shadcn CLI only to import CSS variants. Its transitive tree had six npm audit findings (four moderate, two low). Removed the CLI and kept the required Base UI accordion animation in local CSS. Final production audit: zero reported vulnerabilities.
- Native form resets after a failed React action could uncheck consent despite controlled inputs. Prevented automatic resets; browser tests cover checked consent and preserved text through a failed request and retry.
- Native modal dialogs make the background inert, but explicit Tab wraparound is retained to satisfy predictable menu keyboard navigation.
- FAQ disclosures now use native details/summary. Pricing navigation tests explicitly wait for route completion because Next Cache Components preserves hidden prior-route DOM.
