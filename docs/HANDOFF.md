# Continuación de proyecto

## Estado actual

- Versión de trabajo `0.4.0` en rama `codex/personalization-i18n-density`.
- Lit 3, TypeScript 7, Vite 8 y pnpm 11.5.1.
- Bundle HACS único: `dist/v2c-trydan-card.js`.
- Atribución: Codex primero; Marco `@mactron254` después.

## Entregado

- Cuatro densidades, layouts, paletas, superficies, radio, escala y visibilidad configurable.
- `section_order`, métricas y fuentes energéticas renderizan en orden real sin wrappers vacíos.
- Diez catálogos completos tipados; `language: auto` resuelve BCP47 y locale de Home Assistant.
- Editor agrupado: General, Apariencia, Contenido y orden, Entidades y Avanzado.
- 26 roles con estados `automatic`, `manual`, `ambiguous`, `invalid` y `missing`.
- Discovery por dominio y dispositivo; ningún servicio usa entidad no resuelta.

## Verificación

```powershell
corepack pnpm@11.5.1 check
```

Resultado actual: typecheck, 50 pruebas, build y smoke correctos.

## Siguiente sesión

1. Validar card con un Trydan real y un dashboard de Home Assistant.
2. Registrar cualquier fallo real en `docs/FAILURES.md`.
3. Crear release 0.4.0 cuando Marco lo valide.
