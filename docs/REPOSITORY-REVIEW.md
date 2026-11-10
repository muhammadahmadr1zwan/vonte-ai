# VONTE repository review and reliability refinement

## Baseline and scope

The clean baseline was `314f36f` on `improve/vonte-clarity`. This review continues on
`improve/vonte-audit-reliability`. The current, shorter homepage and the earlier
specific request for concise service cards are preserved. The new brief's suggested
headlines and section sequence are treated as recommendations, not reasons to
undo the already verified conversion work.

The repository uses Next.js 16.4.5 App Router, React 19.3, Tailwind 4, two locally
served Instrument font families and Netlify's Next.js adapter. No native mobile
app, payment application, CRM, user-account system, live phone agent, live chatbot
or installed analytics client was found. No framework or dependency was changed.

Read during this review: AGENTS.md, README, app and platform configuration,
route/layout files, shared visual components, form/action/schema/storage code,
pricing and calculator sources, SEO generators, assets/licenses and existing tests.
Relevant installed Next.js forms and navigation documentation was consulted.

Baseline executed: 24 unit tests, 30 browser tests, production build and lint all
passed. Extra browser probes found gaps outside those tests; rendered before
screenshots cover all five routes on phone and desktop. Evidence lives under
`/workspace/work/vonte-audit-3/`.

## Feature inventory

| Feature / route | Implementation and expected behavior | Status, dependencies, coverage and limits |
| --- | --- | --- |
| Homepage `/` | `app/page.tsx`, `hero`, `problem`, `service-boundaries`, `services-overview`, `process`, `cta-band`; concise marketing and links to scope | WORKING: SSR content, approved package source, licensed local fonts; route, link, screenshot and overflow checks. No invented client proof. |
| Services `/services` | `services-overview.tsx`, `lib/content.ts`; receptionist call console, follow-up timeline, website/chat preview, complete package | WORKING information; product interfaces are SIMULATED. Prices and allowances derive from `lib/pricing.ts`. Package links tested. No paid APIs or live chatbot. |
| Pricing `/pricing` | `pricing-grid.tsx`, `lib/pricing.ts`; setup/monthly prices, features, bundle comparison, package selection | WORKING: all four fees and CTA query values checked on desktop/mobile; $2,000 setup and $294 monthly savings derived from source. Usage/contract note retained. |
| ROI `/pricing#calculator` | `roi-calculator.tsx`, `lib/roi.ts`; bounded numbers, touch sliders, reset and consultation link | WORKING calculation; SIMULATED business assumptions. Unit/browser sample yields 60 missed calls, 15 bookings, $6,000 illustrative revenue. No revenue guarantee. |
| System `/#system`, `/how-it-works#system` | `intelligence-system.tsx`; compact/full five-step expandable workflow, arrows, Home/End, next-stage | WORKING interaction, SIMULATED process. Browser stage and keyboard tests. Native diagram uses no customer activity. Header location state was missing. |
| Receptionist demo `/#experience` | `product-demo.tsx`; three scenarios, step/replay/full exchange and captured summary | WORKING SIMULATION. No call, email, text or booking. Existing scenario tests; completion previously lacked its own consultation link. |
| Follow-up sequence `/services#lead-follow-up` | `follow-up-sequence.tsx`; five selectable stages and status | WORKING SIMULATION. No sends or calendar writes; timing/consent/volume notes remain. All controls audited; focused coverage added in this review. |
| Industries `/services` | `industries.tsx`; six examples with boundaries, shared selected state | WORKING content/selection; mobile layout was PARTIALLY WORKING for scanning because explanations followed a large control grid. Desktop buttons and new mobile native selector share state. No certification or client-result claims. |
| Process `/how-it-works` | `process.tsx`, route scope and launch requirements | WORKING informational content. Discover/design/implement/optimize and owner approval requirements are retained. No assumed launch time. |
| FAQ `/how-it-works` | `faq-list.tsx`, native details/summary | WORKING keyboard-accessible disclosure. Existing browser Enter-key and accessibility checks. |
| Contact `/contact` | `contact-form.tsx`, `contact/actions.ts`, `inquiry-schema`, `inquiry-service` | WORKING validation, consent, loading, failure and saved-reference states. Native fields stayed editable during a pending POST: FIXED. Server action handles a real persistence path; UI alone is not the proof. |
| Inquiry storage | `inquiries.ts`, `inquiry-blob-store.ts`; create-only UUID JSON, strong-consistent private Netlify store; local file fallback | WORKING: previous hosted preview read-back and new local round-trip tests; SDK tests use the official local Blobs server. Production/preview namespaces are separate. No public read endpoint. No customer records are changed. |
| Optional notifications | `inquiries.ts`, environment config; webhook or verified Resend sender after save | UNCONFIGURED externally. Failure/timeout/partial-config tests are MOCKED with intercepted fetch and send no external email. No real notification delivery is claimed. Operator review of private records is required. |
| Booking / voice sample | `lib/site.ts`, `cta-link`, optional scheduling and telephone values | Consultation form WORKING; real scheduling/voice links UNCONFIGURED. Submission explicitly does not reserve a meeting. No fake contact address or number is supplied. |
| Navigation | `site-header`, `site-footer`, `lib/content`; six links, dialog menu, active page, anchor offsets, route/back handling | WORKING core paths; missing observer support caused a page error and System never became current: FIXED. Footer targets improved. Existing focus, touch and resize tests retained. |
| SEO | `layout`, route metadata helper, social image, sitemap, robots, JSON-LD | WORKING configured-origin metadata; titles/images/description and internal-link crawl covered. Structured data has real package prices, no invented reviews/address. Canonicals/sitemap depend on the real configured origin. |
| Motion/assets | `globals.css`, inline SVGs/icons, font licenses | WORKING reduced motion; no heavy image assets, video or third-party animation package. Phone hero motion/decorative detail simplified further. Real-user INP and real iOS device behavior remain UNVERIFIED. |

## Highest-impact functional findings

1. During a slow POST, fields could still be edited even though the server was
   saving the earlier snapshot. Reproduced with an intercepted pending request.
   Native disabled fieldset now freezes the snapshot and re-enables on failure.
2. Removing `IntersectionObserver` produced `IntersectionObserver is not a
   constructor` and interrupted the header. A guarded enhancement preserves core
   navigation when that optional browser feature is absent.
3. Direct System navigation never set `aria-current` on its link. A visible-section
   observer now supplies `location` state while route links retain `page` state.
   Re-selecting `/#system` while that fragment was already in the address bar
   could also leave the visitor elsewhere on the page. Header and footer repeat
   selections now scroll to the visible section, respecting reduced motion.
4. A completed receptionist scenario offered no context-specific inquiry action.
   A completion link now preserves the AI Receptionist package through the form.
5. Notification delivery and real appointment booking remain unconfigured. These
   are external configuration limits, not fabricated completed features. Persistence
   is the working lead destination; no credentials or external sends were added.

## Highest-impact visual/mobile findings

1. The full decorative call display took excessive space on phones: reduced
   internal spacing, still illustration and immediate hero content on mobile.
2. The selected package/fee context followed the entire phone form and process:
   a shared summary now appears above the form on phones and atop the desktop aside.
3. Six mobile industry buttons separated the action from its explanation: replaced
   only on mobile with a labeled native picker and immediate explanation.
4. Footer links had compact text-sized targets: now at least 44px high.
5. The System link looked inactive at its destination: current-section styling now
   matches the visible section and is exposed to assistive technology.

The existing editorial navy/gold/ivory composition, two font families, differentiated
service illustrations, pricing hierarchy and concise homepage remain. Prices,
regulated-advice boundaries, consent, example labels and contract caveats are intact.

## Security and integration review

Only one user-data mutation entry point was found: the Next.js inquiry Server
Action. It uses server-side Zod validation, consent checks, honeypot, time hint,
UUID validation, a bounded per-process rate map and create-only persistence.
Notification requests use timeouts and reject redirects; secrets are read only on
the server. No private read API, browser storage of leads or authenticated dashboard
is exposed. React escapes visitor values and JSON-LD escapes less-than signs.

The honeypot and client timestamp are hints, not authentication. Rate limits are
process-local, not distributed abuse prevention. The deployment proxy must supply
trusted client address headers. The application has no user-login requirement.
No CORS expansion, credential rotation, payments, paid provider, data deletion or
outgoing notification was authorized or performed by this review.

## Implementation and verification

Changes are scoped to the existing header, form, industries, demo, hero illustration,
footer and motion styles, with focused browser regressions. Source package data,
backend persistence, framework, route URLs and lockfile are unchanged. Final checks,
measurements and review link are recorded below after execution.

### Changed files

| File | Result |
| --- | --- |
| `src/components/site-header.tsx` | Current-section navigation, repeated fragment links, missing-observer fallback |
| `src/components/contact-form.tsx` | Pending snapshot protection and shared, responsive package summary |
| `src/components/industries.tsx` | Compact, labeled native mobile/tablet picker; original desktop composition |
| `src/components/product-demo.tsx` | Contextual inquiry link after each completed scripted scenario |
| `src/components/operations-stage.tsx` | Compact phone illustration with clearer scripted-response caption |
| `src/components/site-footer.tsx` | At least 44px link targets |
| `src/app/globals.css` | Immediate phone entrance and reduced decorative motion |
| `src/app/sitemap.ts` | Accurate content revision date, 2026-11-10 |
| `tests/browser/audit-reliability.spec.ts` | Eight regression journeys; existing tests preserved |
| `docs/REPOSITORY-REVIEW.md` | Inventory, findings, implementation, validation and release requirements |

### Executed checks

- All 24 unit tests passed at baseline and after the refinement. These exercise
  validation, package arithmetic, bounded ROI, private create-only storage,
  retry/deduplication and notification failure handling. Provider notifications
  are intercepted tests, not real delivery.
- All 38 Playwright browser tests passed (the original 30 plus eight new tests).
  Coverage includes navigation/deep links/Back, all demo scenarios, follow-up
  controls, calculator changes, keyboard interactions, pricing-to-form selection,
  invalid/corrected submissions, local saved-record read-back, duplicate clicks,
  slow/failing requests, missing browser features and mobile menu orientation.
- Production build, ESLint, TypeScript and `git diff --check` passed.
- All five routes returned HTTP 200 at 320, 375, 390, 430, 768, 1024 and 1440px.
  No horizontal overflow or captured page errors in that 35-route render sweep.
  Full-page phone/desktop captures and section captures were inspected, including
  the real contact form after its loading placeholder, both package-summary
  layouts and the mobile industry control.
- Automated axe WCAG checks reported zero violations across all five routes at
  390px and 1440px. Keyboard menu/Escape, focus, stage tabs, disclosures, labels,
  error feedback, reduced motion and touch targets have additional browser checks.
  This is not a complete manual screen-reader audit or accessibility certification.
- Production dependency audit: zero vulnerabilities. Full development audit:
  eight moderate findings in the existing ESLint/minimatch tool chain. No package
  or lockfile changes were required for this refinement.
- Changed-source credential-pattern scan found no matches. No private inquiry
  files, credentials or generated artifacts are committed.

### Performance measurements

Fresh Lighthouse runs against the production build at localhost, sequentially
after browser tests completed, using Chromium and Lighthouse's mobile/desktop
presets. Raw reports are `lighthouse-mobile.json` and `lighthouse-desktop.json`
under `/workspace/work/vonte-audit-3/` (2026-11-10 UTC).

| Lab measurement | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 97 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Largest Contentful Paint | 0.92 seconds | 0.27 seconds |
| Cumulative Layout Shift | 0 | 0 |
| Total Blocking Time | 201 ms | 1 ms |

These are single local lab measurements, not hosted or real-user Core Web Vitals.
TBT does not establish INP. Real-user INP, network variability and production
traffic behavior remain unmeasured. No heavy image, third-party script or new
animation dependency was added; fonts remain self-hosted and licensed.

### Remaining limitations and release requirements

- Browser coverage uses Chromium desktop and emulated mobile/touch, including
  portrait and landscape. No physical mobile device was available. WebKit could
  not launch because this environment lacks its native GTK/Graphene/Harfbuzz ICU/
  Manette/Hyphen/GLES libraries. Safari/iOS behavior is therefore unverified.
- Phone, messaging, chatbot, booking and workflow screens remain explicitly
  simulated. The published service scope describes implementations for a client;
  it does not mean this marketing site runs those integrations.
- No notification credentials or scheduling URL are configured. Operators must
  review private inquiry records in Netlify. To add delivery, supply an approved
  webhook or verified provider/sender and separately authorize a real delivery
  test. No outgoing email or message was sent by this review.
- Rate limits are process-local and honeypot/timestamp checks are limited spam
  signals. Higher-volume abuse protection would need a distributed design.
- The owner should approve service scope, consent/privacy wording, retention and
  inquiry-monitoring responsibility before release. No legal compliance claim is
  made. No invented testimonials, reviews, results, certification or location.
- Resolve or monitor the eight moderate development-tool advisory findings in a
  separately tested dependency update. Production dependencies currently audit
  clean; this review does not claim the development chain is vulnerability-free.
- Git continuous deployment remains unconfigured. No GitHub push or production
  deployment is authorized by this brief. Review the preview and approve the
  exact release commit before publishing.

After release approval: use Node 24, `npm ci`, rerun the listed checks, confirm the
linked Netlify project is `32c06496-b748-47d9-9f99-eac0fca21737`, and run the complete
adapter pipeline with `netlify deploy --prod --context production`. Do not upload
raw `.next` or bypass build/publish hooks with `--no-build`. Keep
`NEXT_PUBLIC_SITE_URL=https://vonte-ai.netlify.app` and `INQUIRY_STORAGE=netlify-blobs`.
Recheck routes/assets/metadata and submit a clearly marked QA inquiry, then verify
its private object in `vonte-inquiries-production`. Review builds use the separate
`vonte-inquiries-preview` store. Do not delete customer records during QA.

The review preview, hosted verification and final source commit are recorded in
the delivery section below when those checks finish.
