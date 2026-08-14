# 005 — Resolución resiliente de entidades

## Objetivo

Resolver entidades de una card V2C por dispositivo, con lectura en vivo eficiente y acciones seguras para Home Assistant 2026.7.

## Requisitos

- La semilla debe pertenecer a plataforma V2C y tener device_id.
- Descubrimiento automático solo en el mismo device_id; translation_key antes que sufijos legacy.
- Nunca hacer escaneo global ni consultas WebSocket desde la card.
- Leer estados desde hass.states y validar acciones antes de llamar al servicio.
- Aceptar energía externa únicamente mediante override explícito y compatible.
- Mantener SVG en local y bundle sin dependencias runtime nuevas.
