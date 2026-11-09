# VONTE

Marketing site for VONTE, an AI automation agency for appointment-driven service businesses. The site explains the receptionist, lead follow-up, and website packages, shows the published prices, and accepts consultation requests.

Prices and package scope come from the VONTE executive plan (October 2026). Internal forecasts, margins, and operating costs are not published here.

## Run locally

```bash
npm install
npm run dev
```

The dev server runs at [http://127.0.0.1:3847](http://127.0.0.1:3847).

## Scripts

- `npm run dev` — local development
- `npm run test` — pricing, calculator, and inquiry checks
- `npm run typecheck` — TypeScript
- `npm run lint` — ESLint
- `npm run build` — production build
- `npm run start` — production server on port 3847

## Consultation requests

The contact form validates in the browser and again on the server. On Netlify, `INQUIRY_STORAGE=netlify-blobs` stores each inquiry as a private JSON document in Netlify Blobs. Production uses `vonte-inquiries-production`; preview deploys use `vonte-inquiries-preview`. The store namespace is fixed at build time from the Netlify deploy context. Locally, the default remains `data/inquiries/<id>.json`, which is gitignored because records can contain personal information.

Success is shown only after the selected storage provider confirms a write. A failed save never shows a confirmation. Records are create-only, so retries reuse the original reference. Netlify records survive redeploys and can be browsed by the site owner under **Data & Storage → Blobs**; no public inquiry-read API is exposed.

Assign an operator to review the Netlify inquiry store (or local records on a persistent Node host). Optional notifications can also be configured:

- Set `INQUIRY_WEBHOOK_URL` (and optional `INQUIRY_WEBHOOK_SECRET`) to receive the JSON record, or
- Set `RESEND_API_KEY`, `INQUIRY_FROM_EMAIL`, and `INQUIRY_NOTIFY_EMAIL` together. `INQUIRY_FROM_EMAIL` must be a sender Resend has verified.

If a notification channel is configured and it fails, the inquiry stays saved and the visitor sees the reference code instead of a clean success.

Copy `.env.example` to `.env.local` and fill in only the values you actually have.

## Configuration that stays empty until it is real

| Variable | Effect when set |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URLs, sitemap host, Open Graph origin |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Shown in the footer |
| `NEXT_PUBLIC_CONTACT_PHONE` | Shown in the footer |
| `NEXT_PUBLIC_SCHEDULING_URL` | “Book a Strategy Call” opens this page |
| `NEXT_PUBLIC_VOICE_DEMO_NUMBER` | The product example links to this number |

Do not invent a domain, inbox, phone number, office, or scheduling link. The form remains the consultation path while those values are blank. Submitting the form does not reserve a meeting.

## What this site does not include

No live phone agent, no booking calendar, and no customer activity feed. Product visuals and the interactive demo are labeled as examples. The ROI calculator is an illustration, not a forecast.

## Verification and delivery notes

The audit and implementation report are in `docs/`. Browser regression tests use
Playwright and axe-core against a production build:

```bash
npm ci
npm test
npm run lint
npm run build
npm run typecheck
npx playwright install chromium
npm run test:e2e
```

The browser suite runs a separate local server on port 3850, clears notification
configuration, and saves synthetic inquiries under gitignored `test-results/`.
It uses `/usr/bin/chromium` when available; otherwise it uses Playwright's browser.
You can also set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` explicitly.

Inquiry submissions carry a server-generated request token. Concurrent retries of
the same rendered form atomically reuse the saved reference and do not notify twice.
An altered request with an already-used token returns the original reference and
explains that a previous version is saved. Reloading the form starts a new request.
Files are created with owner-only permissions. Publishing a complete file uses an
atomic hard link within the configured directory, so the storage volume must support
hard links. Notifications are attempted after persistence; there is no background
notification retry worker. Notification failures require operator follow-up.

On Netlify, use the configured private Blobs store and an operator process to review
inquiries. On other Node hosts, provide persistent storage and an operator process
or verified notifications. A read-only or ephemeral serverless filesystem is not
a durable destination for the local-file backend. Rate limiting is bounded but in memory per process; configure
edge protection for a public or multi-instance deployment and ensure the trusted
proxy strips client-supplied forwarding headers. Never put notification secrets in
`NEXT_PUBLIC_` variables. Approve the privacy policy for the actual deployment.

Set the real `NEXT_PUBLIC_SITE_URL` before the production build. With no configured
origin, the sitemap is intentionally empty rather than publishing localhost URLs.
Optional scheduling/contact/phone details remain hidden until configured. Voice,
chat, booking and follow-up examples remain scripted illustrations, not live APIs.

## Netlify hosting

The existing project is `vonte-ai` (site ID `32c06496-b748-47d9-9f99-eac0fca21737`).
`netlify.toml` selects the Next.js build and `.next` output; Netlify's automatically
updated OpenNext adapter prepares SSR and Server Actions. `.netlify/` is gitignored
and must never be uploaded as source or committed; CLI link state and generated
build artifacts live there.

Set `NEXT_PUBLIC_SITE_URL=https://vonte-ai.netlify.app` and
`INQUIRY_STORAGE=netlify-blobs` in Netlify environment variables with runtime access.
Use `deploy-preview` and `production` build contexts explicitly when uploading, so
preview inquiry tests stay isolated from production documents. Do not replace the
adapter routing with an SPA catch-all. Do not upload raw `.next` files as a static
site: the inquiry action requires the adapter's generated server function.

Use the complete CLI build-and-deploy flow (`netlify deploy --context deploy-preview`
for a preview; `netlify deploy --prod --context production` for a release). The
framework adapter's publishing hooks must run; do not use `--no-build` to upload a
previously prepared `.next` directory. See `docs/NETLIFY-DEPLOYMENT.md` for operations.

Netlify inquiry storage needs no personal API token in frontend code. Runtime Blobs
credentials are injected by Netlify. No email/SMS notification provider is enabled
until the owner supplies verified configuration and authorizes a delivery test.
