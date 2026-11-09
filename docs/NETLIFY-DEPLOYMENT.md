# Netlify deployment and operations

Project: `vonte-ai` (`32c06496-b748-47d9-9f99-eac0fca21737`).
Production address: https://vonte-ai.netlify.app.
Dashboard: https://app.netlify.com/projects/vonte-ai.

This release uses an authenticated manual CLI upload. Git continuous deployment is
not connected, and source changes have not been pushed to GitHub.

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

The project uses the Free account's existing features. No paid provider was
enabled. Phone/chat/booking product examples remain clearly labeled simulations.
