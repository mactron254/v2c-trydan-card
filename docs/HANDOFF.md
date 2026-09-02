# Project handoff

## v0.6.0-beta.1 stabilization - 2026-09-02

- Published prerelease: https://github.com/mactron254/v2c-trydan-card/releases/tag/v0.6.0-beta.1. Stable/latest remains `v0.5.0`; do not promote automatically.
- PR #24 was approved and merged with merge commit `880dc66dd75849e83adbc9197cf5c28f523bd2e5`; its artwork, photographs, WebP layers, vectors, geometry and provenance are preserved.
- PR #25 was reduced to its Catalan change, approved and merged with merge commit `b5e474e4f8ee76d81c2c5f1a57ad462bf8d0ac2d`.
- Stabilization branch: `codex/v0.6.0-beta.1`, created from clean `origin/main`; the earlier local branch and its uncommitted documentation were not modified.
- Public additions: `language: ca`, `charger_art: focus | mid | full` (default `focus`) and `show_connector` (default `false`). Existing YAML remains valid.
- Security decisions: exact writable-role binding, duplicate override rejection, click-time role revalidation, strict `#RRGGBB` accent colors, single-read bundle smoke verification and CI comparison of regenerated `dist`.
- Dependency decisions: Vite 8.2.2, Vitest 4.1.11, `@types/node` 26.4.1, PostCSS 8.5.26 and Undici 7.29.0. Keep jsdom 29.1.1 because jsdom 30 requires Node 22.22.2 and would drop Node 20 support.
- Runtime floor: Node 20.19.0. Because pnpm 11.5.1 itself requires Node 22.13+, CI installs under Node 22.22.2 and then runs the project tools directly under Node 20.19.0. Package manager remains pnpm 11.5.1.
- Release workflow must build the exact beta tag, verify version/tag and committed bundle identity, then publish JavaScript, SHA-256 and provenance as a GitHub prerelease.
- After the stabilization PR is green and alerts are cleared, close #13, #14, #15, #19, #20 and #23 as superseded. Close #17 explaining that Undici was fixed without adopting incompatible jsdom 30.
- Release notes must prominently thank Pere Montpeó (`@pmontp19`) for #21, #22, #24 and #25. Keep issue #21 open for beta reports and post testing instructions there.
- Before publication: full check, full/production audits, clean `dist` comparison, Validate, HACS and security checks green; then download published assets and verify the checksum.
- Local verification completed before the PR: 123 tests, documentation check, build, SHA-256 smoke, full/production audits and `git diff --check` all pass.
- Stabilization PR #26 merged as `330aa59c715486f83297dd38f35d679dc817d910`; Validate, HACS, Security and CodeQL passed on the PR and merged `main`.
- Tag `v0.6.0-beta.1` resolves to that merge. The exact-tag workflow rebuilt it and published JavaScript, SHA-256 and provenance as a prerelease.
- Download verification passed with SHA-256 `1f8bad262325fc010dfe38dc93afd1c7e8aef29fe6261f24944fa88d6c98ae42`; provenance names commit `330aa59c`.
- No pull requests or security alerts remain open. Eight Dependabot alerts, including a later NanoID alert, and all three CodeQL alerts are marked fixed.
- CodeQL #1 referred to generated internal Lit code. Regeneration made GitHub mark it fixed before a dismissal could be applied; its false-positive trace remains documented without suppressing the rule.
- #13, #14, #15, #19, #20 and #23 have supersession notes. #17 was closed because Undici is fixed at 7.29.0 while jsdom 29.1.1 preserves Node 20 support.
- Issue #21 remains open with beta/HACS instructions and the public thanks to Pere.

## Current release

- Current stable target and published release: v0.5.0.
- Status: stable release prepared and published from main on 2026-08-14.
- Release: https://github.com/mactron254/v2c-trydan-card/releases/tag/v0.5.0
- Stack: Lit 3, TypeScript 7, Vite 8, Node 20.19.0+ and pnpm 11.5.1.
- Attribution order: Codex first; Marc @mactron254 second; Pere @pmontp19 third.

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

## Human README voice refresh

- The README now follows Marc’s first-person story: it began with his own Trydan, his dashboard needs and a wish to share a useful card with the community.
- English mirrors that personal voice idiomatically instead of using generic marketing copy.
- Technical facts, official-integration link, support routes, visual assets and safety reminder remain intact.
## README, authorship and community refresh

- English and Spanish README files have full semantic parity, accurate official-integration context and natural Home Assistant/HACS search terminology.
- Marc is the project owner name in all tracked documentation and metadata; future commits use <code>Marc &lt;119014979+mactron254@users.noreply.github.com&gt;</code> as co-author.
- Codex / OpenAI is documented as the main development tool; Marc retains conception, direction, real-device testing and final acceptance.
- README and FAQ include the MIT no-warranty notice, safe-control guidance and routes for Discussions, reproducible Issues and private Security Advisories.
- GitHub Discussions uses the six default categories and a bilingual welcome announcement.
- Card version, bundle, YAML, tag and v0.4.2 release assets remain unchanged.

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

## Beta 0.5.0-beta.1 - 2026-07-19

- Rama: codex/trydan-resilient-discovery-beta.
- El descubrimiento es puro, por device_id V2C, sin callWS ni cache de metadatos.
- Estados: hass.states; acciones: revalidacion V2C antes del servicio; SVG: locales.
- Validado: corepack pnpm typecheck y corepack pnpm test (59/59).
- Publicacion prevista: prerelease v0.5.0-beta.1 y PR borrador a main.

## Beta 0.5.0-beta.2 - 2026-07-19

- Cierra auditoria: diagnosticos, selector registry, overrides externos ausentes, rango number, SVG safety y contrato APIs HA.
- Actions fijadas SHA; Dependabot semanal.
- Validacion local pendiente de publicar: pnpm check y beta.2.

## Stable 0.5.0 - 2026-08-14

- Branch: `codex/trydan-resilient-discovery-beta`; PR: #11.
- Stable tag and release: `v0.5.0`.
- Entity discovery is pure and scoped to the selected V2C `device_id`; live values come from `hass.states`.
- External solar, grid, battery and voltage entities require explicit validated overrides.
- HACS update entities and unrelated devices are ignored.
- SVG assets remain local; no runtime network fetch is used.
- Verification: 75 tests, 120 localized state renders, 1,200 DOM transitions, five repeated suites and full `pnpm check`.
- Issue #12: Italian disconnected regression covered; keep issue open until reporter confirms stable release.
- Continue with pnpm 11.5.1 or newer. Run `corepack pnpm check` before every release.
