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

- [x] PR #26 fusionado como `330aa59c715486f83297dd38f35d679dc817d910` con Validate, HACS, Security y CodeQL verdes en PR y `main`.
- [x] Cero alertas abiertas: las ocho alertas Dependabot finalmente registradas y las tres CodeQL figuran corregidas.
- [x] PRs #13, #14, #15, #19, #20 y #23 cerrados como sustituidos; #17 cerrado explicando la compatibilidad de jsdom y la corrección de Undici.
- [x] Tag `v0.6.0-beta.1` apunta al merge exacto `330aa59c` en `main`.
- [x] GitHub release marcada como prerelease; `v0.5.0` sigue estable/latest.
- [x] JavaScript, SHA-256 y procedencia descargados; hash verificado: `1f8bad262325fc010dfe38dc93afd1c7e8aef29fe6261f24944fa88d6c98ae42`.
- [x] Instrucciones publicadas en #21; issue mantenido abierto para incidencias.
