# Netlify deployment and operations

Project: `vonte-ai` (`32c06496-b748-47d9-9f99-eac0fca21737`).
Production address: https://vonte-ai.netlify.app.
Dashboard: https://app.netlify.com/projects/vonte-ai.

This release uses an authenticated manual CLI upload. Git continuous deployment is
not connected. Reviewed application source `5b54b7a` is pushed on
`design/vonte-editorial-refinement` in `muhammadahmadr1zwan/vonte-ai`.
Pushing a branch alone does not publish this project.

## Current production release

The founder-selected Obsidian & Champagne design and editorial refinement were
published on November 10, 2026, at 2:24 a.m. EST, with explicit release approval.

- Application commit: `5b54b7abe9fa3d778c5489c4e1036f06dd346798`.
- Production deploy: `6af2c67c9e988207d831c099`.
- [Deploy details](https://app.netlify.com/projects/vonte-ai/deploys/6af2c67c9e988207d831c099).
- Netlify reports `ready`, context `production`, published at
  `2026-11-10T07:24:09.857Z`, and the project's current published deploy matches.
- The complete CLI Next.js adapter pipeline ran with `--prod --context production`.
  No raw `.next` upload or skipped build/publish hooks.
- Existing checks for this application revision: 24 unit tests, 41 browser tests,
  production build, TypeScript and ESLint passed.
- Live browser sweep: all five routes at 320, 375, 390, 430, 768, 1024 and 1440px
  returned HTTP 200 with no overflow or captured page errors. Additional System
  deep links/menu destinations passed at six widths. The default theme and
  revised inquiry artwork are present on production.
- All five workflow stages, calculator sample/change, demo-to-inquiry selection,
  mobile industry safety copy, menu Escape, package summary, invalid form and
  corrected submission passed.
- Marked QA inquiry `VN-C10F56D9` was read back through the authenticated CLI from
  `vonte-inquiries-production`. UUID, reference, selected Complete package and QA
  marker matched the browser. No customer data was deleted. Email/SMS/webhook
  notifications remain unconfigured; the QA request explicitly needs no follow-up.
- Referenced homepage CSS/JavaScript, sitemap, robots and Open Graph image returned
  HTTP 200. Canonical and sitemap use the production origin; production is
  indexable. `/design-lab`, raw server code, configuration and environment-file
  paths return HTTP 404. A development theme query cannot change the public theme.

Evidence is under `/workspace/work/vonte-production-5b54b7a/` and
`/workspace/work/netlify-qa/production-5b54b7a-report.json`. The private QA object
is outside Git. Subsequent documentation-only commits record this release and
do not change the deployed application.

## Build and publish

Use Node 24, `npm ci`, and the complete Netlify CLI build pipeline. The automatically
selected Netlify Next.js adapter packages static assets, SSR and Server Actions.

```sh
netlify link --id 32c06496-b748-47d9-9f99-eac0fca21737
netlify deploy --context deploy-preview
# After verifying the preview and with release authorization:
netlify deploy --prod --context production
```

The local `.netlify/` directory is ignored by Git. Do not commit CLI link state,
generated artifacts, credentials, or inquiry records. Do not upload raw `.next`
output or skip the adapter publishing hooks with `--no-build`.

## Private inquiries

The project's environment variables are `INQUIRY_STORAGE=netlify-blobs` and
`NEXT_PUBLIC_SITE_URL=https://vonte-ai.netlify.app`. Neither is a secret. Netlify
injects runtime Blobs credentials; no personal token is included in the app.

Review requests in **Data & Storage → Blobs → vonte-inquiries-production**. Each
JSON object is keyed by the inquiry UUID with `.json` appended. Its `reference`
matches the visitor's confirmation. Only the project owner/operators can browse
these records through Netlify; the website exposes no inquiry-read endpoint.

Preview builds use `vonte-inquiries-preview`; the namespace is fixed by the build
context. Create-only writes preserve the original request on retries. Records
survive redeploys. Operator review is required: email, SMS, and webhook delivery
are not configured. Notification credentials require a verified provider and a
separately authorized delivery test.

Synthetic launch checks identify themselves as **VONTE Deployment QA**, use
`qa@example.test`, and explicitly say no follow-up is required. They are test
records, not customer leads.

## Verification

Before publication: 24 unit tests, 17 browser tests, lint, typecheck, production
build and production-dependency audit passed. The complete Netlify preview
`6af148a1ba918a5042c67c2c` returned HTTP 200 on all five routes at desktop and mobile
sizes, with no horizontal overflow or captured browser errors. The pricing
calculator, demo, mobile menu, validation, package selection and successful
inquiry confirmation passed. Reading the stored preview JSON through the
authenticated CLI confirmed it matched the browser's inquiry ID.

Production deploy `6af14b08b1015a4e744d7c54` was published successfully on
2026-11-09 UTC. The production URL passed the same desktop/mobile browser smoke
checks with zero captured browser errors. The synthetic inquiry `VN-E07BA71C`
was confirmed in `vonte-inquiries-production` through the authenticated CLI.
Stylesheets and the sitemap return HTTP 200; the canonical and sitemap origin
use the production URL. Raw server-output/configuration paths return HTTP 404.

The project uses the Free account's existing features. No paid provider was
enabled. Phone/chat/booking product examples remain clearly labeled simulations.
