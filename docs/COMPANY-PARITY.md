# Company deployment recovery — 14 November 2026

Status: local recovery candidate; no GitHub push, Netlify settings mutation, or deployment is authorized or performed. Read the final verification report alongside this record before release.

## Confirmed root cause

The company website builds an older source revision. Its published deployment is associated with `ffa6f414c6a0b6f4e27ebcf822b156d4b72349ae` on `main`. GitHub main still points at that revision. The approved design, durable inquiry storage and navigation repair were subsequently committed on other branches, never integrated into main. This is a source/version divergence, not a CSS-loading failure or an environment-selected theme.

`origin/fix/vonte-navigation-motion` at `658090fa9fd3e91cb7b57332b6a26a19dd9ed261` contains 17 commits after main; it descends from `origin/design/vonte-editorial-refinement` at `2c36f01`. The older main uses hard-coded cream/navy/gold styling, while commit `e58ff43` selects Obsidian. Both live websites serve Next.js successfully, with the same deployed Next adapter version and Node runtime. All five primary live routes returned HTTP 200 at 390, 768 and 1440 pixels, without page JavaScript errors or horizontal overflow in the captured initial state.

The final personal CLI title mentions `01acf00`. This commit does not exist in the complete fetched branch history; `git rev-parse --verify '01acf00^{commit}'` fails and `git fsck` finds no unreachable recovery object. GitHub's commit API also returns HTTP 422, "No commit found for SHA: 01acf00". The personal deploy has no recorded source commit and no source ZIP. Its exact original working tree cannot be recovered from this workspace. Its remaining narrow UI differences were restored using the live site as a reference; no minified JavaScript reconstruction or compiled `.next` copying was used.

## Deployment identity (read-only API evidence)

| Field | Personal reference | Company |
| --- | --- | --- |
| Site | vonte-ai | vonte |
| Site ID | 32c06496-b748-47d9-9f99-eac0fca21737 | 5b55d061-0385-44d0-bbf5-19839d084818 |
| Team | muhammadahmadr1zwan | Vonte AI / vonteai-gxkectw |
| Team ID | 6833fddc99a3a8c6fb04288d | 6af8b44b58e6c88f5c6d7675 |
| Published deploy | 6af2f58d98606cdf12363438 | 6af8b7c47df6ae8922d22bac |
| Created (UTC) | 2026-11-10 10:44:29.837 | 2026-11-14 19:34:28.708 |
| Published (UTC) | 2026-11-10 10:44:55.566 | 2026-11-14 19:35:08.755 |
| State / context | ready / production | ready / production |
| Source SHA | null | ffa6f414c6a0b6f4e27ebcf822b156d4b72349ae |
| Branch | null | main |
| Deploy source field | cli | api (Git-associated build) |
| Build ID | null | 6af8b7c47df6ae8922d22baa |
| Framework | next | next |
| Adapter | @netlify/plugin-nextjs@5.16.6 | @netlify/plugin-nextjs@5.16.6 |
| Server runtime | nodejs24.x | nodejs24.x |
| Server function | Next.js Server Handler | Next.js Server Handler |
| Source ZIP available | false | true |
| Netlify Forms | not enabled | not enabled |

The company deployment's `commit_url` points to `https://github.com/muhammadahmadr1zwan/vonte-ai/commit/ffa6f414c6a0b6f4e27ebcf822b156d4b72349ae`. Its `deploy_source=api` is reported literally; this field alone does not identify the triggering action. Current dashboard repository/build settings and build logs are not exposed by the connected read tools and have not been verified. Do not infer those settings from the deploy title or branch URL.

Company non-production deployments currently require team SSO; that access setting must be retained. Personal production and access controls remain untouched.

## Workspace preservation and recovery

The attached workspace initially contained only the request and no VONTE checkout, credentials, worktrees or build artifacts. A fresh full clone was created under `work/vonte-ai`. Initial status was clean; main and origin/main agreed. All remote branches were inspected; no tags, stashes, pre-existing reflogs or alternate local VONTE folders were present. This cannot inspect the founder's computer or establish whether `01acf00` exists there.

The working branch `recovery/company-parity` starts at `658090f`, preserving the entire later branch history without resetting main, rewriting history or blindly cherry-picking. It has no upstream, and no local `.netlify/state.json` was created. Personal project IDs in historical documentation are not deployment targets for this recovery.

Targeted additions above that recovered base:

- `src/components/operations-stage.tsx`: restore the five reference explanations, previous/next boundaries, and reference record label.
- `src/components/motion-system.tsx`: optional bounded sequence controls for the hero; service sequence playback retains existing behavior.
- `src/components/services-overview.tsx`: share native, keyboard-operable disclosure panels for all three service descriptions; retain every paragraph and package inclusion.
- `src/app/globals.css`: restore the corresponding reference layout, disclosure focus/hover styles, and reduced-motion behavior.
- `scripts/build-info.mjs`: generate a public, allowlisted `/build-info.json` on every build, identify dirty/unknown source honestly, and reject untraceable Netlify releases or temporary inquiry storage. Production requires an approved HTTPS canonical origin.
- `next.config.ts`, `netlify.toml`: mark build information `no-store`; preserve SSR/Server Action routing and production/preview store namespaces.
- `.nvmrc`, `package.json`, `package-lock.json`: Node 24, existing npm lockfile, prebuild identification. No dependency versions changed.
- `.github/workflows/verify.yml`: read-only checks on PRs and main; no deployment secrets or deployment commands. Require this status through branch protection after approval.
- `tests/build-info.test.ts`, `tests/browser/deployment-parity.spec.ts`: provenance/configuration failure cases, metadata response, finite hero controls and all service disclosures at the three requested widths.
- `.gitignore`, `.env.example`, `README.md`: ignore generated identity and document the company release process.

## Comparison matrix

| Component | Personal reference | Current company | Difference / cause | Priority |
| --- | --- | --- | --- | --- |
| Palette | Obsidian/champagne; body #0a0a0b | Cream/navy/gold; body #fcfbf8 | Different versioned CSS and default palette | Critical |
| Header | Full navigation including Home and The System, native fallback | Older primary navigation | Later navigation commits absent from main | Critical |
| Hero | Original inquiry artwork, bounded controls, five explanations | Older static call-to-booking composition | Later artwork and motion absent | High |
| Services | Three native scope disclosures and controlled conversations | Earlier service presentation | Later source plus final CLI refinements | High |
| Workflow/demo | Step explanations, manual controls, progressive exchange | Earlier workflow and full-exchange demo | Source divergence; underlying capabilities retained | High |
| Pricing | Same approved amounts, compact summary and comparison on pricing page | Older layouts, expanded content on homepage | Layout changed; no price change | Critical amounts / Medium layout |
| ROI, FAQ, industries | Available on dedicated routes | Also expanded on homepage | Route/content hierarchy changed; features remain available | High preservation |
| Contact | Server Action; private Netlify Blobs configured | Older Server Action; local-file implementation | Durable-storage commit absent and no company env | Critical |
| Mobile | Menu opens; no captured overflow | Menu opens; no captured overflow | Both initial flows work; recovered navigation has additional safeguards | Critical |
| SEO | Configured canonical origin | No site/team env configured | Account-specific configuration missing | High |

No independently newer company feature was found: its recorded source is an ancestor of the recovery base. Features formerly shown in full on the homepage (calculator, industry chooser, FAQ, detailed comparison) remain on the dedicated routes in the approved newer design.

## Environment comparison (names and scopes only)

Both team-level lists were empty. Personal site-level `INQUIRY_STORAGE` and `NEXT_PUBLIC_SITE_URL` are present in all contexts with Builds, Functions, Runtime and Post Processing scopes. The company site-level list is empty. No secret values were printed, stored, copied or committed.

| Variable | Personal | Company | Code effect / required setup |
| --- | --- | --- | --- |
| INQUIRY_STORAGE | present, all contexts | absent | Set netlify-blobs with Builds and Functions scopes before a company build; otherwise the old code uses unsuitable local storage. New build guard rejects this. |
| NEXT_PUBLIC_SITE_URL | present, all contexts | absent | Production Builds scope: https://vonte.netlify.app; required for canonical URLs, sitemap and OG origins. |
| VONTE_ENVIRONMENT | absent | absent | New non-secret build label: company-production for production, company-preview for previews/branch builds. |
| NEXT_PUBLIC_CONTACT_EMAIL / PHONE | absent | absent | Optional public footer information; leave blank until approved. |
| NEXT_PUBLIC_SCHEDULING_URL | absent | absent | Optional real calendar destination; blank retains /contact. |
| NEXT_PUBLIC_VOICE_DEMO_NUMBER | absent | absent | Optional voice sample; on-screen demos remain scripted. |
| INQUIRY_WEBHOOK_URL / SECRET | absent | absent | Optional server notification; requires an approved company destination. |
| RESEND_API_KEY / INQUIRY_FROM_EMAIL / INQUIRY_NOTIFY_EMAIL | absent | absent | Optional server email channel; configure all three with company ownership and Functions/Builds access only after approval. |
| INQUIRY_DATA_DIR | absent | absent | Local tests only; must not be the Netlify production destination. |
| VONTE_INQUIRY_STORE | build-generated | build-generated in recovered source | next.config.ts determines production/preview namespace through CONTEXT; do not move personal data or tokens. |

Environment changes require a fresh build/redeploy. Blobs credentials come from Netlify's site runtime; no personal API token should be copied to the company. The same store name on a different site does not migrate old inquiries. Continue reviewing the personal site's existing store throughout the transition.

The contact form uses a custom Next.js Server Action, not Netlify Forms. Enabling Netlify Forms is not the fix. An approved company production store plus a named company operator is a valid destination even without optional email; live delivery must be proved by an authorized synthetic submission and an operator checking its private record.

## Reproducible company build and approval gate

Target only company site `5b55d061-0385-44d0-bbf5-19839d084818`, team `6af8b44b58e6c88f5c6d7675`. Preserve `main` as intended production branch after the approved recovery is merged. This document is not approval to push or change either project.

1. Read the company dashboard's Continuous deployment settings and retain a safe, secret-free record: connected repository, main production branch, root base/package directory, install command, build command, publish path, ignore command and plugin overrides. Read the published build log to confirm Node/npm/adapter installation. The tools used here do not expose these settings/logs.
2. Required repository config: root base, npm with committed `package-lock.json`, Node 24, `npm run build`, `.next` publish directory, automatic modern OpenNext adapter, no SPA catch-all. `netlify.toml` is versioned and overrides corresponding dashboard fields. Default install behavior should use the committed npm lock; verify `npm ci` or the host's equivalent lock-preserving install in the actual log. No monorepo configuration is intended.
3. Approve setting company-only env listed above, including Blobs in preview and production. Keep preview inquiry namespace isolated. Confirm the company operator owns and can inspect the store. Do not silently add email/webhook destinations or personal credentials.
4. Approve pushing only `recovery/company-parity` first. A Git-connected branch or PR can trigger a deployment, so the push itself requires approval. Review the diff against main, preserving the 17 recovered commits. Open a PR only after push approval. Never CLI-link to the personal project.
5. In an approved company Deploy Preview, verify `/build-info.json` has the intended source SHA, a clean source flag and company-preview context. Run desktop/mobile browser journeys and submit one clearly labeled synthetic inquiry to the preview store, then confirm the private JSON record, selected package and reference. Preview SSO may require the company owner for browser checks. No production inquiry is authorized by this step.
6. After preview evidence and dashboard settings are verified, request explicit merge/production approval for the exact reviewed SHA. Enable/check the GitHub verification status requirement with approval. Merge into main; let the company's existing Git integration build production. Avoid a manual artifact upload or a separate personal deployment.
7. Confirm production deploy ID and commit, `/build-info.json`, canonical origin, all five routes, menus, prices, CTAs, workflow, ROI, FAQ, reduced motion, assets, console/network health and three viewport captures. With explicit approval, send a labeled production inquiry and verify it in the company store. Keep personal site and all existing records intact.

## Rollback / failure handling

A failed Netlify build never replaces the current published website. If a newly published company release is bad, stop further changes and, with approval, revert its merge/source commit and associated company configuration changes, then allow Git CD to build the corrected source. Retain the current known-good SHA `ffa6f414c6a0b6f4e27ebcf822b156d4b72349ae` and published deploy `6af8b7c47df6ae8922d22bac` as references. Do not invoke deploy restore/publish actions or touch the personal site. Inquiry records are private site data, not repository content; preserve them through any code rollback.

## Verification boundaries

The recovered baseline passed its original 24 unit tests, build, lint and typecheck. The recovery now passes 28 unit tests and 71 browser tests (zero skipped, unexpected or flaky results; 5.1 minutes). Browser coverage includes navigation reload/back/sticky behavior, JavaScript-free mobile fallback, delayed hydration, accessibility at 390/1440 pixels, overflow checks from 320 to 1440 pixels, every price and package CTA, actual local inquiry persistence and failed-request retries, all demo/workflow stages, ROI, FAQ, motion and reduced motion. Build, lint and typecheck have passed; the clean-commit build identity is checked separately after the local commit.

All five recovered routes have identical rendered body text and full-page dimensions to the personal reference at 390, 768 and 1440 pixels. The final screenshot comparison has no pixels differing by more than 20/255 after excluding the fixed Netlify platform badge rectangle (bottom right of the original 1000-pixel viewport). Raw differences range from 0.0605% to 0.4072%, confined to that badge area. Two first-pass captures were scrolled during capture; they were rechecked with equal header/H1 geometry at scroll zero and recaptured before accepting these results. No application source changes were needed for that capture artifact. This establishes the tested static visual states, not every animation frame or actual company-hosted parity.

Local synthetic form records prove the local Server Action/storage journey. Unit tests exercise Blobs create-only/idempotency and error behavior with a store double; they do not prove the new company's real Blobs delivery or optional email. No live form submission, push, deployment, redirect, domain move, billing change, account transfer or credential migration was performed during this investigation.
