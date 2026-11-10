# VONTE navigation repair and motion review

**Release update:** The owner subsequently approved production publication.
Application `b982464` was pushed to GitHub and deployed to
[the live website](https://vonte-ai.netlify.app/) on November 10, 2026, at
3:58 a.m. EST. Netlify deploy `6af2dc91ef3ecadd3be0dada` is ready and published.
All 35 hosted route/width checks and an actual private QA-inquiry readback passed.
See [deployment operations](NETLIFY-DEPLOYMENT.md) for the release record.

Local work on `fix/vonte-navigation-motion`, starting from clean `2c36f01`.
Review date: November 10, 2026 (EST). The selected A / Obsidian & Champagne design,
Next.js framework, five public routes, service scope and exact prices are retained.
During the local implementation/review below, no GitHub push, Netlify deployment,
credentials change, paid service, live business transaction or hosted form
submission was performed. Production publication and a marked QA submission
followed the subsequent explicit release approval recorded above.

## Diagnosis: confirmed findings and limits

**The reported production disappearance was not reproduced in ordinary browsing.**
The user confirmed it happened on production, but did not supply the affected
browser, device, route, zoom or session. A live Chromium sweep found working
navigation on all five routes at 320, 375, 390, 430, 768, 1024 and 1440px. This
cannot establish what happened in that particular session, or guarantee it will
never recur on an untested device.

Two failure modes were verified:

1. **Retained development-route DOM hides shared navigation.** Global CSS used
   `body:has([data-design-lab]) > .site-header` (and the same footer selector) to
   apply `display:none`. Next.js Cache Components retains an inactive design-lab
   node after client navigation home. `:has()` still matches that hidden node.
   Reproduced the disappearance; removing only the retained node immediately
   restored the header. Removed this global rule instead of masking it with a
   competing override. Both header and footer now remain on the development lab.
   **Production returns 404 for the lab, so this is not proof of the production
   incident's cause.**
2. **The old mobile menu depends entirely on JavaScript.** Verified on production
   with script requests blocked: the header and trigger remained visible, but
   clicking the menu could not open it. This is a confirmed resilience gap, not
   evidence that scripts failed during the user's session. A native HTML
   disclosure now supplies working route links if scripts fail, hydration is
   delayed, or modal-dialog support is unavailable.

Also hardened media-query subscriptions with legacy listener and resize
fallbacks. A simulated legacy browser passed without errors; an actual affected
legacy device was not available. The header now has explicit critical layout,
contrast, stacking and breakpoint rules independent of route content or motion.

### Request-log findings

Read existing Netlify request logs around the published release. Four sampled
404s were `/design-lab`, `/.next/server/app/contact/actions.js`, `/netlify.toml`
and `/.env`. Their timestamp matches the previous release's deliberate private
path checks, recorded in its retained HTTP QA report. These are expected denied
paths, not broken public destinations.

Twelve sampled 499s were GETs with Next.js `?_rsc=` route-data parameters during
the previous rapid-navigation checks. Detailed record
`01M725JP4FCAMTH9PSEBFFC2HV` identifies HeadlessChrome tooling, with no function or
edge-function invocation. They are consistent with cancelled route-data/prefetch
requests during the test sweep. This evidence does not establish a failed
business transaction or a user-facing page crash. No routing change was made
solely to eliminate those status codes.

## Navigation repair

The root layout still owns one shared header and footer. Desktop navigation
remains visible at 1024px and above; mobile gets a visible **Menu** label and
44px control. All existing destinations, including The System, remain.

Modern browsers keep the existing native modal dialog: readable links, active
states, close control, focus trapping, Escape, body scroll locking, focus return,
and closure on links, route changes and resizing to desktop. Older/no-script
browsers get a bounded, scrollable native disclosure. The enhanced fallback also
closes on Escape; with no JavaScript its native summary closes it.

A native menu opened while scripts are delayed stays open when hydration
finishes. Initial mounting no longer closes it, the expanded state follows the
native disclosure, and its Close control closes it rather than reopening a modal.
A gated-script browser regression checks that entire transition. Only the native
disclosure element opts out of attribute hydration warnings: a real visitor can
change its `open` attribute before React arrives. Its state is then read from the
native element; warnings on surrounding markup and children remain enabled.

The consultation action alone yields to a visible in-page action. Its observer
cannot hide the navigation. A keyboard-focused header action remains visible.
The skip link now sits above the header and has a point-hit regression check.

## Motion and interaction system

No animation dependency was added. A small client provider coordinates browser
Web Animations and CSS; server-rendered content starts visible. The header never
receives reveal opacity, transforms or conditional route visibility.

- Hero eyebrow, headline, copy, actions and visual enter in a short stagger. The
  last entrance completes about 960ms after enhancement starts; there is no
  loading gate. Primary links remain usable throughout.
- The illustrative call workflow advances through Incoming call, AI response,
  Lead captured, Appointment requested and Owner notified. A thin path and small
  waveform accompany the stage changes. One finite run stops after about 4.25s
  of visible playback. Play/Pause, Next stage and five inspection controls allow
  manual review. No sound, real calling, messaging or booking was introduced.
- Major introductions, service rows, pricing and closing content reveal once
  through one shared motion IntersectionObserver. A batched MutationObserver
  discovers streamed/retained route content. Visibility lives in a WeakMap,
  avoiding mutations to attributes on not-yet-hydrated scene components.
- Receptionist and chatbot stories retain every scripted message and highlight
  successive replies when played. Follow-up walks through its five real preview
  states. All stop at the end, pause offscreen or when the tab is hidden, and
  remain manually selectable.
- Discover, Design, Implement and Optimize use native, keyboard-accessible
  disclosures and update an associated desktop process visual. Mobile keeps a
  simple vertical sequence with the explanation beside its selected heading.
- CTA icons, navigation underlines and pricing accent lines have restrained hover,
  press and focus feedback. Pricing elevation uses transforms without moving
  surrounding layout. The closing action gets a short connecting-line response.
- The ROI's true result updates immediately; a short opacity/translation accent
  and transform-based indicator accompany it. There is no delayed numeric tween.
- FAQ and process disclosure expansion uses native CSS interpolation where
  supported, with a functional native fallback elsewhere.

Reduced motion disables autoplay and decorative movement. Manual controls still
work; Play is disabled when animation is unavailable. Leaving the viewport/tab
pauses sequence timers and waveform motion. Enhancement controls reserve their
space before hydration; core text and links never depend on an invisible CSS
starting state. Unsupported IntersectionObserver/Web Animations leaves the site
usable. Streamed-content hydration, route transitions and a return from the
local lab were checked again after implementation.

## Functional review and contact form

All four exact price pairs remain: Receptionist **$2,500 + $997/month**;
Follow-Up **$1,500 + $497/month**; Website **$3,500 + $297/month**; Complete
**$5,500 + $1,497/month**. Package CTAs still select the matching contact option.
Included usage and the comparison arithmetic were retained and checked.

The form uses `src/app/contact/actions.ts` and the existing custom inquiry
service, **not Netlify Forms**. This task did not change the backend. Browser
journeys submit to a local Next.js server, read the actual private JSON record
back, and match its reference and selected package. Client/server validation,
required consent, pending state, frozen submission data, network failure,
retained fields, retry/deduplication, save failure and notification failure are
covered. Unit tests use local data and a local stub notification server.
Success still requires a real saved record; a simulated failed save is not
confirmed. No external transaction was used to demonstrate success.

On Netlify the existing backend uses private Blobs, separated by production and
preview namespaces. The last production release's hosted persistence evidence
is documented in `NETLIFY-DEPLOYMENT.md`; it is historical, not a new hosted test
of these local changes. Notifications remain unconfigured, so operators must
review stored inquiries. The form does not reserve a meeting. The existing
rate limit is per process, not a distributed abuse-control service.

Calculator bounds, reset, inputs and consultation link work. Scripted demo
scenarios, industries/safety copy, five system stages, FAQ, footer, internal
links, invalid-route recovery and route metadata passed. Safety language,
emergency limits and scripted/no-real-event disclaimers remain. No testimonials,
client proof, certifications or outcome claims were invented.

## Exact changed files

Paths below are relative to `src/`, except tests and this report.

| File | Purpose |
| --- | --- |
| `app/globals.css` | Remove global lab hiding; critical header/fallback layout; shared motion, process, FAQ, service and pricing treatments. |
| `app/layout.tsx` | Shared motion provider, correct skip-link stacking and documented Next.js 16 smooth-scroll transition attribute. |
| `components/site-header.tsx` | Native fallback, visible Menu text, support detection, guarded listeners; preserve modal and active states. |
| `components/motion-system.tsx` | New shared observer, visibility/preference subscriptions, finite player, controls and update accent. |
| `components/hero.tsx` | Hero entrance markers. |
| `components/operations-stage.tsx` | Finite illustrative workflow, path, waveform and inspection controls. |
| `components/page-hero.tsx` | Shared page-title reveal marker. |
| `components/services-overview.tsx` | Service reveal markers and reusable conversation previews. |
| `components/service-conversation.tsx` | New scripted receptionist/chat reply player; original messages retained. |
| `components/follow-up-sequence.tsx` | Playable five-step sequence; preserve manual keyboard selection and disclaimers. |
| `components/process.tsx` | Native step disclosures and matching desktop/mobile process explanation. |
| `components/product-demo.tsx` | Accent deliberate scenario/response updates; retain controls and copy. |
| `components/pricing-grid.tsx` | Staggered reveal markers; prices/inclusions untouched. |
| `components/roi-calculator.tsx` | Accent immediate numeric update and transform-based indicator. |
| `components/faq-list.tsx` | Native disclosure transition hooks. |
| `components/cta-band.tsx` | Closing reveal markers and connecting-line response. |
| `tests/browser/navigation-stability.spec.ts` | 16 new navigation/resilience/skip-link regressions. |
| `tests/browser/motion.spec.ts` | 10 new motion, reduced-motion, process, calculator and capability regressions. |
| `docs/NAVIGATION-AND-MOTION.md` | This review and operational limits. |

## Validation

Before changes: existing **24 unit tests and 41 browser tests**, lint, TypeScript
and production build passed. After changes:

| Check | Result |
| --- | --- |
| `npm test` | 24 passed. |
| `npm run test:e2e` | 67 passed, including all 41 original tests without changes. |
| `npm run build` | Passed; all five public routes built. |
| `npm run typecheck` | Passed. |
| `npm run lint` | Passed. |
| `git diff --check` | Passed. |
| Actual local production-build render sweep | 35/35 route-width checks: HTTP 200, visible header, no horizontal overflow, zero captured page/console errors. |
| Automated axe checks | No violations on all five routes at 390/1440px, plus invalid-form checks. |
| No-script / missing-dialog menu | Working route navigation and close controls verified. |
| Portrait/landscape touch emulation | Menu, scroll unlocking and controls passed. |
| Development lab/theme checks | Header/menu passed all four existing palettes at 390/1440px; no captured errors or overflow. |

The first new test run exposed selectors that also matched inactive headings
retained by Next.js; new tests now target the visible accessible heading. A
motion attribute added before child hydration also produced a warning during
implementation; visibility moved to a WeakMap and the warning disappeared in
fresh browser checks. The skip-link stacking issue introduced by the higher
header layer was fixed before final testing. These were corrected locally.

Fresh Lighthouse checks against the local production build:

| Lab metric | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 94 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Largest Contentful Paint | 1.04s | 0.28s |
| Cumulative Layout Shift | 0 | 0.00003 |
| Total Blocking Time | 282ms | 0ms |

These are lab measurements, not hosted or real-user Core Web Vitals; INP was not
measured. An initial mobile run overlapped video export and reported a slow-CPU
warning (71 performance); it was rerun alone after export finished. An earlier isolated
mobile run measured 99 performance and 145ms blocking time. After the last
navigation resilience changes, both modes were measured again sequentially with
no concurrent QA/export. The final results above have no Lighthouse warnings;
the variation is retained rather than hidden. Raw initial, intermediate and
final reports are available under the QA directory.

## Visual review and preview

Rendered and inspected the homepage, menus, process interaction, detailed service
stories, pricing and contact on desktop/mobile. Retained all-route full-page
captures at 390/1440px and homepage captures at every required width. The second
review uses a local production build, without development controls. The final
browser suite covers the last navigation resilience changes. Recordings show
the same visual design and normal interactions.

- `/workspace/outputs/vonte-motion-review.html`: self-contained review with
  desktop/mobile recordings, all five route screenshots and before/after views.
- `/workspace/outputs/vonte-motion-desktop.mp4` and `vonte-motion-mobile.mp4`:
  actual browser recordings; no audio.
- `/workspace/outputs/vonte-motion-desktop.png` and `vonte-motion-mobile.png`:
  homepage captures.
- `/workspace/outputs/vonte-motion-source.zip`: local source, excluding
  credentials, private records, dependencies and generated build/test outputs.
- Local running app: port **3903** (production build), or **3880** (development).
  To run from source: `npm ci`, `npm run build`, `npm start` (default port 3847).

Retained logs and screenshots live under `/workspace/work/vonte-motion/`.
The review artifact passed all 10 route/width selector combinations; embedded
images decoded and both recordings loaded and played, with no captured page
errors or horizontal overflow at 390px.

At the time of the local review, production remained `5b54b7a`. The release
update above records the subsequent authorized publication of these changes.

## Remaining limits and approval readiness

The local review was ready for deployment approval. The owner then approved
publication; the full Netlify adapter pipeline and hosted route/form-storage
verification completed successfully, as recorded above. The limitations below
still apply.

The exact production disappearance still needs affected-session evidence to
close its diagnosis. Native menu fallback and regression coverage address
verified failures; no implementation can promise that a menu will never fail
on every browser or device. Checks used Chromium desktop/touch emulation, not a
physical phone. WebKit launch was attempted but blocked by missing GTK4,
Graphene, Harfbuzz ICU, Manette, Hyphen and GLES libraries. Safari/iOS and manual
screen-reader verification remain unverified. There is no live AI calling,
chatbot service or calendar integration behind these illustrative previews.
