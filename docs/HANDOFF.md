# Project handoff

## Current release

- Target and published release: v0.4.2.
- Status: published from main on 2026-07-14.
- Release: https://github.com/mactron254/v2c-trydan-card/releases/tag/v0.4.2
- Stack: Lit 3, TypeScript 7, Vite 8, Node 20+ and pnpm 11.5.1.
- Attribution order: Codex first; Marc @mactron254 second.

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
