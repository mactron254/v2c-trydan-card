# Changelog

All notable changes are documented here. Versions follow semantic versioning.

## [Unreleased]

### Documentation

- Publish canonical English notes for `v0.6.0-beta.1`, prepare an SEO/GEO-focused Home Assistant forum reply with prominent community credit, and refresh the agent-readable release and language facts.

## [0.6.0-beta.1] - 2026-09-02

### Added

- Add `language: ca`, Catalan auto-detection through `ca-ES`, localized editor/LCD copy and locale-aware decimal formatting.
- Add `charger_art: focus | mid | full` and `show_connector`, with `focus` and `false` as compatible defaults.
- Add layered WebP/vector charger artwork, framing geometry, connector states and documented source provenance contributed by Pere Montpeó.
- Add release provenance metadata and an exact-tag prerelease workflow that publishes the JavaScript, SHA-256 and provenance record.

### Changed

- Consolidate the community artwork into a single state-driven SVG using `currentColor`, `data-state` and CSS animations.
- Require Node.js 20.19.0 or newer and verify Node.js 20.19.0 and 22.22.2 in CI.
- Update Vite to 8.2.2, Vitest to 4.1.11, `@types/node` to 26.4.1, PostCSS to 8.5.26 and Undici to 7.29.0 while retaining jsdom 29.1.1 for Node 20 support.
- Update GitHub Actions to reviewed immutable SHAs.

### Fixed

- Correct Catalan labels, decimal locale and `language: auto` handling in the visual editor.
- Read the built bundle once during smoke verification, eliminating time-of-check/time-of-use races.
- Normalize editor `accent_color` values before they can reach inline CSS.

### Security

- Bind every writable override to its exact V2C role, reject duplicate mappings and revalidate role metadata immediately before a Home Assistant service call.
- Compare regenerated release artifacts with committed `dist` files in CI.

### Tests

- Add regression coverage for Catalan, automatic language, decimal separators, cross-role controls, CSS colors, artwork layers, connector behavior, LCD output and visual `data-state` contracts.

### Documentation

- Thank Pere Montpeó ([@pmontp19](https://github.com/pmontp19)) for issue #21 and PRs #22, #24 and #25.
- Document beta installation in HACS, artwork provenance, security boundaries, publication checks and community testing.
- Include the post-v0.5.0 bilingual README, FAQ, media and community documentation refresh.

## [0.5.0] - 2026-08-14

### Changed

- Discover V2C entities by device-scoped registry metadata and official translation keys while keeping explicit legacy suffix fallbacks.
- Read live values from watched `hass.states` entries without periodic discovery or metadata caches.
- Accept manual external voltage only with a compatible sensor state, unit and device class.

### Fixed

- Keep the main status and charger LCD consistently unavailable when core Trydan entities are unavailable.
- Cover the Italian disconnected regression so `off` renders `Nessun veicolo`, never a connected label.
- Recognize current Home Assistant English entity IDs for photovoltaic power and session controls.

### Security

- Revalidate writable targets against the active V2C device before service calls.
- Ignore unrelated global and HACS update entities during discovery.

### Tests

- Add an exact Home Assistant 2026.7 fixture for all 22 supplied entities.
- Cover 120 language/state renders, 1,200 live DOM transitions, external energy conventions and disabled controls.
- Pass 75 automated tests, repeated full suites, typecheck, documentation, build, checksum and smoke verification.

## [0.5.0-beta.4] - 2026-07-19

### Fixed

- Restore editor CSS parsing and replace control glyphs with ASCII HTML entities.
- Add regression coverage for Unicode replacement characters in editor controls.

## [0.5.0-beta.3] - 2026-07-19

### Fixed

- Repair UTF-8 mojibake in visual editor labels, disclosure mark and ordering controls.

## [0.5.0-beta.2] - 2026-07-19

### Fixed

- Reject missing external power overrides and invalid number ranges before service calls.
- Add seed/loading/legacy diagnostics and registry-backed editor entity choices.
- Pin CI actions by SHA and enable Dependabot updates.

### Tests

- Add Home Assistant API-contract, SVG safety and resolver regression coverage.

## [0.5.0-beta.1] - 2026-07-19

### Changed

- Replace global, cache-based entity discovery with a pure registry resolver scoped to the selected V2C device.
- Render only when watched live entity states or relevant registry/localization references change.

### Added

- Validated external energy overrides, translation-key preference, ambiguity reporting, local SVG asset policy and safe action target checks.
- Home Assistant grid-size hint and V2C-only entity suggestion metadata.

### Security

- Writable entities are revalidated against the current V2C registry entry immediately before a service call.

## [0.4.2] - 2026-07-14

### Fixed

- Ultra compact no longer renders charger artwork.
- Energy flow now defaults to disabled and remains available as an explicit opt-in.
- Main status sits closer to the charger with safe spacing before metrics.
- Missing measurements no longer format as zero.
- Current steps are calculated relative to the entity minimum.
- Failed registry discovery no longer creates an unhandled promise rejection.

### Added

- Localized LCD in 10 languages for all 11 visual states.
- Real charging power, current, voltage and completed-session energy on the LCD.
- Bilingual README, configuration, FAQ, visual guide and forum drafts.
- 33 reproducible screenshots, two GIFs and social preview.
- HACS validation workflow, security policy and issue forms.
- Reproducible release checksum and documentation/media integrity check.

## [0.4.1] - 2026-07-13

- Fully translated visual editor, real layouts, XXL density, color picker, chips, ordering controls and 14 screenshots.

## [0.4.0] - 2026-07-13

- Personalization schema, four densities, layouts, color schemes, metrics, sources and section ordering.
