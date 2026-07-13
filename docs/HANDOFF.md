# Continuación de proyecto

## Estado actual

- Versión `0.3.1` Trydan Hero XL lista en GitHub/HACS.
- Rama estable: `main`.
- Lit 3, TypeScript 7 estricto, Vite 8 y pnpm 11.5.1.
- Los 11 SVG compilados y sus 11 fuentes usan `viewBox="24 0 312 480"`.
- Hero centrado en estándar, compacto y ultracompacto; estado grande inmediatamente debajo.
- Tamaños fluidos: 260–360 px, 210–280 px y 170–220 px, siempre limitados por el ancho disponible.
- Tema automático, claro y oscuro; 10 idiomas; editor GUI y YAML compatibles con 0.3.0.
- Bundle HACS único en `dist/v2c-trydan-card.js`.

## Decisiones clave

- Identidad Quiet Hardware preservada: superficies neutras y color reservado al LED real y errores.
- Un solo flujo vertical: SVG → estado → métricas → controles → energía → ajustes.
- Se elimina el split lateral desde 520 px para priorizar logo y LCD también en tablet/escritorio.
- `show_charger: false` elimina la etapa y su margen de estado; el texto accesible permanece.
- `getCardSize()` estima 8/6/4 filas para estándar/compacto/ultra.
- No hay opciones, entidades, servicios, dependencias o recursos remotos nuevos.
- Atribución: Codex primero, Marco `@mactron254` después.

## Verificación

```powershell
corepack pnpm --version
corepack pnpm install --frozen-lockfile
corepack pnpm check
corepack pnpm demo
```

Capturas verificadas en `docs/screenshots/`: estándar oscuro, compacto claro, ultra oscuro y tablet.

## Continuación

1. Instalar release `0.3.1` desde HACS.
2. Validar discovery, SVG y servicios con un Trydan real.
3. Probar temas personalizados de Home Assistant y textos reales del usuario.
4. Registrar cualquier fallo real en `docs/FAILURES.md` antes de corregirlo.
