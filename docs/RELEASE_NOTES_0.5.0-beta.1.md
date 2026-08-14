# V2C Trydan Card 0.5.0-beta.1

Estado: prerelease de prueba para Home Assistant 2026.7.

## Cambios

- Resolver puro de entidades: sin callWS, sin cache de metadatos y sin escaneo global.
- Descubrimiento limitado al device_id V2C elegido; prioriza translation_key y solo usa sufijos legacy dentro del mismo dispositivo.
- Las lecturas proceden de hass.states; el render observa solo IDs resueltos.
- Las acciones revalidan dominio, plataforma, dispositivo y estado disponible antes del servicio.
- Las fuentes externas solo se aceptan como override explicito de sensor de potencia.
- Editor con estado de resolucion, sugerencia exclusiva V2C y ancho completo en el grid.
- SVG locales incluidos en el bundle, sin cargas externas.

## Riesgo beta

Instala primero en un dashboard de prueba. Verifica cada entidad detectada en el editor, sobre todo con varios cargadores. No se ejecutara una accion si el objetivo no coincide con el dispositivo V2C actual.

## Verificado

- corepack pnpm typecheck
- corepack pnpm test — 59 pruebas
