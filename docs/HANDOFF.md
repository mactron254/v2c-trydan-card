# Continuación de proyecto

## Estado actual

- Versión `0.4.1` preparada en `codex/personalization-i18n-density`.
- Lit 3, TypeScript 7, Vite 8 y pnpm 11.5.1.
- Atribución: Codex primero; Marco `@mactron254` después.

## Entregado

- Editor visual completo y traducido en diez idiomas.
- XXL 320–430 px; estándar 260–340 px; compacto y ultra conservan límites seguros.
- Layouts reales mediante separación de arte y estado.
- Paleta + HEX, sliders, chips, orden visual y presets editables.
- Estado principal acercado al cargador.
- Guía visual y 14 capturas reproducibles mediante `docs:capture`.

## Verificación

```powershell
corepack pnpm@11.5.1 check
corepack pnpm@11.5.1 docs:capture
```

Resultado actual: typecheck, 54 pruebas, build, smoke y 14 capturas correctos.

## Siguiente sesión

1. Probar bundle v0.4.1 en Home Assistant real.
2. Registrar incidencias en `docs/FAILURES.md`.
3. Mantener compatibilidad YAML 0.4.x.
