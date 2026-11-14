# V2C Trydan Card v0.6.1

V2C Trydan Card v0.6.1 is a maintenance release. It contains no new features, no behaviour changes and no configuration changes. The card source code (`src/`) is identical to v0.6.0.

## What changed

### Build tooling and security advisories

`pnpm audit` reported advisories in development and build dependencies. None of them were in code shipped to Home Assistant: the production audit (`pnpm audit --prod`) was already clean in v0.6.0, and the only runtime dependency, Lit 3.3.3, is unchanged.

| Package | v0.6.0 | v0.6.1 | Role |
| --- | --- | --- | --- |
| `vite` | 8.2.2 | 8.3.8 | Bundler and dev server |
| `vitest` | 4.1.11 | 4.1.12 | Test runner |
| `undici` (override) | 7.29.0 | 7.30.1 | Transitive, test tooling |
| `source-map-js` | 1.2.1 | 1.2.2 | Transitive, test tooling |
| `@types/node` | 26.4.1 | 26.6.6 | Type definitions |

After these updates both `pnpm audit --audit-level moderate` and `pnpm audit --prod` report no known vulnerabilities.

### The published bundle

`v2c-trydan-card.js` was rebuilt with the newer bundler, so its bytes and SHA-256 differ from v0.6.0 even though the source is the same:

- Size: 199,325 bytes in v0.6.0, 198,830 bytes in v0.6.1.
- Module marker comments changed format (`//#region …` became `// …`).
- Five minified expressions were rewritten by the bundler into logically equivalent forms, for example `if (!(e === null || !Number.isFinite(e)))` became `if (e !== null && Number.isFinite(e))`.

No other differences exist between the two bundles.

### Repository automation

These changes do not affect the card, but they change how the project is maintained:

- Dependabot now groups minor and patch updates into one pull request per ecosystem and waits three days after a version is published before proposing it.
- Patch and minor Dependabot pull requests are merged automatically once every required check passes. Major updates still require manual review.
- A workflow rebuilds `dist/` on Dependabot branches when an update changes the bundle. This path has not yet been exercised by a real update.
- The `main` branch now requires the Validate, Security and HACS checks before a pull request can merge.
- GitHub Actions updated: `pnpm/action-setup` 6.0.10 to 6.1.1 and `actions/setup-node` 7.0.0 to 7.1.0.
- Major updates of `jsdom` (30) and `vitest` (5) are deliberately held back because they require Node 22 and the project still supports Node 20.19.

## Compatibility

No public YAML option was added, changed or removed. Existing configurations keep working without edits. The minimum Home Assistant version remains 2024.1.0.

Update normally through HACS. If the previous version is still displayed afterwards, refresh the browser cache.

## Verification

- 123 automated tests pass, together with the TypeScript check, documentation check, production build and smoke test.
- The release workflow rebuilds the bundle from the tagged commit and fails if it does not match the committed file.
- The release includes `v2c-trydan-card.js`, its SHA-256 checksum and a JSON provenance record generated from the tagged source.

## Disclosure

The dependency updates, the automation and these notes were prepared with an AI coding assistant (Claude Code) at the maintainer's request, and reviewed through pull requests [#54](https://github.com/mactron254/v2c-trydan-card/pull/54), [#55](https://github.com/mactron254/v2c-trydan-card/pull/55) and [#56](https://github.com/mactron254/v2c-trydan-card/pull/56). #55 and #56 were opened by Dependabot and merged automatically after passing CI.

## Reporting issues

If you find a problem, please open a GitHub issue with clear reproduction steps. Before sharing screenshots or logs, remove entity IDs, locations, SSIDs, IP addresses, tokens and other personal information.
