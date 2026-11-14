# VONTE minimalist design exploration

## Scope and starting point

Started from a clean `80cf003` on `improve/vonte-audit-reliability`; work continues
on `design/vonte-minimal-directions`. No push or deployment is authorized or
performed by this redesign. The previous Netlify preview and production remain
separate, older releases.

Inspected the App Router routes, shared components, Tailwind/global styles,
font setup and licenses, generated icons/social image, pricing/content sources,
inquiry action/validation/storage, environment configuration and browser tests.
Read AGENTS.md and the installed Next.js CSS and server/client documentation.
The starting production build, lint, TypeScript, 24 unit tests and 38 browser
tests passed before editing.

The five existing pages are preserved: Home, Services, Pricing, How It Works and
Contact. Existing features include four published packages, an ROI calculator,
five interactive workflow stages, three scripted receptionist scenarios, a
five-step follow-up simulation, six industry examples, FAQ disclosures, desktop
and mobile navigation, package-aware contact links and validated inquiries with
real private persistence. The backend, package data and dependency lockfile are
unchanged. There is no native app or live telephone/chat/calendar integration.

## Four actual directions

These use the same homepage components, business copy, service features and
package data. They are rendered layouts, not palette swatches or generated
concept images.

| Direction | Palette | Composition |
| --- | --- | --- |
| A · Obsidian & Champagne | `#0A0A0B`, `#F2EEE6`, `#BEA47B` | Asymmetric hero, italic Instrument Serif answer, vertical inquiry rail, spacious editorial service rows and serif package headings |
| B · Graphite & Silver | `#101114`, `#F5F5F5`, `#969DA8` | Centered typographic hero, larger silver answer, horizontal inquiry rail, aligned service rows and restrained comparison cards |
| C · Black & Ice Blue | `#090C10`, `#F1F4F8`, `#80B4EB` | Compact split hero, monospaced interface labels, square interface nodes, blue action states and service columns on desktop |
| D · Carbon & Sage | `#0A0D0B`, `#ECEFEA`, `#76AC92` | Offset headline/copy grid, lighter headline, upright serif answer, wide inquiry rail and understated sage workflow selection |

All four have deliberate phone arrangements, comfortable buttons and a simplified
vertical inquiry rail. Mobile comparisons retain the same content as desktop.

## Initial recommendation: B · Graphite & Silver

This is a creative assessment, not a measured conversion claim.

| Criterion | Assessment |
| --- | --- |
| Premium appearance | B relies on scale, alignment and space; A offers a warmer luxury alternative. |
| Distinctiveness | B's centered statement and single inquiry rail form a recognizable composition. D offers the most unusual accent palette. |
| Readability | All four keep high-contrast body text and clear action labels; B has the least competing color. |
| Business credibility | B suits a technology consultancy without suggesting an unimplemented product dashboard. |
| Mobile quality | B gives the headline and primary action a clear central hierarchy; the rail becomes a concise vertical sequence. |
| Brand consistency | Shared VONTE copy, component structure, package source and global tokens keep each direction coherent across routes. |
| Timelessness | B's neutral palette depends least on a fashionable accent color; A is a close editorial alternative. |
| Conversion clarity | Every direction keeps the same primary strategy-call path, accurate fees and package-aware inquiry flow. |

The founder selected **A · Obsidian & Champagne** after reviewing the alternatives.
A is now the local default across all five routes and generated brand assets.
B, C and D remain in source and in the development lab. No alternative was deleted.
The assessment above records the initial recommendation; the founder's selection
governs the implementation. This selection does not authorize a push or deployment.

## Implemented redesign

- New requested hero: “Every Opportunity. Answered.” with the specified supporting
  copy, one primary “Book a Strategy Call” action and secondary “Explore VONTE”
  link to the working System section.
- One custom incoming-call → booking-request composition. Removed continuous
  waveform/orbit effects, dotted fields, background grids and decorative animated
  CTA paths. No new animation library, image payload or external font dependency.
- Seven homepage sections instead of nine: hero, service/problem overview,
  interactive system, scripted demo, pricing preview, service boundaries and final
  action. Full implementation steps remain on How It Works; the ROI calculator,
  industry details and FAQ remain on their existing routes.
- Service previews use editorial rows with audience, problem, four features,
  both fees and one link. Mobile recomposes these into readable stacked groups.
- Pricing retains all four packages, setup/monthly fees, inclusions, usage caveats
  and accurate $2,000 setup / $294 monthly Complete savings. A quieter raised
  surface distinguishes Complete; it is not described as best for every business.
- Semantic color tokens replace the old navy/light/gold presentation throughout
  every route, including forms, menus, demos, calculator, FAQ and footer. Form
  errors use a readable light error color; native inputs use the dark color scheme.
- Kept Instrument Sans and limited Instrument Serif, both already licensed and
  self-hosted through Next.js. Brand icons and social images use the selected
  palette from the same source as the website.
- Existing form validation, pending snapshot protection, retry behavior,
  create-only storage, consent, package context and saved-reference feedback remain.
  No fake success, notification service or paid integration was introduced.

## Compare locally

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:3847/design-lab`. Choose A, B, C or D, then a viewport width:
375, 390, 430, 768, 1024 or 1440px. Scroll inside the frame to explore the real
homepage and use its controls. “Open full preview” opens the selected direction
without the comparison controls.

Direct development previews:

- `http://127.0.0.1:3847/?direction=obsidian`
- `http://127.0.0.1:3847/?direction=graphite`
- `http://127.0.0.1:3847/?direction=ice`
- `http://127.0.0.1:3847/?direction=sage`

For this workspace's running review session, use port **3880** in those URLs.
The selected theme stays on subsequent client navigation in that preview. A hard
reload of another route without the direction parameter returns to the default.
No theme state or visitor data is written to browser storage.

The `/design-lab` route returns HTTP 404 outside development. The query override
helper renders only in development; production query strings cannot change the
theme. The lab is absent from public navigation and the sitemap and has noindex
metadata. Screenshot artifacts live outside the application, not in `public/`.

## Change the default or adjust colors

Edit **`src/lib/visual-directions.ts`**:

```ts
export const DEFAULT_DIRECTION: VisualDirection = "obsidian"
```

Available values: `obsidian`, `graphite`, `ice`, `sage`. Each direction's `colors`
object defines background, surface, raised surface, text, muted/subtle text,
accent, divider, control border and button/ink colors. This is the single palette
source for the HTML, local previews and generated brand assets. Rebuild after
changing the default. No backend or package file needs editing.

`src/app/globals.css` maps those values to semantic Tailwind tokens and contains
the shared layout rules plus clearly marked A/C/D composition variations. There
is no public theme picker or browser preference script in the production site.

## Verification and limitations

The original browser journeys remain; only the
explicitly changed hero copy and the removed waveform assertion require updated
expectations. Reduced motion now checks the current entrance, scrolling and
button transitions rather than looking for a removed decorative element.

Unchanged limits: live voice/chat/messaging/booking demonstrations are simulated;
email notifications and real scheduling are unconfigured. Inquiry persistence is
real, with local files in development and private Netlify Blobs in hosted builds.
This turn performs local tests and no hosted submissions. Physical mobile devices,
Safari/iOS, manual screen-reader coverage and real-user INP remain unverified.
The earlier dependency audit found zero production vulnerabilities and eight
moderate development-tool findings; no dependency change is made here.

Before any push or deployment, founders must approve the visual direction and
release commit. Then rerun checks, use the full Netlify Next.js adapter pipeline,
verify the hosted routes/assets/metadata, and test a clearly marked inquiry against
the separate preview store before considering production. Existing inquiry
monitoring and privacy/retention responsibilities still require owner review.

## Executed results

Final checks against the production build passed:

- 24 unit tests; all original pricing, ROI and inquiry tests retained.
- 41 browser tests: the existing 38 journeys with the two visual expectations
  updated as described above, plus three new tests covering production lab/query
  isolation, first-screen action/workflow navigation at seven widths, and dark
  invalid-form accessibility. The final complete run passed 41/41.
- Next.js production build, TypeScript, ESLint and `git diff --check`.
- All five routes at 320, 375, 390, 430, 768, 1024 and 1440px: HTTP 200, no
  horizontal overflow, no captured page errors. Custom 404 behavior is preserved;
  `/design-lab` is verified as HTTP 404 in production.
- Ten automated axe checks across the five production routes at 390 and 1440px,
  plus the invalid inquiry form, reported zero violations. Keyboard, focus,
  Escape, touch, portrait/landscape, reduced motion and missing-browser-feature
  regressions also passed. These checks are not a manual screen-reader audit or
  accessibility certification.
- The four development directions each passed all seven widths: 28 layout
  comparisons, primary hero action visible within an 812px first screen, no
  overflow or captured page errors. Eight axe checks across all four directions
  at 390 and 1440px reported zero violations. All four lab selections and both
  mobile/desktop frame widths were exercised successfully.
- Pricing-to-form selection, validation/correction, pending/failure/retry states
  and real local inquiry save/read-back passed. No external notification was sent.
- Full-page and section screenshots were inspected. The final pass strengthened
  native select and ROI-input borders, aligned package headings, kept fees clear
  and confirmed the simplified mobile illustration and secondary action.

### Initial Graphite default Lighthouse lab measurements

Sequential runs against the initial Graphite production build on localhost, after browser
tests/capture work finished, with Chromium and Lighthouse mobile/desktop presets:

| Measurement | Mobile | Desktop |
| --- | ---: | ---: |
| Performance | 98 | 100 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Largest Contentful Paint | 0.92 seconds | 0.27 seconds |
| Cumulative Layout Shift | 0 | 0 |
| Total Blocking Time | 170 ms | 0 ms |

These are local lab measurements, not hosted results or real-user Core Web Vitals.
TBT is not an INP measurement. No performance warning was reported by either run.

### Evidence and review files

- `/workspace/work/vonte-minimal/`: baseline/final logs, raw Lighthouse reports,
  35-route render report and 28-layout exploration report.
- `after/<direction>-390-hero.png` and `after/<direction>-1440-hero.png`:
  clean mobile/desktop heroes for all four directions. The same naming pattern
  includes services (`solutions`), pricing and selected workflow states.
- Full-page default-theme captures cover all five routes at 390 and 1440px;
  selected-package contact captures include the finished form.
- `/workspace/outputs/vonte-design-comparison.html`: self-contained review file
  with 32 embedded captures, desktop/mobile and section selectors, and expand/
  reduce controls. All embedded images decoded successfully; all selectors and
  expand/reduce behavior passed, with no overflow at 390px. This file uses no
  external assets and can be downloaded and opened without running the project.
- `/workspace/outputs/vonte-desktop-directions.png` and
  `/workspace/outputs/vonte-mobile-directions.png`: comparison sheets.
- `/workspace/outputs/vonte-minimal-redesign-source.zip`: committed source,
  including all four themes, development lab and this report. Private inquiry
  records, environment files, dependencies and build outputs are excluded.

The redesign remains local. Production and the previous Netlify review links do
not contain this new visual direction.

## Selected A default verification

After the founder selected A, changed `DEFAULT_DIRECTION` to `obsidian`, updated
the lab's default/selection labels, README and comparison file, and rebuilt the
site. No package, backend or route behavior was changed.

- 24 unit tests and 41 browser tests passed with A as the production-build default.
- Production build, TypeScript, ESLint and `git diff --check` passed.
- The complete browser suite checked all five routes at 320–1440px, including
  package selection, inquiry persistence, calculator, demo, navigation, keyboard,
  reduced motion and automated accessibility checks at 390/1440px.
- Additional rendering confirmed all five routes use `data-theme="obsidian"`
  and background `#0A0A0B`, return HTTP 200, have no horizontal overflow and produce
  no captured page errors at 390 and 1440px. Desktop/mobile homepage captures
  were inspected. The production design-lab route still returns 404.
- Current default screenshots: `/workspace/outputs/vonte-selected-a-desktop.png`
  and `/workspace/outputs/vonte-selected-a-mobile.png`.
- Updated comparison file retains all 32 captures and passed its image decode,
  viewport, section, expand/reduce and narrow-layout checks.
- The source archive now includes the founder-selected A default. Earlier
  Lighthouse scores above are explicitly for the initial B default; no new
  performance measurement is claimed for this selection.
- No GitHub push, Netlify deployment, credential change or external notification
  was performed. Selecting the visual direction is recorded separately from
  authorizing a release.
