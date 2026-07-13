# Data Model: V2C Trydan Charger Card

## CardConfig

| Field | Type | Rules |
|---|---|---|
| `type` | literal | `custom:v2c-trydan-card` |
| `entity` | entity id | Required seed entity |
| `name` / `location` | string | Optional display text |
| `language` | `es` / `en` | Defaults to Home Assistant language |
| `status_entity` | entity id | Optional normalized override |
| `entities` | role map | Manual values override discovery |
| `show_*` | boolean | Optional section visibility |
| `confirm_lock` | boolean | Default `true` |
| `current_presets` | integer[] | Unique, sorted and clamped |
| `flow_threshold_w` | number | Default 50 W |
| `invert_*_power` | boolean | External sign adaptation |

## EntityRole

`connected`, `charging`, `ready`, `charge_power`, `charge_energy`, `charge_time`,
`house_power`, `fv_power`, `battery_power`, `grid_power`, `voltage`, `intensity`,
`min_intensity`, `max_intensity`, `meter_error`, `paused`, `locked`, `timer`,
`dynamic`, `pause_dynamic`, `logo_led`, `light_led`, `charge_mode`.

Each role stores entity id, discovery confidence and manual-override flag.

## ChargerSnapshot

Binary evidence is `true|false|unknown`. Independent axes:

- **Phase**: `unavailable|disconnected|connected|charging|complete`.
- **Inhibitors**: set of `paused|locked|timer|waiting_power`.
- **Connectivity**: `normal|wifi_connecting|wifi_connected|degraded`.
- **Fault**: `none|control_pilot|load_balancing|meter|generic`.
- **Maintenance**: `normal|updating`.

A positive central signal is never hidden by an unavailable seed.

## VisualState

Closed keys: `disconnected`, `charging`, `complete`, `timer`, `updating`,
`control_pilot`, `load_balancing`, `error`, `waiting_power`, `wifi_connected`,
`wifi_connecting`.

Fields: key, severity, localized label/detail, asset id, secondary badges and rail flag.
Paused/locked/timer badges can coexist with a stronger phase.

## EnergyFlow

Fields: role, raw value/unit, normalized watts, display value, direction
(`import|export|charge|discharge|consume|produce|idle|unknown`), direction label
and availability. Unknown/unavailable never becomes zero.

Defaults: grid positive imports; battery positive discharges; solar positive produces;
home positive consumes. `invert_*` reverses external conventions.

## PendingAction

Fields: role, requested value, timestamp, expected state and status
(`pending|confirmed|failed|timed_out`). One pending action per role. HA confirms completion.
