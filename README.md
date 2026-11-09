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

The contact form validates in the browser and again on the server. A successful submission is written to `data/inquiries/<id>.json`. That directory is gitignored because the files can contain personal information.

This file store is the working destination. The success message is shown only after the file is written. A failed save does not show a confirmation.

Before a public launch, set one of these so a person actually sees new requests:

- Read `data/inquiries` on a server with persistent disk, or
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

Before launch, use a Node server with persistent storage and an operator process to
read inquiries, or configure and verify the webhook/email notifications together
with that persistent storage. A read-only or ephemeral serverless filesystem is not
a durable destination. Rate limiting is bounded but in memory per process; configure
edge protection for a public or multi-instance deployment and ensure the trusted
proxy strips client-supplied forwarding headers. Never put notification secrets in
`NEXT_PUBLIC_` variables. Approve the privacy policy for the actual deployment.

Set the real `NEXT_PUBLIC_SITE_URL` before the production build. With no configured
origin, the sitemap is intentionally empty rather than publishing localhost URLs.
Optional scheduling/contact/phone details remain hidden until configured. Voice,
chat, booking and follow-up examples remain scripted illustrations, not live APIs.
