# Official VONTE wordmark integration

This is a targeted logo update on `brand/official-wordmark`, based on the company
production source `136624a58d1298b8efde53fc3241b1dd5a16e8f7`. It does not redesign
the site, alter pricing, change inquiry storage or change deployment settings.

## Source and production asset

The owner's ZIP supplied a clean 1376 × 768 RGB PNG. Its SHA-256 is
`0fdaa30239ed2a4f6da375c8c36aad1d1e5062c8952f267280f8ee8ed4d8b1fe`.
The visible lettering and registered mark occupy source bounds
`[248, 336, 1180, 408)` including faint antialiased edge pixels.

`public/brand/vonte-wordmark-white.png` is a 956 × 96 transparent PNG, 13,002 bytes.
The source was cropped without resampling and given 12 transparent pixels of
padding on each side. Source luminance becomes the alpha of white foreground
pixels; values of 8/255 or less are discarded as near-black canvas noise.
This preserves letter contours, relative positions, spacing and the registered
mark. Compositing the extracted crop on black differs from the source by at most
9/255 per channel. No font reconstruction or approximate vector tracing is used.

The raster supplies more than enough pixels for 2×/3× header and footer use. The
social image uses it below its native width. It is not an infinitely scalable
vector; obtain the original vector master before materially enlarging it further.

## Brand placements

- `src/components/wordmark.tsx` is the one primary web-logo renderer. It uses a
  static Next.js image import, intrinsic proportions, white artwork, accessible
  `alt="VONTE"`, and header/menu/footer size variants. The PNG is served without
  lossy re-encoding. Its content-hashed static filename handles browser caching.
- Existing header and mobile-menu markup use that component. Header height,
  navigation breakpoints, sticky positioning and the menu implementation stay intact.
- The footer uses the same artwork, with an optional homepage link and a
  44px minimum touch target. The logo remains proportional inside the link.
- `src/app/opengraph-image.tsx` embeds the same PNG into its existing 1200 × 630
  social layout using Next.js's documented local-image/data-URI method.
- Existing square V favicon and Apple icon are retained as distinct technical
  variants. The wide wordmark is never squeezed into a square.
- Ordinary VONTE copy, headings, product illustrations, legal text, service
  descriptions and the development-only design lab are not replaced.
- No PWA manifest, email-template logo or additional loading-screen logo was found.

## Verification and review

Focused Playwright checks in `tests/browser/wordmark.spec.ts` cover all five primary
routes at 320, 375, 390, 430, 768, 1024 and 1440 pixels. They verify logo loading,
accessible names, correct proportions, unchanged header height, desktop menu,
mobile menu open/close and focus return, footer display/home navigation, no
overflow, and no failed image requests or page errors. A canvas check verifies
transparent padding, white lettering and the registered-mark pixels. Social
image and existing icon routes must remain valid PNG responses.

Run the repository's checks:

```bash
npm ci
npm test
npm run lint
npm run build
npm run typecheck
npm run test:e2e
```

For local review, run `npm run start` after building and open
`http://127.0.0.1:3847`. Inspect the homepage header, open mobile menu, footer,
Services page, `/opengraph-image`, `/icon` and `/apple-icon`. Local screenshots
and a source-versus-transparent-asset comparison are retained in the task's
`work/logo-qa/` directory. Source comparison should be inspected on black,
checkerboard and Obsidian surfaces.

The existing regression suite remains unchanged. It checks navigation, pricing,
package selection, local inquiry persistence and error handling, ROI, demos,
workflow, animation, reduced motion and accessibility. Test inquiry data remains
local; no production inquiry or account configuration is modified by this update.

Verified locally on 2026-11-16:

- Build, typecheck and lint passed.
- All 28 unit tests and all 80 browser tests passed (71 existing plus 9 logo checks).
- A separate rendered review checked all five routes at seven widths: 35 route/
  viewport combinations, no horizontal overflow and no page errors.
- Eighteen screenshots were captured. The source comparison, desktop/mobile
  headers, open mobile menu, desktop/mobile footers, secondary page and social
  artwork were visually inspected. The extraction preserves the source geometry
  and has no baked black rectangle, visible halo, clipping or stretched letters.
- The existing touch-target test caught the new footer link's initial small
  height. A 44px minimum corrected it; the complete suite then passed unchanged.
- The changed text files were reviewed and scanned for common credential
  patterns; no credentials were found. No dependencies were added.
- Read-only Netlify checks confirmed that both published deploy IDs remained
  unchanged: company `6af8d2649a6348f87a4a16a8`, personal
  `6af2f58d98606cdf12363438`.

## Deployment gate

No push, PR, merge or deploy is authorized by the branding request. After local
review and passing tests, obtain approval to push this feature branch and create
a company Deploy Preview. Production merge/deployment requires explicit approval.
Use the existing Git-based workflow for company project `vonte`, site
`5b55d061-0385-44d0-bbf5-19839d084818`, in the Vonte AI team. Never use the personal
site `32c06496-b748-47d9-9f99-eac0fca21737` as a deployment target. No local
`.netlify` binding is needed. Review actual current company environment settings
without changing them; the primary company domain is currently reported as
`vonteai.com`, with `vonte.netlify.app` retained as the stated review alias.

After an approved deploy, confirm the published commit and new hashed PNG on the
live company site, repeat desktop/mobile navigation and contact checks, and
confirm the personal site's published deployment remains unchanged.
