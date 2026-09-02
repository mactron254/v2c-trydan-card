# v0.6.0-beta.1 publishing checklist

## Integración

- [x] PR #24 aprobado y fusionado mediante merge commit, conservando la autoría de Pere.
- [x] PR #25 reducido al cambio catalán, aprobado y fusionado mediante merge commit.
- [x] Rama limpia `codex/v0.6.0-beta.1` creada desde `origin/main` sin tocar el workspace anterior.

## Producto y seguridad

- [x] `language: ca`, `ca-ES`, auto, decimales y erratas cubiertos.
- [x] `charger_art` y `show_connector` conservan defaults compatibles.
- [x] Roles de escritura exactos, duplicados rechazados y revalidación al pulsar.
- [x] `accent_color` restringido a `#RRGGBB` también en el editor.
- [x] Smoke lee un único buffer y CI compara el `dist` regenerado.
- [x] Flujo de release verifica tag/versión y publica JS, SHA-256 y procedencia.

## Dependencias

- [x] pnpm 11.5.1 y un único `pnpm-lock.yaml`.
- [x] Node 20.19.0 y 22.22.2 en CI.
- [x] Vite 8.2.2, Vitest 4.1.11, `@types/node` 26.4.1, PostCSS 8.5.26 y Undici 7.29.0.
- [x] jsdom 29.1.1 conservado para Node 20.

## Validación local

- [x] `corepack pnpm@11.5.1 install --frozen-lockfile`.
- [x] `corepack pnpm@11.5.1 check`: 123 pruebas, documentación, build, checksum y smoke verdes.
- [x] Auditorías completa y de producción sin vulnerabilidades conocidas.
- [x] `git diff --check`.
- [x] `dist` regenerado coincide con el contenido preparado para versionar.

## GitHub y publicación

- [ ] PR de estabilización con Validate, HACS y seguridad verdes.
- [ ] Siete alertas de dependencias desaparecidas y alertas CodeQL resueltas o justificadas.
- [ ] PRs #13, #14, #15, #19, #20 y #23 cerrados como sustituidos; #17 cerrado con explicación de compatibilidad.
- [ ] Tag `v0.6.0-beta.1` apunta al merge exacto en `main`.
- [ ] GitHub release marcada como prerelease; `v0.5.0` sigue estable/latest.
- [ ] Assets publicados descargados y SHA-256 verificado.
- [ ] Instrucciones publicadas en #21; issue mantenido abierto para incidencias.
