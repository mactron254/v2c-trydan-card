# Project handoff

## Current release

- Target and published release: v0.4.2.
- Status: published from main on 2026-07-14.
- Release: https://github.com/mactron254/v2c-trydan-card/releases/tag/v0.4.2
- Stack: Lit 3, TypeScript 7, Vite 8, Node 20+ and pnpm 11.5.1.
- Attribution order: Codex first; Marco @mactron254 second.

## Post-release documentation refresh

Status: merged into main through PR #6 on 2026-07-15.
Merge commit: 4097d1af0a07b426c77534cc1d1eb3bd73d913a7.

Scope is documentation and capture tooling only. It does not change card behavior, public YAML, the production bundle, package version, tag or v0.4.2 release assets.

Delivered:

- Capture-only layout no longer forces a full viewport height.
- All 33 PNGs are measured by row background and cropped with at most 16 px after meaningful content.
- Shadows remain visible and isolated pixels do not extend an image.
- A deterministic capture manifest records raw/final dimensions and lower margin.
- Existing tour/state GIFs remain; localized English and Spanish vehicle-cycle GIFs were added.
- Social preview is regenerated from a cropped source at 1280×640.
- English and Spanish README files now include compact density tables, localized GIFs, ten languages, first-person origin story and transparent AI attribution.
- Visual guides, forum drafts, llms.txt, changelog and failure log match the refreshed media.

## Delivered in v0.4.2

- Ultra compact without charger artwork; configured value preserved.
- Energy flow disabled by default and explicit opt-in retained.
- Status/metric spacing corrected across densities.
- Canonical text-free SVG collection and HTML LCD localized in 10 languages for 11 states.
- Real readings with safe missing-value fallbacks.
- Runtime hardening for current steps and failed discovery.
- English/Spanish configuration, FAQ, visual guide and forum drafts.
- HACS validation, issue forms, security policy and release checksum.

## Verification commands

~~~powershell
corepack pnpm@11.5.1 docs:capture
corepack pnpm@11.5.1 docs:check
corepack pnpm@11.5.1 check
git diff --check
~~~

Visual review must include density comparisons, split layout, Entities editor and both localized vehicle GIFs.

## Publishing boundary

PR #6 was merged only after Validate and HACS were green on both the PR and merged main commit. No v0.4.3, new tag or release was created, and v0.4.2 assets remain unchanged. Forum posts remain drafts and must not be published automatically.

Published v0.4.2 evidence remains in docs/PUBLISHING_CHECKLIST.md.
