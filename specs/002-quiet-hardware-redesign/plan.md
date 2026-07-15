# Implementation Plan: Quiet Hardware Redesign

## Summary

Reordenar la plantilla Lit alrededor del SVG, sustituir Carbon Flow por tokens monocromos, convertir el rail en resumen inteligente y conservar todos los contratos públicos.

## Technical Context

- TypeScript, Lit 3, Vite, Vitest y pnpm 11.5.1.
- Web component único, CSS encapsulado y SVG inline.
- Salida HACS estable: `dist/v2c-trydan-card.js`.

## Design Direction

- Jerarquía: nombre → SVG → estado → tres métricas → intensidad/pausa → flujo → ajustes.
- Light: `#FFFFFF`, `#F4F5F6`, `#17191B`, `#5D636A`, `#D9DCE0`.
- Dark: `#181B1E`, `#202428`, `#F4F5F6`, `#A7ADB4`, `#34393F`.
- Firma: hardware flotante con sombra neutra; LED real como único acento cromático ordinario.
- Responsive: dos columnas estándar desde 520 px; SVG siempre visible en compacto y ultracompacto.

## Constitution Check

- [x] Sin red, telemetría ni recursos remotos.
- [x] Estado comprensible sin color o SVG.
- [x] Contratos YAML y servicios sin roturas.
- [x] Pruebas antes de implementación y documentación durable.
- [x] Autoría Codex y contribución Marc preservadas.
