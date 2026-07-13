# Public Configuration Contract

## Minimal YAML

```yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garaje_v2c_cargador_conectado
```

## Complete Example

```yaml
type: custom:v2c-trydan-card
entity: binary_sensor.garaje_v2c_cargador_conectado
name: Trydan
location: Garaje
language: es
status_entity: sensor.trydan_estado_visual
show_energy_flow: true
show_controls: true
show_advanced: true
show_charger: true
confirm_lock: true
flow_threshold_w: 50
invert_grid_power: false
invert_battery_power: false
invert_solar_power: false
current_presets: [6, 10, 16, 20, 25, 32]
entities:
  grid_power: sensor.v2c_trydan_grid_power
  fv_power: sensor.v2c_trydan_sun_power
  battery_power: sensor.v2c_trydan_battery_power
  voltage: sensor.v2c_trydan_voltage
```

## External status

Valid: `disconnected`, `charging`, `complete`, `timer`, `updating`, `control_pilot`,
`load_balancing`, `error`, `waiting_power`, `wifi_connected`, `wifi_connecting`.
Unknown values fall back to inference.

## Energy normalization

- Honor `W` or `kW`; normalize internally to watts.
- Defaults: grid positive=import, battery positive=discharge, solar positive=production,
  home positive=consumption.
- `invert_grid_power`, `invert_battery_power`, `invert_solar_power` adapt external sensors.
- Below `flow_threshold_w` renders `En reposo`; unknown never equals zero.
- Never invent missing flow using arithmetic balance.

## Service contract

| Role | Service | Payload |
|---|---|---|
| intensity | `number.set_value` | `{entity_id, value}` |
| switches | `switch.turn_on/off` | `{entity_id}` |
| charge_mode | `select.select_option` | `{entity_id, option}` |
| LEDs | `light.turn_on/off` | `{entity_id, brightness?}` |

## Accessibility contract

- SVG decorative (`aria-hidden`); visible live status is authoritative.
- Energy node shows source, value, unit and direction; accessible name repeats them.
- Rail keeps static arrowheads without animation; motion only reinforces.
- Native `button`, labeled `input[type=range]` and `details/summary`.
- Pending uses `aria-busy`; outcome announced through `aria-live=polite`.
- Native confirmation provides cancel/Escape/focus return for EVSE lock.
- Focus target contrast >=3:1; normal text target WCAG AA 4.5:1.

No private V2C endpoint or remote service.
