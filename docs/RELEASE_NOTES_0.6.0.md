# V2C Trydan Card v0.6.0

V2C Trydan Card v0.6.0 is the stable release of the feature set tested during the 0.6 beta cycle.

This release introduces new layered charger artwork, configurable artwork framing, an optional connector, Catalan language support, stronger entity validation, and additional safeguards for manual controls and custom configuration.

## Highlights

- Added three artwork framing modes: ocus, mid, and ull.
- Added new layered charger artwork based on documented photographic and vector sources.
- Added an optional connector to the charger artwork.
- Added Catalan language support.
- Catalan can be selected manually with language: ca.
- Catalan is detected automatically when Home Assistant uses ca-ES.
- Improved charger states, animations, LCD rendering, and light and dark theme support.
- Strengthened validation for charging current, pause, lock, timer, dynamic modulation, lights, and charging mode controls.
- Manual control overrides now accept only V2C entities with the exact required function.
- Duplicate entity overrides are rejected.
- Writable entity roles are revalidated immediately before each action.
- Custom colours now accept only the #RRGGBB format.
- No public YAML option has been removed.

## Compatibility

This release does not remove any public configuration option. Existing YAML configurations from previous versions remain supported.

The stable version can be installed or updated normally through HACS. Prereleases no longer need to be enabled.

After updating, reload Home Assistant and refresh the browser cache if the previous card version is still displayed.

## Thank you, Pere

Special thanks to **Pere Montpeó** ([@pmontp19](https://github.com/pmontp19)) for initiating the artwork improvements in [#21](https://github.com/mactron254/v2c-trydan-card/issues/21), contributing the refactor in [#22](https://github.com/mactron254/v2c-trydan-card/pull/22), creating the new layered artwork and connector in [#24](https://github.com/mactron254/v2c-trydan-card/pull/24), and adding the Catalan translation in [#25](https://github.com/mactron254/v2c-trydan-card/pull/25).

His photographs, WebP layers, vectors, geometry, and provenance documentation are preserved as part of the project.

## Verification

The release candidate passed 123 automated tests together with the Validate, HACS, Security, and CodeQL checks.

The release includes:

- 2c-trydan-card.js
- Its SHA-256 checksum
- A JSON provenance record generated from the tagged source

## Reporting issues

If you find a problem, please open a GitHub issue and include:

- The affected charger state
- The selected artwork framing mode
- Whether the connector is enabled
- The Home Assistant language and theme
- Clear reproduction steps

Before sharing screenshots or logs, remove entity IDs, locations, SSIDs, IP addresses, tokens, and other personal information.
