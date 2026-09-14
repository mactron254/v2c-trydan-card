# v0.6.0 publishing checklist

## Integración y versiones

- [x] Rama release/v0.6.0 creada sobre el main actualizado con la beta estabilizada.
- [x] Versión actualizada a 0.6.0 en package.json.
- [x] CHANGELOG.md actualizado con la sección de lanzamiento estable 0.6.0.
- [x] docs/HANDOFF.md y llms.txt actualizados registrando v0.6.0 como versión estable activa.

## Validación de calidad y compilación

- [x] TypeScript strict typecheck pasa sin errores (tsc --noEmit).
- [x] 123 tests unitarios y de integración de Vitest pasan en verde.
- [x] Verificación de integridad de documentación y capturas de pantalla (check-docs.mjs).
- [x] Generación del bundle de producción con Vite (dist/v2c-trydan-card.js).
- [x] Generación y verificación del hash SHA-256.
- [x] Prueba smoke de tamaño y ausencia de URLs remotas (smoke.mjs).

## Publicación y HACS

- [ ] Pull Request de lanzamiento fusionado en main.
- [ ] Tag git v0.6.0 creado y enviado a origin.
- [ ] Workflow de release ejecutado con éxito subiendo assets oficiales a GitHub Releases (latest: true).
- [ ] Borrador huérfano v6.0.0 eliminado en GitHub Releases.
- [ ] Registro oficial solicitado en hacs/default bajo categoría plugins.
