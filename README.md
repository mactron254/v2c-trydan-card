# ⚡ V2C Trydan Card

[Español](README.es.md) · [Configuration](docs/CONFIGURATION.md) · [Visual guide](docs/VISUAL_GUIDE.md) · [FAQ](docs/FAQ.md)

[![Latest release](https://img.shields.io/github/v/release/mactron254/v2c-trydan-card?label=release)](https://github.com/mactron254/v2c-trydan-card/releases/latest)
[![CI](https://github.com/mactron254/v2c-trydan-card/actions/workflows/ci.yml/badge.svg)](https://github.com/mactron254/v2c-trydan-card/actions/workflows/ci.yml)
[![HACS validation](https://github.com/mactron254/v2c-trydan-card/actions/workflows/hacs.yml/badge.svg)](https://github.com/mactron254/v2c-trydan-card/actions/workflows/hacs.yml)
[![MIT license](https://img.shields.io/github/license/mactron254/v2c-trydan-card)](LICENSE)
[![AI-assisted project](https://img.shields.io/badge/AI_assisted-Codex%20%2F%20OpenAI-412991)](#-made-with-ai)

A modern **Home Assistant V2C Trydan card** for monitoring and controlling a Trydan EV charger from Lovelace. It uses entities exposed by the [official Home Assistant V2C integration](https://www.home-assistant.io/integrations/v2c/) and combines a translated visual editor, responsive controls and real charger readings in one clear **EV charger dashboard**. Install it through **HACS** or manually as a Lovelace EV charger card.

> This is an independent community project. It is not affiliated with or endorsed by V2C, and it does not replace the official Home Assistant integration.
>
> ⚠️ **Use at your own risk.** This community software is provided without warranties. Review every entity mapping and test charger controls safely before relying on them. To the extent permitted by law, the authors and contributors are not liable for damage, loss, interruption or unexpected behaviour. See the [MIT license](LICENSE).

![V2C Trydan Card showing the split layout in a dark Home Assistant dashboard](docs/screenshots/v042/layout-split-dark.png)

## ✨ Features

- 🎛️ Monitor charging and control current, pause, lock, timer, dynamic power and lighting.
- 🌍 Use the visual editor and localized charger LCD in 10 languages.
- 📐 Choose XXL, standard, compact or ultra compact density.
- 🖥️ Switch between automatic, centered, split and inline responsive layouts.
- ⚡ Show real power, current, voltage and session energy when valid entities provide those readings.
- ☀️ Enable the optional energy-flow summary when needed; it is off by default.
- 🔎 Discover entities through Home Assistant device-registry metadata, even after friendly-name changes.
- 🎨 Select predefined colour schemes or define a synchronized custom HEX colour.
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

Ultra compact keeps status, readings and essential controls but intentionally hides the charger artwork. See every light/dark comparison in the [visual guide](docs/VISUAL_GUIDE.md#densities).

## 🚗 From no vehicle to charging

![Animated V2C Trydan charger changing from no vehicle to vehicle connected and charging in English](docs/media/vehicle-connection-en.gif)

The localized LCD follows the real sequence: **No vehicle → Vehicle connected → Charging**.

## 🌍 Languages

🇬🇧 English · 🇮🇹 Italiano · 🇩🇪 Deutsch · 🇫🇷 Français · 🇳🇱 Nederlands · 🇸🇪 Svenska · 🇩🇰 Dansk · 🇳🇴 Norsk · 🇷🇴 Română · 🇪🇸 Español

## 💡 Why this project exists

I created V2C Trydan Card as a personal Home Assistant project. When I looked for a generic EV charger card for my own Trydan, the options I found either did not cover the visual monitoring and controls I needed or appeared to be outdated. With AI assistance, I built a card for my dashboard that lets me monitor and control the charger clearly. Now that it works in my setup, I am sharing it in case it helps other EV owners too.

— Marc ([@mactron254](https://github.com/mactron254))

## 🤖 Made with AI

This project is transparent about how it was made:

- **Marc** conceived the project, set its direction, tested it on a real Trydan installation and makes the final acceptance decisions.
- **Codex / OpenAI** has been the main development tool, turning Marc's requirements into implementation, tests, documentation and reproducible media.
- The product remains human-directed: AI assistance is documented rather than hidden.

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

Start with any entity that belongs to the V2C device. The card discovers supported roles through stable device-registry metadata.

~~~yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garage_v2c_charger_connected
~~~

The visual editor covers:

- **General:** device, language and primary behaviour.
- **Appearance:** theme, density, layout, accent, scale and card radius.
- **Content and order:** visible metrics, data sources and section order.
- **Entities:** device-registry discovery or explicit manual mappings.
- **Advanced:** amperage presets, services and optional energy flow.

Enable the energy summary only when wanted:

~~~yaml
show_energy_flow: true
~~~

Existing v0.4.0 YAML remains compatible. Ultra compact preserves <code>show_charger</code> so the illustration returns when another density is selected.

## 💬 Community, feedback and support

- Use [GitHub Discussions](https://github.com/mactron254/v2c-trydan-card/discussions) for ideas, questions, polls and dashboard examples.
- Open an [Issue](https://github.com/mactron254/v2c-trydan-card/issues/new?template=bug_report.yml) for a reproducible bug. Mature ideas from Discussions can later become Issues.
- Report vulnerabilities privately through [GitHub Security Advisories](https://github.com/mactron254/v2c-trydan-card/security/advisories/new).

Feedback, feature suggestions and corrections are welcome. Remove entity IDs, locations, SSIDs, private IP addresses, tokens and other personal data before sharing logs or screenshots.

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

Technical collaboration is credited to **Codex**, followed by product owner **Marc** ([@mactron254](https://github.com/mactron254)). Released under the [MIT license](LICENSE).
