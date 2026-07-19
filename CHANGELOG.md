# Changelog

All notable changes are documented here. Versions follow semantic versioning.

## [Unreleased]

### Documentation

- Polish both README files with complete bilingual parity, the official Home Assistant V2C integration relationship and natural search terminology.
- Restore Marc's first-person project story and human tone in both README files while preserving accurate links and support guidance.
- Add a visible no-warranty notice, expanded bilingual FAQ and clear routes for Discussions, reproducible Issues and private security reports.
- Correct the project owner name to Marc across every tracked document and metadata file.
- Enable GitHub Discussions with the six default community categories and a bilingual welcome announcement.
- Automatically crop all 33 screenshots while preserving shadows and a maximum 16 px lower margin.
- Add a deterministic capture manifest and synthetic light/dark crop checks.
- Add English and Spanish vehicle-cycle GIFs while retaining the existing tour and state animations.
- Redesign both README files with compact density comparisons, localized media, ten-language list, project story and transparent AI attribution.
- Refresh visual guides, forum drafts, machine-readable project context, failure log and handoff.
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