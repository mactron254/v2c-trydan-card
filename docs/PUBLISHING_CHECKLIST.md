# v0.4.2 publishing checklist

Evidence date: 2026-07-14.

## Repository and HACS

- [x] Public GitHub repository.
- [x] Clear repository description and enabled issues.
- [x] Searchable Home Assistant, HACS, Lovelace, V2C and EV topics prepared.
- [x] MIT license and contributor order documented.
- [x] `hacs.json` exists with Dashboard filename and minimum HA version.
- [x] Canonical bundle path is `dist/v2c-trydan-card.js` and matches repository name.
- [x] README contains images, usage and HACS My link.
- [x] HACS Action workflow exists with category `plugin` and no ignored checks.
- [ ] HACS Action passes on the merged `main` commit.

## Code quality

- [x] pnpm fixed to 11.5.1 and Node requirement documented.
- [x] TypeScript strict typecheck passes.
- [x] Unit/DOM suite covers defaults, ultra, LCD, 10 languages and 11 states.
- [x] Dependency audit reports no known vulnerabilities.
- [x] Build, SHA-256 generation/verification and smoke test included in `pnpm check`.
- [x] Keyboard, focus, reduced motion, 280/320/400/520/768 px, 200% zoom and accessible labels covered.
- [x] SVG sources contain no embedded language or sample measurements.

## Documentation and media

- [x] English and Spanish README.
- [x] English and Spanish configuration reference.
- [x] English and Spanish FAQ and visual guide.
- [x] 8 density, 4 layout, 10 editor and 11 state screenshots: 33 total.
- [x] Two GIF files below 6 MiB and one 1280×640 social preview.
- [x] English and Spanish forum drafts contain installation, YAML, media and support links.
- [x] Demo media is privacy-safe; real Home Assistant screenshot remains optional.
- [x] Failures register and handoff updated.

## Release

- [ ] PR merged into `main` with CI and HACS green.
- [ ] `v0.4.2` tag points to the merged main commit.
- [ ] Release contains `v2c-trydan-card.js` and SHA-256 checksum.
- [ ] HACS/manual release asset download verified.
- [ ] GitHub release URL recorded in handoff.
- [x] Forum live publication is not applicable: approved scope is release plus drafts only.