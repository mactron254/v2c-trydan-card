# v0.5.0 publishing checklist

Evidence date: 2026-08-14.

## Release candidate

- [x] pnpm 11.5.1 selected.
- [x] Home Assistant 2026.7 fixture contains all 22 supplied entity IDs.
- [x] Registry, legacy fallback and external measurement validation covered.
- [x] Ten languages cover eleven visual states plus unavailable.
- [x] 1,200 live DOM state transitions pass.
- [x] Unavailable controls cannot call Home Assistant services.
- [x] External voltage requires compatible numeric state, unit and device class.
- [x] SVG artwork remains local and text-free.
- [x] TypeScript, documentation, bundle, checksum and smoke checks pass.
- [x] Failure register and handoff updated.

## Publication

- [x] PR #11 merged into `main` after Validate and HACS pass.
- [x] Tag `v0.5.0` targets merged `main`.
- [x] Release is stable, not prerelease.
- [x] `v2c-trydan-card.js` and SHA-256 checksum attached.
- [x] Published assets downloaded and verified.
- [x] GitHub latest release reports `v0.5.0`.
- [x] Issue #12 receives release evidence and remains open for reporter confirmation.
