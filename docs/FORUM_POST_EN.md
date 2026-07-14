# Forum draft — English

## Suggested title

**V2C Trydan Card — visual editor, localized charger LCD and responsive EV dashboard**

## Category and tags

Share your Projects! → Dashboards & Frontend
Tags: `lovelace`, `cards`, `hacs`, `ev-charging`, `v2c`

## Post body

Hi Home Assistant community,

I am sharing **V2C Trydan Card**, a custom Lovelace card for monitoring and controlling V2C Trydan EV chargers. It uses the entities exposed in Home Assistant and can discover most of them from the V2C device registry.

This is an independent community project and is not affiliated with or endorsed by V2C.

![V2C Trydan Card animated tour](https://raw.githubusercontent.com/mactron254/v2c-trydan-card/main/docs/media/trydan-card-tour.gif)

### Main features

- Visual editor translated into 10 languages.
- XXL, standard, compact and ultra compact densities.
- Automatic, centered, split and inline responsive layouts.
- 11 hardware-inspired charger states.
- Localized charger LCD with real power, current, voltage and session energy.
- Current slider/presets, pause, lock, timer, dynamic control and lights.
- Optional solar/grid/home/battery/car energy summary.
- Keyboard support, visible focus and reduced-motion handling.

Ultra compact intentionally removes the charger illustration and keeps state, power and essential controls.

![Split dark layout](https://raw.githubusercontent.com/mactron254/v2c-trydan-card/main/docs/screenshots/v042/layout-split-dark.png)

### Installation

[![Open V2C Trydan Card in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=mactron254&repository=v2c-trydan-card&category=plugin)

If the button does not add it automatically, add this custom Dashboard repository in HACS:

`https://github.com/mactron254/v2c-trydan-card`

Minimal card configuration:

```yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garage_v2c_charger_connected
```

Energy flow is optional and disabled by default:

```yaml
show_energy_flow: true
```

### Documentation and support

- Repository: https://github.com/mactron254/v2c-trydan-card
- Configuration: https://github.com/mactron254/v2c-trydan-card/blob/main/docs/CONFIGURATION.md
- Visual guide: https://github.com/mactron254/v2c-trydan-card/blob/main/docs/VISUAL_GUIDE.md
- Issues: https://github.com/mactron254/v2c-trydan-card/issues

Release `v0.4.2` includes the localized LCD, real readings, hidden artwork in ultra compact, safer defaults, 33 screenshots and two reproducible GIFs.

Feedback is welcome, especially from different Trydan firmware versions and entity languages. Please sanitize entity IDs, SSIDs and IP addresses before posting screenshots or YAML.