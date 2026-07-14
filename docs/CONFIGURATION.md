# V2C Trydan Card configuration

[Español](CONFIGURATION.es.md) · [Visual guide](VISUAL_GUIDE.md) · [FAQ](FAQ.md)

## General

| Key | Type | Default | Visual editor | Purpose |
|---|---|---:|:---:|---|
| `entity` | entity ID | required | Yes | Seed entity belonging to the V2C device |
| `name` | string | `V2C Trydan` | Yes | Card title |
| `location` | string | empty | Yes | Secondary location label |
| `language` | `auto` or supported code | `auto` | Yes | Card and editor language |
| `theme` | `auto`, `light`, `dark` | `auto` | Yes | Color theme |
| `display_mode` | density | `standard` | Yes | Card density |
| `layout` | layout | `auto` | Yes | Hero arrangement |

Languages: `en`, `it`, `de`, `fr`, `nl`, `sv`, `da`, `no`, `ro`, `es`. Norwegian `nb` and `nn` locales map to `no`.

## Appearance

| Key | Values | Default | Notes |
|---|---|---:|---|
| `color_scheme` | `monochrome`, `v2c_blue`, `teal`, `green`, `violet`, `custom` | `monochrome` | Control accent |
| `accent_color` | `#RRGGBB` | `#0067D9` in editor | Used only with `custom` |
| `surface_style` | `solid`, `tinted`, `transparent` | `solid` | Card surface |
| `hero_scale` | `0.75`–`1.25` | `1` | Charger scale |
| `card_radius` | `0`–`40` | HA theme | Outer radius and clipping |
| `show_header` | boolean | `true` | Title and location |
| `show_badges` | boolean | `true` | Secondary state badges |
| `show_charger` | boolean | `true` | Charger artwork; always hidden in ultra compact |

Densities:

- `xxl`: 320–430 px artwork, largest type and spacing.
- `standard`: 260–340 px artwork and three metrics.
- `compact`: 210–280 px artwork and tighter controls.
- `ultra_compact`: no artwork, power-first metrics and essential controls.

Layouts:

- `centered`: vertical composition.
- `split`: artwork left, status right from 400 px.
- `inline`: reduced horizontal Hero from 400 px.
- `auto`: centered when narrow and split from 520 px.

## Content and order

| Key | Type/default | Purpose |
|---|---|---|
| `metrics` | `power, energy, time` | Visible metric chips and order |
| `energy_sources` | `solar, grid, home, battery, charger` | Sources used by energy flow |
| `section_order` | `hero, metrics, controls, energy, advanced` | Real DOM section order |
| `show_energy_flow` | `false` | Optional energy summary; opt in with `true` |
| `show_controls` | `true` | Current and pause controls |
| `show_advanced` | `true` | Folded Trydan settings |
| `show_presets` | true except ultra | Current preset buttons |
| `advanced_open` | `false` | Start advanced details expanded |
| `intensity_control` | `both` | `slider`, `presets` or `both` |

```yaml
metrics: [power, time]
energy_sources: [solar, grid, charger]
section_order: [hero, metrics, energy, controls, advanced]
show_energy_flow: true
```

## Current and energy options

| Key | Default | Purpose |
|---|---:|---|
| `current_presets` | `[6,10,13,16,20,25,32]` | Positive integer amp shortcuts |
| `flow_threshold_w` | `50` | Values below threshold are idle |
| `invert_grid_power` | `false` | Reverse grid sign |
| `invert_battery_power` | `false` | Reverse battery sign |
| `invert_solar_power` | `false` | Reverse solar sign |
| `confirm_lock` | `true` | Confirm before locking EVSE |
| `status_entity` | empty | Optional entity exposing one visual state |

Power conventions: positive grid = import, positive battery = discharge, positive solar = production and positive home = consumption. `unknown` and `unavailable` stay unknown.

## Entities

Manual overrides win over automatic discovery. Invalid domain/device matches never enable a service. Ambiguous matches are shown instead of guessed.

```yaml
entities:
  connected: binary_sensor.garage_v2c_connected
  charging: binary_sensor.garage_v2c_charging
  ready: binary_sensor.garage_v2c_ready
  charge_power: sensor.garage_v2c_charge_power
  charge_energy: sensor.garage_v2c_charge_energy
  charge_time: sensor.garage_v2c_charge_time
  house_power: sensor.garage_v2c_house_power
  fv_power: sensor.garage_v2c_solar_power
  battery_power: sensor.garage_v2c_battery_power
  grid_power: sensor.garage_v2c_grid_power
  voltage: sensor.garage_v2c_voltage
  intensity: number.garage_v2c_intensity
  paused: switch.garage_v2c_pause
  locked: switch.garage_v2c_lock
  timer: switch.garage_v2c_timer
  dynamic: switch.garage_v2c_dynamic
  pause_dynamic: switch.garage_v2c_pause_dynamic
  logo_led: light.garage_v2c_logo
  light_led: light.garage_v2c_light
  charge_mode: select.garage_v2c_charge_mode
```

Additional diagnostic roles available in the editor: `min_intensity`, `max_intensity`, `meter_error`, `ssid`, `ip_address`, `signal_status`.

## External visual states

`disconnected`, `charging`, `complete`, `timer`, `updating`, `control_pilot`, `load_balancing`, `error`, `waiting_power`, `wifi_connected`, `wifi_connecting`.

The LCD uses the selected language. Charging uses real power/current/voltage; completion uses real session energy. Missing data produces translated fallback copy, never sample readings.

## Complete example

```yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garage_v2c_connected
name: Trydan
location: Garage
language: auto
theme: auto
display_mode: standard
layout: auto
color_scheme: v2c_blue
surface_style: solid
hero_scale: 1
card_radius: 20
metrics: [power, energy, time]
show_energy_flow: true
energy_sources: [solar, grid, home, battery, charger]
intensity_control: both
current_presets: [6, 10, 16, 20, 25, 32]
```

## Migrating to v0.4.2

No public key was removed. Two intentional behavior changes apply:

1. `show_energy_flow` now defaults to `false`; add `true` to retain it.
2. `ultra_compact` always hides artwork, while preserving `show_charger` for other densities.