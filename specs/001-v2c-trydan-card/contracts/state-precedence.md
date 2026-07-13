# Layered State Resolution Contract

## 1. Normalize evidence

Every binary state is `true|false|unknown`. Numeric unknown/unavailable/non-numeric stays
unknown. `charging=true` remains evidence even when seed is unavailable.

## 2. Resolve independent axes

| Axis | Evidence | Result |
|---|---|---|
| phase | charging=true | charging |
| phase | charging!=true and ready=true | complete |
| phase | connected=true | connected |
| phase | connected=false and other core known | disconnected |
| phase | all core unknown | unavailable |
| inhibitor | paused/locked/timer=true | matching badges |
| connectivity | valid external state | wifi states |
| maintenance | valid external state | updating |
| fault | valid external state | explicit fault |
| fault | dynamic=true + non-benign meter error | meter |

Meter error with dynamic=false is secondary diagnostic. With dynamic=true,
`waiting_wifi` sets wifi_connecting; `waiting_communication` and other non-benign values
set meter fault. Generic meter error never maps to Local Load Balancing artwork.

## 3. Select one of exactly 11 SVGs

| Priority | Evidence | SVG | Primary text |
|---:|---|---|---|
| 1 | valid explicit status | explicit | explicit localized state |
| 2 | fault=control_pilot | control_pilot | Error Control Pilot |
| 3 | fault=load_balancing | load_balancing | Error Load Balancing |
| 4 | fault=meter/generic | error | Error de medición/cargador |
| 5 | maintenance=updating | updating | Actualizando |
| 6 | phase=charging | charging | Cargando |
| 7 | phase=complete | complete | Carga completa |
| 8 | timer inhibitor, not charging/complete | timer | Carga programada |
| 9 | connectivity=wifi_connecting | wifi_connecting | Conectando Wi-Fi |
| 10 | connectivity=wifi_connected | wifi_connected | Wi-Fi conectado |
| 11 | phase=connected | waiting_power | Vehículo conectado |
| 12 | unavailable/disconnected | disconnected | No disponible/Sin vehículo |

Paused and locked remain visible badges. Without stronger phase, paused uses
waiting_power artwork and locked uses disconnected artwork.

## Contradictions

- charging=true + connected=false/unknown => charging.
- charging=true + ready=true => charging.
- complete + paused/timer => complete plus badges.
- connected + locked + 0 W => waiting_power plus `Bloqueado` detail.
- power unknown never proves waiting for power; connected wording avoids claiming cause.
- `flow_threshold_w` affects rail animation only, never charging truth.
