# Implementation Plan: Trydan Hero XL

## Summary

Convertir el SVG en el centro visual mediante un lienzo recortado y un layout vertical centrado en todas las densidades, conservando los contratos públicos de la versión 0.3.0.

## Technical Context

- TypeScript, Lit 3, Vite, Vitest y pnpm 11.5.1.
- Web component con CSS encapsulado y 11 SVG inline.
- Artefacto HACS único: `dist/v2c-trydan-card.js`.

## Design Direction

- Jerarquía: nombre → SVG XL → estado → potencia/energía/tiempo → intensidad/pausa → flujo → ajustes.
- Hero siempre centrado, con sombra neutral y color reservado al LED real.
- Espaciado más generoso; tamaños fluidos limitados por el ancho real del contenedor.
- Estándar 260–360 px; compacto 210–280 px; ultra 170–220 px.

## Implementation Strategy

1. Fijar contratos Vitest de viewBox, tamaños, DOM y `getCardSize()`.
2. Recortar los 11 SVG sin modificar sus primitivas internas.
3. Eliminar la variante lateral de escritorio y ajustar espaciados/tipografía.
4. Actualizar versión, demo, capturas y documentación.
5. Ejecutar matriz técnica/visual y publicar 0.3.1 tras CI verde.

## Constitution Check

- [x] Sin red, telemetría ni recursos remotos.
- [x] Estado accesible independiente del SVG y del color.
- [x] Sin roturas de YAML, GUI, temas, idiomas o servicios.
- [x] Pruebas de contrato antes de implementación.
- [x] Autoría Codex primero y Marco `@mactron254` después.
