# Netlify deployment and operations

Project: `vonte-ai` (`32c06496-b748-47d9-9f99-eac0fca21737`).
Production address: https://vonte-ai.netlify.app.
Dashboard: https://app.netlify.com/projects/vonte-ai.

This site uses authenticated manual CLI uploads. Git continuous deployment is
not connected, so pushing a branch alone does not publish the site. Reviewed
application source `b982464` is pushed on `fix/vonte-navigation-motion` in
`muhammadahmadr1zwan/vonte-ai`.

## Current production release

The navigation repair and controlled motion upgrade were published on
November 10, 2026, at **3:58 a.m. EST**, after the owner's explicit instruction
“push to prod now.”

- Application commit: `b98246407044d931912bface21babf298c81435f`.
- Production deploy: `6af2dc91ef3ecadd3be0dada`.
- [Deploy details](https://app.netlify.com/projects/vonte-ai/deploys/6af2dc91ef3ecadd3be0dada).
- Netlify reports `ready`, context `production`, published at
  `2026-11-10T08:58:22.723Z`. The project's current published-deploy ID matches.
- The complete CLI Next.js adapter pipeline ran with `--prod --context production`.
  No raw `.next` upload, skipped build or skipped publishing hook was used.
  The deployed Next.js server handler uses adapter `5.16.6` and Node.js 24.
- Source checks: **24 unit tests and 67 browser tests**, build, TypeScript and
  ESLint passed before publication. All 41 original browser tests remain intact.
- Live browser sweep: **35/35** checks across all five routes at 320, 375, 390,
  430, 768, 1024 and 1440px returned HTTP 200, with visible navigation, no
  horizontal overflow and no captured page/console errors. All six navigation
  destinations were checked at each size/route; mobile Escape restored focus.
- Finite hero playback, manual service preview, clickable process stages,
  reduced motion, mobile navigation/calculator, completed demo-to-inquiry
  package selection and native navigation with JavaScript disabled passed.
- A clearly marked QA submission `VN-1689CB10` was read back from the private
  `vonte-inquiries-production` store. UUID, reference, Complete package,
  consent and no-follow-up QA marker matched the browser. No customer record
  was read or deleted. Notifications remain unconfigured; this was not a real
  booking or service request.
- Referenced homepage CSS/JavaScript, sitemap, robots and Open Graph image
  returned HTTP 200. Production canonical metadata uses the live origin.
  `/design-lab`, raw server code, configuration and environment-file paths
  returned HTTP 404.
- The Obsidian identity, exact prices and scripted-preview safety language
  remain. Physical devices/Safari and the originally reported production
  disappearance remain unverified; see `NAVIGATION-AND-MOTION.md` for the
  confirmed failure modes and repair scope.

Evidence is under `/workspace/work/vonte-production-b982464/`. The private QA
object is outside Git. Documentation-only commits record this release and do not
change the deployed application.

The previous production application `5b54b7a`, deploy
`6af2c67c9e988207d831c099`, was published at 2:24 a.m. EST the same day. Its
retained evidence is under `/workspace/work/vonte-production-5b54b7a/`.

## Build and publish

Use Node 24, `npm ci`, and the complete Netlify CLI build pipeline. The automatically
selected Netlify Next.js adapter packages static assets, SSR and Server Actions.

```sh
netlify link --id 32c06496-b748-47d9-9f99-eac0fca21737
netlify deploy --context deploy-preview
# After verifying the preview and with release authorization:
netlify deploy --prod --context production
```

In this managed environment, use `NODE_USE_ENV_PROXY=1` for the CLI while
preserving inherited proxy and CA settings. Without it, the configuration
resolver can fail its network request, fall back to offline resolution and
misreport “Project not found.” The release succeeded after enabling Node's
standard environment-proxy handling; relinking and new credentials were not
needed.

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
