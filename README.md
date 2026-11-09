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
