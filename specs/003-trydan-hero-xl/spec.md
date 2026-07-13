# Feature Specification: Trydan Hero XL

**Branch**: `codex/enlarge-trydan-hero`
**Status**: Ready

## User Scenarios & Testing

### User Story 1 - Leer el cargador como elemento principal (P1)

El usuario ve el SVG Trydan centrado, grande y legible antes del estado, las métricas y los controles.

**Independent Test**: En estándar, compacto y ultracompacto, el DOM mantiene SVG → estado → métricas → controles y el cargador no desborda a 280 px.

### User Story 2 - Conservar contexto en cualquier densidad (P2)

El usuario conserva el mismo orden de lectura y puede usar los controles desde móvil, tablet o escritorio.

**Independent Test**: A 280, 320, 359, 520 y 768 px no hay scroll horizontal, incluso con textos largos, zoom 200 % y los 10 idiomas.

### User Story 3 - Ocultar el hero explícitamente (P3)

El usuario que configura `show_charger: false` no recibe un hueco visual reservado para el SVG.

**Independent Test**: La etapa del cargador no existe en el DOM y el estado continúa siendo la fuente accesible de verdad.

## Requirements

- **FR-001**: Recortar el lienzo de los 11 SVG a `viewBox="24 0 312 480"` sin alterar cuerpo, sombra, logo, LCD o LED.
- **FR-002**: Centrar el hero en las tres densidades; no usar composición lateral desde 520 px.
- **FR-003**: Limitar el SVG con `width: min(100%, clamp(...))`: 260–360 px estándar, 210–280 px compacto y 170–220 px ultracompacto.
- **FR-004**: El estado estándar usa 2–2.5 rem, admite varias líneas y aparece inmediatamente después del SVG.
- **FR-005**: Mantener métricas, intensidad, pausa, flujo y ajustes en ese orden.
- **FR-006**: `show_charger: false` elimina la etapa y su espacio reservado.
- **FR-007**: `getCardSize()` devuelve 8, 6 y 4 para estándar, compacto y ultracompacto.
- **FR-008**: YAML, GUI, temas, idiomas, entidades y servicios permanecen compatibles.

## Success Criteria

- **SC-001**: Los 11 SVG superan inspección automática del nuevo `viewBox` y no contienen el anterior.
- **SC-002**: El hero permanece completo y sin overflow a 280, 320, 359, 520 y 768 px.
- **SC-003**: Estándar oscuro, compacto claro, ultra oscuro y tablet tienen capturas verificadas.
- **SC-004**: Los 10 idiomas, teclado, foco, orden de lectura, movimiento reducido y zoom 200 % permanecen utilizables.
- **SC-005**: Typecheck, 37+ pruebas, build y smoke pasan con pnpm 11.5.1.

## Assumptions

- Se prioriza la legibilidad del logo y LCD frente a reducir la altura.
- No se agregan opciones, dependencias, fuentes ni recursos remotos.
- Los SVG continúan siendo decorativos; el estado textual es la fuente accesible.
