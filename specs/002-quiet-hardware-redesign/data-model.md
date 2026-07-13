# Data Model: Quiet Hardware Redesign

## Energy Summary

- `active`: flujos disponibles cuya dirección no es `idle` o `unknown`.
- `available`: sensores con valor numérico válido.
- `unavailable`: sensores `unknown` o `unavailable`.
- `kind`: `active | idle | partial | unavailable`.

## Presentation Density

- `standard`: SVG 180–230 px y tres métricas.
- `compact`: SVG 140–180 px y métricas condensadas.
- `ultra_compact`: SVG 112–140 px, estado, potencia, slider y pausa.
