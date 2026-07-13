# Release notes — v0.4.0

Fecha: 2026-07-13

## Novedades

- Cuatro densidades: `xxl`, `standard`, `compact` y `ultra_compact`.
- Layout, paleta, acento, superficie, escala, radio, secciones y visibilidad configurables.
- Render real según `section_order`, métricas y fuentes de energía seleccionadas.
- Diez catálogos completos tipados y `language: auto` con variantes BCP47.
- Editor agrupado, 26 roles y estados de resolución por entidad.
- Discovery seguro por dominio y dispositivo; servicios bloqueados para entidades no resueltas.

## Compatibilidad

`standard` es valor por defecto. Usa `display_mode: xxl` para recuperar Hero anterior.

## Verificación

`corepack pnpm@11.5.1 check`: typecheck, 50 pruebas, build y smoke correctos.

## Instalación

Actualiza el recurso HACS o descarga `v2c-trydan-card.js` de esta release y recarga el navegador.
