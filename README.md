# ⚡ V2C Trydan Card

[Español](README.es.md) · [Configuration](docs/CONFIGURATION.md) · [Visual guide](docs/VISUAL_GUIDE.md) · [FAQ](docs/FAQ.md)

[![Latest release](https://img.shields.io/github/v/release/mactron254/v2c-trydan-card?label=release)](https://github.com/mactron254/v2c-trydan-card/releases/latest)
[![CI](https://github.com/mactron254/v2c-trydan-card/actions/workflows/ci.yml/badge.svg)](https://github.com/mactron254/v2c-trydan-card/actions/workflows/ci.yml)
[![HACS validation](https://github.com/mactron254/v2c-trydan-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/mactron254/v2c-trydan-card/actions/workflows/hacs.yml)
[![MIT license](https://img.shields.io/github/license/mactron254/v2c-trydan-card)](LICENSE)
[![AI-assisted project](https://img.shields.io/badge/AI_assisted-Codex%20%2F%20OpenAI-412991)](#-made-with-ai)

A modern **Home Assistant V2C Trydan card** for monitoring and controlling an EV charger from Lovelace. It combines a translated visual editor, responsive controls and real charger data in one clear **EV charger dashboard**. Install it through **HACS** or manually as a Lovelace EV charger card.

> Independent community project. Not affiliated with or endorsed by V2C.

![V2C Trydan Card showing the split layout in a dark Home Assistant dashboard](docs/screenshots/v042/layout-split-dark.png)

## ✨ Features

- 🎛️ Monitor charging and control current, pause, lock, timer, dynamic power and lighting.
- 🌍 Use the visual editor and charger LCD in 10 languages.
- 📐 Choose XXL, standard, compact or ultra compact density.
- 🖥️ Switch between automatic, centered, split and inline responsive layouts.
- ⚡ See real power, current, voltage and session energy without invented fallback values.
- ☀️ Enable the optional energy-flow summary when you need it; it is off by default.
- 🔎 Discover entities from Home Assistant device-registry metadata, even after friendly-name changes.
- ♿ Navigate by keyboard with visible focus, reduced motion and support from 280 to 768 px.

## 📐 Four densities

<table>
  <tr>
    <th>XXL</th>
    <th>Standard</th>
    <th>Compact</th>
    <th>Ultra compact</th>
  </tr>
  <tr>
    <td><img src="docs/screenshots/v042/density-xxl-dark.png" width="180" alt="XXL V2C Trydan Card density in dark theme"></td>
    <td><img src="docs/screenshots/v042/density-standard-dark.png" width="180" alt="Standard V2C Trydan Card density in dark theme"></td>
    <td><img src="docs/screenshots/v042/density-compact-dark.png" width="180" alt="Compact V2C Trydan Card density in dark theme"></td>
    <td><img src="docs/screenshots/v042/density-ultra_compact-dark.png" width="180" alt="Ultra compact V2C Trydan Card density without charger artwork"></td>
  </tr>
</table>

Ultra compact keeps the status, readings and essential controls but intentionally hides the charger artwork. See every light/dark comparison in the [visual guide](docs/VISUAL_GUIDE.md#densities).

## 🚗 From no vehicle to charging

![Animated V2C Trydan charger changing from no vehicle to vehicle connected and charging in English](docs/media/vehicle-connection-en.gif)

The localized LCD follows the real sequence: **No vehicle → Vehicle connected → Charging**.

## 🌍 Languages

🇬🇧 English · 🇮🇹 Italiano · 🇩🇪 Deutsch · 🇫🇷 Français · 🇳🇱 Nederlands · 🇸🇪 Svenska · 🇩🇰 Dansk · 🇳🇴 Norsk · 🇷🇴 Română · 🇪🇸 Español

## 💡 Why this project exists

I created V2C Trydan Card as a personal Home Assistant project. While looking for a card for my own Trydan, I could not find a modern, maintained option that gave me the visual monitoring and controls I wanted. I built it for my dashboard and now share it in case it helps other EV owners too.

— Marco ([@mactron254](https://github.com/mactron254))

## 🤖 Made with AI

This project is transparent about how it was made:

- **Marco** conceived the project, set its direction and reviewed the results on a real Trydan setup.
- **Codex / OpenAI** assisted with implementation, tests, documentation and reproducible media.
- Product decisions and final acceptance remain human-directed; AI assistance is documented, not hidden.

See the contributor record in [CONTRIBUTORS.md](CONTRIBUTORS.md).

## 📦 Install with HACS

[![Open your Home Assistant instance and add V2C Trydan Card through HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=mactron254&repository=v2c-trydan-card&category=plugin)

If the repository is not listed yet, add <code>https://github.com/mactron254/v2c-trydan-card</code> as a custom **Dashboard** repository in HACS. Install it, reload the browser and add the card from the dashboard editor.

### Manual installation

1. Download <code>v2c-trydan-card.js</code> from the [latest release](https://github.com/mactron254/v2c-trydan-card/releases/latest).
2. Copy it to <code>/config/www/v2c-trydan-card.js</code>.
3. Add <code>/local/v2c-trydan-card.js</code> as a JavaScript module under Dashboard resources.
4. Reload Home Assistant.

## ⚙️ Configuration

Start with any entity that belongs to the V2C device; the card discovers the supported entities from stable registry metadata.

~~~yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garage_v2c_charger_connected
~~~

The visual editor covers:

- **General:** device, language and primary behavior.
- **Appearance:** theme, density, layout, accent, scale and card radius.
- **Content and order:** visible metrics, data sources and section order.
- **Entities:** automatic discovery or explicit manual mappings.
- **Advanced:** amperage presets, services and optional energy flow.

Enable the energy summary only when wanted:

~~~yaml
show_energy_flow: true
~~~

Existing v0.4.0 YAML remains compatible. Ultra compact preserves <code>show_charger</code> so the illustration returns when another density is selected.

## 📚 Documentation

- [Complete configuration reference](docs/CONFIGURATION.md)
- [Visual guide with 33 reproducible screenshots and four GIFs](docs/VISUAL_GUIDE.md)
- [FAQ and troubleshooting](docs/FAQ.md)
- [Changelog](CHANGELOG.md)
- [Contribution guide](CONTRIBUTING.md)
- [English forum draft](docs/FORUM_POST_EN.md) · [Spanish forum draft](docs/FORUM_POST_ES.md)

## 🧰 Development

Requires Node.js 20+ and pnpm 11+. The repository is pinned to pnpm 11.5.1.

~~~powershell
corepack pnpm@11.5.1 install
corepack pnpm@11.5.1 check
corepack pnpm@11.5.1 docs:capture
~~~

## 📄 Credits and license

Technical collaboration is credited to **Codex**, followed by product owner **Marco** ([@mactron254](https://github.com/mactron254)). Released under the [MIT license](LICENSE).
