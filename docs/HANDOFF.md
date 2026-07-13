# Continuación de proyecto

## Estado actual

- Versión `0.2.0` lista para GitHub/HACS.
- Lit 3, TypeScript 7 estricto, Vite 8 y pnpm 11.5.1.
- Tema automático, claro y oscuro.
- Responsive 280–800+ px: móvil, tablet y escritorio.
- Densidades `standard`, `compact`, `ultra_compact`.
- 10 idiomas y editor GUI para opciones principales.
- Overrides, signos, presets, umbrales y estado externo quedan en YAML.
- Bundle HACS único en `dist/v2c-trydan-card.js`.
- CI GitHub ejecuta `pnpm check`.

## Decisiones clave

- Identidad Carbon Flow: carbono, blanco y naranja V2C `#FF8001`.
- Mismo DOM para tres densidades; CSS container queries evita divergencias.
- Tema `auto` usa variables de Home Assistant y `light-dark()` como fallback del sistema.
- Ultracompacto muestra potencia y controles esenciales; secciones secundarias quedan ocultas.
- Idioma detectado desde locale HA; fallback inglés; noruego acepta `no`, `nb` y `nn`.
- Editor GUI solo para decisiones frecuentes; configuración avanzada continúa en YAML.
- Atribución: Codex primero, Marco después.

## Verificación

```powershell
corepack pnpm install
corepack pnpm check
corepack pnpm demo
```

## Continuación

1. Consultar release y estado de GitHub Actions.
2. Añadir repositorio como Dashboard personalizado en HACS.
3. Probar discovery y servicios contra un Trydan real.
4. Registrar cualquier fallo real en `docs/FAILURES.md` antes de corregirlo.
