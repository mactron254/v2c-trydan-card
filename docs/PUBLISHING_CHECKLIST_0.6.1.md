# v0.6.1 publishing checklist

## Integración y versiones

- [x] Rama `release/v0.6.1` creada sobre `main` actualizado (incluye #54, #55 y #56).
- [x] Versión actualizada a 0.6.1 en `package.json`.
- [x] `CHANGELOG.md` actualizado con la sección 0.6.1.
- [x] `docs/RELEASE_NOTES_0.6.1.md` redactado en inglés.
- [x] `docs/HANDOFF.md` y `llms.txt` registran v0.6.1 como versión estable.
- [x] `release.yml` apunta al tag exacto `v0.6.1` y a sus notas.

## Validación

- [x] `pnpm check` en verde: typecheck, 123 tests, docs, build, checksum y smoke.
- [x] `pnpm audit --audit-level moderate` y `pnpm audit --prod` sin vulnerabilidades.
- [x] `src/` sin cambios respecto a v0.6.0; diferencias del bundle revisadas y documentadas en las notas.

## Publicación

- [ ] Pull request de release fusionado en `main`.
- [ ] Tag `v0.6.1` creado sobre el merge y enviado a origin.
- [ ] Workflow de release ejecutado con éxito y assets publicados (latest).
