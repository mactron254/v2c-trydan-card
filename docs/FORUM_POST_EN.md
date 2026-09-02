# Home Assistant forum reply — v0.6.0-beta.1

- Target: <https://community.home-assistant.io/t/v2c-trydan-card-custom-card-for-home-assistant/1017597>
- Publication mode: reply to the existing topic; do not edit its opening post or create another topic.
- Updated: 2026-09-02

## Reply body

Hi everyone 👋

**V2C Trydan Card v0.6.0-beta.1 is now available as a HACS prerelease for Home Assistant users who want to test the new Trydan EV charger artwork, optional connector, Catalan localization and safer controls. v0.5.0 remains the stable release while the community tests this EV charger dashboard update.**

### What's new in v0.6.0-beta.1?

- Three charger artwork framing modes: `focus` (default), `mid` and `full`.
- An optional connector with `show_connector: true`.
- Catalan with `language: ca`, including automatic `ca-ES` detection and localized decimals.
- More accurate layered artwork, charger LCD geometry and state animations.
- Safer manual controls: exact entity roles, duplicate rejection and click-time revalidation.
- Strict custom colours: only `#RRGGBB` values are accepted.

![Comparison of focus, mid and full charger artwork framing in V2C Trydan Card v0.6.0-beta.1](https://raw.githubusercontent.com/mactron254/v2c-trydan-card/main/docs/artwork/compare-crops.png)

This beta passed **123 automated tests**, plus the Validate, HACS, Security and CodeQL checks.

### How do I install the beta through HACS?

Enable prereleases for the V2C Trydan Card repository, then select `v0.6.0-beta.1`. HACS keeps prereleases disabled by default; see the [official HACS prerelease documentation](https://www.hacs.xyz/docs/use/entities/switch/).

The stable channel remains on `v0.5.0`, and this beta will not be promoted automatically.

### What should beta testers check?

- `focus`, `mid` and `full` on phone, tablet and desktop layouts.
- The connector in light and dark themes.
- Connected, disconnected, charging, paused, completed, timer and error states.
- Catalan selected manually and automatically from Home Assistant `ca-ES`.
- Current, pause, lock, timer, dynamic modulation, lights and charging mode controls.
- Existing YAML configurations; no public option was removed.

### Where should I report feedback?

Please use [GitHub issue #21](https://github.com/mactron254/v2c-trydan-card/issues/21). Include your Home Assistant version, browser or device, selected framing mode, charger state and exact reproduction steps. Remove private entity IDs, locations, SSIDs, IP addresses, tokens and personal data from screenshots or logs.

### Community credit

Special thanks to **Pere Montpeó** ([@pmontp19](https://github.com/pmontp19)) for #21, #22, #24 and #25: the SVG refactor, layered artwork, connector, photographs, WebP layers, vectors, geometry, provenance research and Catalan translation.

V2C Trydan Card is an independent community project. It uses entities from the [official Home Assistant V2C integration](https://www.home-assistant.io/integrations/v2c/) and is not affiliated with or endorsed by V2C.

- [Download v0.6.0-beta.1](https://github.com/mactron254/v2c-trydan-card/releases/tag/v0.6.0-beta.1)
- [Repository and documentation](https://github.com/mactron254/v2c-trydan-card)
