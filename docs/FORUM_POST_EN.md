# Forum draft — English

## Suggested title

**⚡ V2C Trydan Card — multilingual visual control for a Trydan EV charger**

## Category and tags

Share your Projects! → Dashboards & Frontend
Tags: lovelace, cards, hacs, ev-charging, v2c

## Post body

Hi Home Assistant community 👋

I created **V2C Trydan Card** as a personal project for my own charger. While looking for a Trydan card, I could not find a modern, maintained option that offered the visual monitoring and controls I wanted. I built one for my dashboard and am sharing it in case it helps other EV owners too.

It is an independent community project and is not affiliated with or endorsed by V2C.

![V2C Trydan changing from no vehicle to connected and charging](https://raw.githubusercontent.com/mactron254/v2c-trydan-card/main/docs/media/vehicle-connection-en.gif)

### ✨ Features

- 🎛️ Current, presets, pause, lock, timer, dynamic control and lights.
- 🌍 Visual editor and charger LCD translated into 10 languages.
- 📐 XXL, standard, compact and ultra compact densities.
- 🖥️ Automatic, centered, split and inline responsive layouts.
- ⚡ Real power, current, voltage and session energy.
- ☀️ Optional energy-flow summary, disabled by default.
- ♿ Keyboard, visible focus and reduced-motion support.

Ultra compact intentionally hides the charger artwork while keeping status, readings and essential controls.

![V2C Trydan Card split layout in dark theme](https://raw.githubusercontent.com/mactron254/v2c-trydan-card/main/docs/screenshots/v042/layout-split-dark.png)

### 🤖 Transparent AI assistance

I conceived, directed and reviewed the project. Codex / OpenAI assisted with development, tests, documentation and reproducible screenshots/GIFs. Product decisions and final acceptance remain human-directed.

### 📦 Installation

[![Open V2C Trydan Card in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=mactron254&repository=v2c-trydan-card&category=plugin)

If needed, add <code>https://github.com/mactron254/v2c-trydan-card</code> as a custom **Dashboard** repository in HACS.

~~~yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garage_v2c_charger_connected
~~~

Optional energy flow:

~~~yaml
show_energy_flow: true
~~~

### 📚 Documentation and support

- Repository: https://github.com/mactron254/v2c-trydan-card
- Configuration: https://github.com/mactron254/v2c-trydan-card/blob/main/docs/CONFIGURATION.md
- Visual guide: https://github.com/mactron254/v2c-trydan-card/blob/main/docs/VISUAL_GUIDE.md
- Issues: https://github.com/mactron254/v2c-trydan-card/issues

The current v0.4.2 card includes the localized LCD, real readings, hidden artwork in ultra compact and safer defaults. The repository documentation includes 33 reproducible, tightly cropped screenshots and four optimized GIFs.

Feedback is welcome, especially from different Trydan firmware versions and entity languages. Please remove private entity IDs, SSIDs and IP addresses before sharing screenshots or YAML.
