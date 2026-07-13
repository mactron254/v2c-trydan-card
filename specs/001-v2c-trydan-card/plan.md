# Implementation Plan: V2C Trydan Charger Card

**Branch**: `001-v2c-trydan-card` | **Date**: 2026-07-13 | **Spec**: [spec.md](spec.md)

**Input**: Feature specification from `specs/001-v2c-trydan-card/spec.md`

## Summary

Card Lovelace autocontenida para V2C Trydan. Una entidad semilla descubre el dispositivo;
un modelo puro separa fase, inhibidores, conectividad y fallos antes de elegir uno de 11
SVG. Lit renderiza resumen, rail energético accesible, controles diarios y ajustes.

## Technical Context

**Language/Version**: TypeScript 7.0.2 estricto; JavaScript ES2022 de salida

**Primary Dependencies**: Lit 3.3.3, Vite 8.1.4, Vitest 4.1.10 y jsdom 29.1.1; sin dependencias runtime remotas

**Storage**: N/A; configuración persistida por Lovelace/Home Assistant

**Testing**: Vitest para ejes, contradicciones, normalización, servicios, a11y DOM y smoke

**Target Platform**: Home Assistant moderno en navegadores evergreen; HACS Dashboard

**Project Type**: Librería web component / custom Lovelace card

**Performance Goals**: Render menor de 100 ms; una llamada por acción; bundle menor de 300 kB

**Constraints**: pnpm 11.5.1; módulo único; 280–800 px; claro/oscuro; sin telemetría

**Scale/Scope**: Una card, editor visual, 11 assets, 25 roles, ES/EN y demo local

## Constitution Check

*GATE: Passed before Phase 0 and re-checked after Council revision.*

- [x] Home Assistant native: `hass`, servicios estándar, tema y recursos locales.
- [x] Safe controls: destino explícito, bloqueo confirmado y pending idempotente.
- [x] Testable state model: ejes puros, tabla cerrada, unidades/signos y payloads probables.
- [x] V2C identity/accessibility: SVG auténticos, texto, teclado, foco y reduced motion.
- [x] Durable memory: estructura, `docs/FAILURES.md` y `docs/HANDOFF.md`.
- [x] Toolchain: pnpm >=11, TypeScript estricto y bundle HACS autocontenido.

## Design Direction

**Subject**: propietario residencial Trydan que necesita comprender y actuar en segundos.

**Single job**: convertir estado eléctrico complejo en lectura inmediata y control seguro.

**Palette**: Carbono `#111315`, Grafito `#1C1F22`, Niebla `#F3F5F6`,
V2C naranja `#FF8001`, Azul carga `#2478FF`, Rojo alerta `#E84A5F`.

**Typography**: familia del tema Home Assistant; `ui-monospace` para datos eléctricos.

**Layout**: cabecera compacta; hero dato+Trydan; rail con nodos/flechas/dirección textual;
controles diarios visibles; ajustes nativos plegados. En 280 px apila sin reducir targets.

```text
┌ V2C / TRYDAN ───────────── [Cargando] ┐
│  4,2 kW               ╭────────────╮  │
│  8,6 kWh · 01:34      │  TRYDAN    │  │
│  ☀ Produce 2,8 ───→ ⌂ Consume 0,4 │  │
│  Red Importa 0,3 ───→ ⚡ Carga 4,2 │  │
│ [Pausar] [18 A ━━━━━━━━━━━━━━━━━]     │
│  Ajustes avanzados                 ⌄  │
└───────────────────────────────────────┘
```

**Signature**: rail naranja cruza base del Trydan; flechas y palabras conservan sentido
estático. Pulso solo refuerza flujo real y se detiene con movimiento reducido.

**Self-critique**: sin tarjetas por métrica ni gradientes decorativos. Rail cumple función.

## Council Gate

Council inicial: `FAIL` (2/3 jueces; uno timeout). Correcciones aplicadas antes de código:

- Modelo plano reemplazado por ejes independientes y tabla exhaustiva de 11 SVG.
- Error genérico de medidor ya no se confunde con Local Load Balancing.
- Unidades/signos se normalizan por rol y pueden invertirse por configuración.
- Rail mantiene nodos, flechas y dirección textual sin movimiento.
- Contrato accesible define controles nativos, `aria-busy`, `aria-live` y foco.

## Project Structure

```text
src/
├── assets/trydan/
├── card/
├── editor/
├── localization/
├── models/
├── services/
├── config.ts
└── index.ts
tests/
├── state.test.ts
├── discovery.test.ts
├── energy.test.ts
├── services.test.ts
└── card.test.ts
demo/
├── index.html
└── mock-hass.ts
docs/
├── CONFIGURATION.md
├── FAILURES.md
└── HANDOFF.md
```

**Structure Decision**: proyecto único. Dominio puro separado de Lit; assets junto a fuente.

## Phase 0: Research

Decisiones: [research.md](research.md).

## Phase 1: Design & Contracts

- Modelo: [data-model.md](data-model.md)
- Configuración/servicios/a11y: [contracts/configuration.md](contracts/configuration.md)
- Estado por capas: [contracts/state-precedence.md](contracts/state-precedence.md)
- Validación: [quickstart.md](quickstart.md)

## Complexity Tracking

Sin violaciones. Un paquete y un componente distribuible.
