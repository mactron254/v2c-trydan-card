# V2C Trydan Card

[Español](README.es.md) · [Configuration](docs/CONFIGURATION.md) · [Visual guide](docs/VISUAL_GUIDE.md) · [FAQ](docs/FAQ.md)

[![Release](https://img.shields.io/github/v/release/mactron254/v2c-trydan-card)](https://github.com/mactron254/v2c-trydan-card/releases/latest)
[![CI](https://github.com/mactron254/v2c-trydan-card/actions/workflows/ci.yml/badge.svg)](https://github.com/mactron254/v2c-trydan-card/actions/workflows/ci.yml)
[![HACS](https://github.com/mactron254/v2c-trydan-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/mactron254/v2c-trydan-card/actions/workflows/hacs.yml)
[![License](https://img.shields.io/github/license/mactron254/v2c-trydan-card)](LICENSE)

Modern Home Assistant Lovelace card for V2C Trydan EV chargers. Monitor charging, adjust current, control the charger and build a responsive EV dashboard through a translated visual editor.

> Independent community project. Not affiliated with or endorsed by V2C.

![V2C Trydan Card in split dark layout](docs/screenshots/v042/layout-split-dark.png)

## Why use it?

- Visual editor translated into 10 languages.
- Four densities: XXL, standard, compact and ultra compact.
- Four responsive layouts: automatic, centered, split and inline.
- 11 hardware-inspired charger states with localized LCD text.
- Real power, current, voltage and session energy on the charger display.
- Safe current, pause, lock, timer, dynamic control and lighting actions.
- Device-registry discovery resilient to renamed or translated entities.
- Optional energy-flow summary, disabled by default in v0.4.2.
- Keyboard navigation, visible focus, reduced motion and 280–768 px support.

![Animated tour of V2C Trydan Card densities, layouts and editor](docs/media/trydan-card-tour.gif)

## Install with HACS

[![Open your Home Assistant instance and open V2C Trydan Card in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=mactron254&repository=v2c-trydan-card&category=plugin)

If needed, add `https://github.com/mactron254/v2c-trydan-card` as a custom **Dashboard** repository in HACS. Install it, reload the browser and add the card from the dashboard editor.

## Manual installation

1. Download `v2c-trydan-card.js` from the latest release.
2. Copy it to `/config/www/v2c-trydan-card.js`.
3. Add `/local/v2c-trydan-card.js` as a JavaScript module under Dashboard resources.
4. Reload Home Assistant.

## Minimal configuration

```yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garage_v2c_charger_connected
```

Any entity belonging to the V2C device can be the seed. The card discovers supported entities from stable registry metadata.

Enable the optional energy summary explicitly:

```yaml
show_energy_flow: true
```

Ultra compact mode intentionally hides the charger illustration while preserving `show_charger` for other densities.

## Documentation

- [Complete configuration reference](docs/CONFIGURATION.md)
- [Visual guide: 33 reproducible screenshots](docs/VISUAL_GUIDE.md)
- [FAQ and troubleshooting](docs/FAQ.md)
- [Changelog](CHANGELOG.md)
- [Contribution guide](CONTRIBUTING.md)
- [English forum draft](docs/FORUM_POST_EN.md) · [Spanish forum draft](docs/FORUM_POST_ES.md)

## Development

Requires Node.js 20+ and pnpm 11+. Repository is pinned to pnpm 11.5.1.

```powershell
corepack pnpm@11.5.1 install
corepack pnpm@11.5.1 check
corepack pnpm@11.5.1 docs:capture
```

## Credits and license

Technical collaboration: **Codex**, followed by product owner **Marco** ([@mactron254](https://github.com/mactron254)). See [CONTRIBUTORS.md](CONTRIBUTORS.md).

MIT licensed. See [LICENSE](LICENSE).