# Implementation Plan: Personalización, densidad e idiomas

**Branch**: `codex/personalization-i18n-density` | **Date**: 2026-07-13 | **Spec**: [spec.md](spec.md)

## Summary

Extender custom card Lit sin dependencias: contrato único de configuración, cuatro densidades, layouts responsivos, diez idiomas, editor completo y discovery seguro.

## Technical Context

- TypeScript estricto, Lit 3, Vite 8, Vitest 4, pnpm 11.5.1.
- Home Assistant Lovelace; YAML es persistencia. Sin red, telemetría ni assets remotos.
- Bundle único HACS; anchos 280–768 px; teclado, foco y movimiento reducido.

## Constitution Check

Home Assistant nativo, controles explícitos, pruebas automatizadas, SVG local y memoria durable. Cualquier entidad inválida permanece sin control.

## Design

1. `config.ts` normaliza todas opciones y completa `section_order`.
2. `v2c-trydan-card.ts` renderiza `hero`, `metrics`, `controls`, `energy`, `advanced` en orden YAML.
3. `discovery.ts` valida override/dominio/mismo dispositivo y devuelve estado de resolución.
4. `localization/` mantiene diccionario tipado completo y formatos BCP47.
5. Editor emite sólo overrides manuales y muestra estado por rol.
6. Vitest cubre normalización, orden, discovery, idiomas y controles; build/smoke validan bundle.

## Structure

```text
src/{config,models,localization,services,card,editor}/
tests/
docs/
specs/004-personalization-i18n-density/
```

## Delivery

Actualizar README/configuración/migración, FAILURES y HANDOFF. Ejecutar `corepack pnpm@11.5.1 typecheck`, `test`, `build`, `smoke`.
