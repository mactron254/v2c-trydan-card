# Project handoff

## Current release

- Target: `v0.4.2`.
- Status: published from `main` on 2026-07-14.
- Release: https://github.com/mactron254/v2c-trydan-card/releases/tag/v0.4.2
- Stack: Lit 3, TypeScript 7, Vite 8, Node 20+ and pnpm 11.5.1.
- Attribution: Codex first; Marco `@mactron254` second.

## Delivered in v0.4.2

- Ultra compact without charger artwork; configured value preserved.
- Energy flow disabled by default and explicit opt-in retained.
- Status/metric spacing corrected across densities.
- Canonical text-free SVG collection under `src/assets/trydan`.
- HTML LCD localized in 10 languages for 11 states, using real readings.
- Runtime hardening for missing values, current steps and failed discovery.
- English/Spanish README, configuration, visual guide, FAQ and forum drafts.
- 33 screenshots, 2 GIFs and 1280×640 social preview.
- Headless validation at 280, 320, 400, 520 and 768 px plus 200% zoom.
- Reproducible SHA-256 generation and verification in the standard check.
- HACS Action, issue forms, security policy, changelog and publishing checklist.

## Verification commands

```powershell
corepack pnpm@11.5.1 audit --audit-level moderate
corepack pnpm@11.5.1 check
corepack pnpm@11.5.1 docs:check
corepack pnpm@11.5.1 docs:capture
```

## Publishing

Published evidence:

- PR: https://github.com/mactron254/v2c-trydan-card/pull/3
- Merge commit: `ecb656e1ec1803fd156ce16b64c123608ceac409`.
- CI and official HACS Action: green on merged `main`.
- Release assets downloaded and verified: 190192 bytes.
- SHA-256: `c7fbd646612f2e6a208f8e1d060acea679552671b4aede8d18af79859c7cce5b`.

Original procedure:

1. Push branch and open PR to `main`.
2. Require CI and HACS green.
3. Merge, tag merged commit as `v0.4.2` and attach JS + SHA-256.
4. Update `docs/PUBLISHING_CHECKLIST.md` with release evidence.
5. Forum drafts are ready but must not be posted automatically.

## Privacy-safe real screenshot

Optional future improvement: replace/add one demo image with a 560–720 px dark Home Assistant capture while charging. Remove private location, SSID, IP and entity identifiers.