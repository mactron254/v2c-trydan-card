# Feature Specification: Quiet Hardware Redesign

**Branch**: `codex/quiet-hardware-redesign`
**Status**: Ready

## User Scenarios & Testing

### User Story 1 - Entender Trydan de un vistazo (P1)

El usuario ve primero el cargador y su estado, sin título o estado repetido.

**Independent Test**: En cualquier densidad se ve el SVG seguido por estado textual, potencia y controles esenciales.

### User Story 2 - Consultar energía sin ruido (P2)

El usuario ve únicamente flujos activos y resúmenes claros para cero o falta de datos.

**Independent Test**: Actividad, cero, datos parciales y ausencia total producen resultados distintos y traducidos.

### User Story 3 - Usar cualquier pantalla (P3)

El usuario controla intensidad y pausa desde móvil, tablet o PC con tema claro u oscuro.

**Independent Test**: Entre 280 y 768 px no hay recortes ni scroll horizontal.

## Requirements

- **FR-001**: Mostrar un único nombre, sin eyebrow ni estado duplicado.
- **FR-002**: El SVG debe preceder visualmente al estado y ser visible en las tres densidades.
- **FR-003**: Portada limitada a potencia, energía, tiempo, intensidad, pausa y resumen energético.
- **FR-004**: Eliminar línea, gradientes y acentos naranjas; conservar colores LED SVG.
- **FR-005**: `show_energy_flow` muestra flujos activos o resumen cero, parcial o sin datos.
- **FR-006**: YAML, GUI, 10 idiomas y entidades existentes siguen compatibles.
- **FR-007**: Temas usan variables Home Assistant con fallbacks Quiet Hardware.
- **FR-008**: Controles tienen foco visible, texto y objetivo táctil mínimo de 44 px.

## Success Criteria

- **SC-001**: Estado, potencia y acción principal se identifican en menos de 3 segundos.
- **SC-002**: SVG visible sin solapamiento a 280, 320, 359, 360, 519, 520 y 768 px.
- **SC-003**: Los 10 idiomas no muestran claves internas.
- **SC-004**: Typecheck, pruebas, build y smoke pasan con pnpm 11.5.1.
- **SC-005**: Bundle HACS único menor de 300 kB.

## Assumptions

- Los 11 SVG y colores LED no cambian.
- No se agregan dependencias ni recursos remotos.
- `show_charger: false` sigue siendo la única ocultación explícita.
