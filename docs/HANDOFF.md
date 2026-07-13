# Continuación de proyecto

## Estado actual

- Versión `0.3.0` Quiet Hardware lista para GitHub/HACS.
- Rama: `codex/quiet-hardware-redesign`.
- Lit 3, TypeScript 7 estricto, Vite 8 y pnpm 11.5.1.
- SVG Trydan protagonista; estado grande debajo y sin línea naranja.
- Tema automático, claro y oscuro con controles monocromos.
- Densidades `standard`, `compact`, `ultra_compact`; SVG visible en todas.
- Resumen energético inteligente: activo, cero, parcial y sin datos.
- 10 idiomas y editor GUI; YAML compatible con 0.2.0.
- Bundle HACS único en `dist/v2c-trydan-card.js`.

## Decisiones clave

- Identidad Quiet Hardware: superficie neutra, espacio negativo y LED SVG como color ordinario.
- Un solo título; SVG → estado → métricas → controles → energía → ajustes.
- Potencia, energía y tiempo quedan en portada; tensión y diagnóstico pasan a ajustes.
- Estándar usa dos columnas desde 520 px. Compacto y ultra apilan controles para evitar overflow.
- Ultra conserva SVG, estado, potencia, intensidad, pausa y resumen textual.
- El flujo oculta nodos inactivos y nunca interpreta `unknown` como cero.
- Atribución: Codex primero, Marco después.

## Verificación

```powershell
corepack pnpm install --frozen-lockfile
corepack pnpm check
corepack pnpm demo
```

Capturas verificadas en `docs/screenshots/` para estándar oscuro, compacto claro y ultra oscuro.

## Continuación

1. Revisar PR y GitHub Actions.
2. Instalar release `0.3.0` desde HACS.
3. Validar discovery y servicios con Trydan real.
4. Registrar cualquier fallo real en `docs/FAILURES.md` antes de corregirlo.
