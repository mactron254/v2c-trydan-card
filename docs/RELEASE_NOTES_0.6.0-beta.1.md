# v0.6.0-beta.1 — community beta

This is a prerelease. `v0.5.0` remains the stable version, and there will be no automatic promotion to `v0.6.0` until community testing is complete.

## Thank you, Pere

Special thanks to **Pere Montpeó** ([@pmontp19](https://github.com/pmontp19)) for starting the improvement in #21 and contributing the #22 refactor, the new layered artwork and connector in #24, and the Catalan translation in #25. His photographs, WebP layers, vectors, geometry and provenance documentation are preserved in this beta.

## What to test

- The `focus`, `mid` and `full` artwork framing modes, with and without the connector.
- Every charger state, animation, LCD screen, and light and dark theme.
- Catalan selected manually with `language: ca` and automatically when Home Assistant uses `ca-ES`.
- Charging current, pause, lock, timer, dynamic modulation, lights and charging mode controls.
- Existing YAML configurations: no public option has been removed.

Manual controls now accept only a V2C entity with the exact required function, reject duplicate overrides and revalidate the role when clicked. Custom colours accept only `#RRGGBB`.

## Install through HACS

Enable prereleases for this repository and select `v0.6.0-beta.1`. HACS keeps prereleases disabled by default; see the [official HACS documentation](https://www.hacs.xyz/docs/use/entities/switch/).

## Verification

The tagged build passed 123 automated tests together with the Validate, HACS, Security and CodeQL checks.

If you find a problem, add the reproduction steps and tested state to [issue #21](https://github.com/mactron254/v2c-trydan-card/issues/21). Remove entity IDs, locations, SSIDs, IP addresses, tokens and personal data before sharing screenshots or logs.

The release includes `v2c-trydan-card.js`, its SHA-256 checksum and a JSON provenance record generated from the exact tagged commit.
