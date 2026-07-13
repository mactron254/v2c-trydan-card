# Quickstart Validation

## Prerequisites

- Node.js 20+
- Corepack
- pnpm 11+

## Validate

```powershell
corepack pnpm install
corepack pnpm typecheck
corepack pnpm test
corepack pnpm build
corepack pnpm smoke
```

Expected: all commands exit 0; `dist/v2c-trydan-card.js` exists as one module.

## Demo

```powershell
corepack pnpm demo
```

Validate:

1. Eleven states: artwork and text agree.
2. Reduced motion stops rail/SVG animation; arrows and direction words remain.
3. Light/dark remain readable.
4. Intensity logs one `number.set_value`.
5. Missing optional entities leave no empty gaps.
6. Tab reaches and activates controls.
7. 200% zoom; 280/320/600/800 px; long ES/EN labels do not overlap.

## Home Assistant smoke

Copy dist file to `/config/www/`, register `/local/v2c-trydan-card.js` as module,
then use [minimal YAML](contracts/configuration.md).
