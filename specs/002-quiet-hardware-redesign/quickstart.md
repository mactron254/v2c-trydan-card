# Quickstart Validation

1. `corepack pnpm --version` devuelve 11.5.1 o superior.
2. `corepack pnpm test` valida DOM, estados, traducciones y flujos.
3. `corepack pnpm check` valida tipos, pruebas, bundle y smoke.
4. Revisar 280, 320, 359, 360, 519, 520 y 768 px en la demo.
5. Cambiar tema, densidad, idioma, estado y flujo.
6. Probar teclado, zoom 200% y movimiento reducido.

## Resultado 2026-07-13

- pnpm `11.5.1`.
- 37 pruebas superadas.
- Bundle único de aproximadamente 140 kB.
- Capturas revisadas: estándar oscuro, compacto claro y ultracompacto oscuro.
- Sin desbordamiento tras apilar controles por debajo de 520 px.
