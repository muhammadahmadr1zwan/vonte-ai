# VONTE: refinement after the UI/UX discussion

Baseline: clean `e58ff43`, with the founder-selected A / Obsidian & Champagne
default. Work is on `design/vonte-editorial-refinement`. No push or deployment
was requested or performed.

## What was taken from the thread

Read the [supplied post and visible comments](https://www.reddit.com/r/codex/comments/1xpjdg9/how_do_you_get_codex_to_create_actually_good_uiux/),
including the expanded discussion about [a concrete mockup for the actual site](https://www.reddit.com/r/codex/comments/1xpjdg9/comment/19s8lk1apa5ad/).
The practical suggestions applied here are to establish a specific visual target,
use purposeful SVG work, and iterate against rendered screenshots. These are
community suggestions, not evidence of guaranteed design or conversion outcomes.

The approved A screenshots served as the visual reference: retain the near-black,
warm ivory, champagne and Instrument Serif identity. The concrete refinement
target was a recognizable customer question, a restrained routing diagram and an
organized request. The secondary action should visually yield to the strategy
call. Service information should scan as editorial rows, and the demo should
read as a conversation. Rendered phone/desktop captures were then inspected and
refined for copy length and interface-label readability.

## What changed

| File | Change and purpose |
| --- | --- |
| `components/hero.tsx` | Shorter, concrete service copy; business-specific eyebrow; secondary text link gives the filled strategy CTA a clearer hierarchy. Headline and destinations retained. |
| `components/operations-stage.tsx` | Original SVG and type composition replaces the two-endpoint illustration. Shows a sample question, Respond/Qualify/Route path, service/timing fields and staff-review status. Scripted/no-real-event language and accessible stage description retained. |
| `components/services-overview.tsx` | Clearer section introduction, stronger service names and slightly larger problem/audience copy; original audiences, four features, exact fees and service links retained. |
| `components/product-demo.tsx` | Adds presentation hooks for editorial scenario selection and transcript styling; scenario state, keyboard handling, controls, captured data and inquiry CTA unchanged. |
| `components/cta-band.tsx` | Compact split closing composition, clearer consultation copy and existing meeting/agreement caveat. One primary action remains. |
| `app/globals.css` | A-specific type refinement, quieter workflow selection, fewer boxed demo elements, deliberate phone spacing and readable figure labels. Removed unused rail styles. No continuous animation or new library. |
| `lib/visual-directions.ts` | Descriptions reflect the illustrated inquiry; palette values and selected default remain unchanged. |

The existing framework, five routes, four package prices, comparison arithmetic,
calculator, FAQ, industries, navigation and inquiry backend remain. No fictional
proof, new provider, scheduling integration or live phone/chat behavior was added.
The alternative palettes remain available in the development-only lab.

## Verification

Before changes: 24 unit tests, 41 browser tests and the production build passed.
After changes: 24 unit tests, all 41 existing browser tests, production build,
TypeScript and ESLint passed. No test was weakened or changed for this pass.

The browser suite covers package-to-inquiry journeys and actual local persistence,
calculator outputs, all scripted scenarios, stage navigation, keyboard/focus,
mobile menu orientation, error/retry states, reduced motion, missing browser
features, production design-lab isolation and internal links/metadata.

Additional production-build render sweep: all five routes returned HTTP 200 at
320, 375, 390, 430, 768, 1024 and 1440px, with zero horizontal overflow and zero
captured page errors. The main strategy CTA stays within the tested 812px first
viewport. Automated axe checks on all five routes at 390/1440px and the invalid
form reported zero violations. This is not a manual screen-reader certification.

Inspected actual desktop/mobile hero, full pages, service rows, selected workflow,
completed conversation and closing section. The first pass led to shorter hero
copy and larger figure labels. Final screenshots and raw logs are under
`/workspace/work/vonte-editorial/`.

Fresh sequential Lighthouse measurements against the final local production
build, after the browser work completed:

| Lab measurement | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 100 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Largest Contentful Paint | 0.92 seconds | 0.26 seconds |
| Cumulative Layout Shift | 0 | 0 |
| Total Blocking Time | 90 ms | 2 ms |

These are lab measurements, not hosted or real-user Core Web Vitals. INP was not
measured. No warning was reported by either run. Raw reports are retained with
the browser/render logs under `/workspace/work/vonte-editorial/`.

## Review and remaining limits

- `/workspace/outputs/vonte-refinement-review.html`: self-contained before/after
  review with desktop/mobile and first-viewport/full-homepage comparisons, plus
  detailed service/demo/closing captures. The images document the UI; screenshot
  controls are not substitutes for the site's working interactions.
- The review file passed all 12 selector combinations; all 14 embedded captures
  decoded, with no captured page errors or horizontal overflow at 390px.
- `/workspace/outputs/vonte-before-after.png`: compact desktop comparison sheet.
- `/workspace/outputs/vonte-refined-desktop.png` and `vonte-refined-mobile.png`:
  current hero captures.
- `/workspace/outputs/vonte-editorial-source.zip`: committed source. Private QA
  records, credentials, dependencies and build outputs are excluded.

The source can be run with `npm ci` and `npm run dev`. The default is still A;
`/design-lab` retains the alternative directions and returns 404 in production.
Previous four-direction comparison captures remain the original design study.

Checks used Chromium desktop and touch emulation. Physical-device and Safari/iOS
testing remain unverified. Demonstrations remain scripted; notifications and real
scheduling remain unconfigured. Inquiry persistence was checked locally in this
pass; no hosted submission or outgoing notification was performed. Publishing
still requires explicit release authorization and the existing Netlify preview/
private-storage verification process.
