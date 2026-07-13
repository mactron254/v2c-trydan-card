# Feature Specification: Personalización, densidad e idiomas

**Branch**: `codex/personalization-i18n-density`
**Created**: 2026-07-13
**Status**: Ready

## User Scenarios & Testing

### User Story 1 - Adaptar densidad y composición (Priority: P1)

Usuario elige una densidad y composición adecuada para espacio disponible, sin perder legibilidad ni controles seguros.

**Why this priority**: Card debe seguir útil desde columna móvil estrecha hasta escritorio.

**Independent Test**: Configurar cuatro densidades y layouts; comprobar orden, altura, foco y ausencia de overflow entre 280 y 768 px.

**Acceptance Scenarios**:

1. **Given** configuración antigua sin densidad, **When** usuario actualiza card, **Then** ve modo estándar equilibrado y puede recuperar Hero previo con `display_mode: xxl`.
2. **Given** modo ultracompacto, **When** card tiene 280–768 px de ancho, **Then** contenido aparece en franja de 260–340 px sin contenedores vacíos.
3. **Given** orden personalizado válido, **When** card renderiza, **Then** orden DOM y visual coincide exactamente con orden configurado.

---

### User Story 2 - Personalizar apariencia y contenido (Priority: P1)

Usuario configura paleta, acento, superficie, escala, radio, secciones y controles desde YAML o editor gráfico.

**Why this priority**: Personalización segura permite integrar card en cualquier dashboard sin CSS ni recursos externos.

**Independent Test**: Aplicar opciones válidas e inválidas; verificar límites, contraste, feedback traducido y misma configuración efectiva en YAML/editor.

**Acceptance Scenarios**:

1. **Given** paleta predefinida o color hexadecimal válido, **When** usuario la selecciona, **Then** controles y superficies usan acento legible sin recolorear LED, error o foco.
2. **Given** valor inválido o fuera de rango, **When** card normaliza configuración, **Then** usa fallback seguro y muestra aviso traducido cuando corresponde.
3. **Given** listas vacías, **When** usuario oculta métricas o energía, **Then** sección y espacio asociado desaparecen.

---

### User Story 3 - Usar card completa en idioma propio (Priority: P1)

Usuario recibe textos visibles, etiquetas de carga, avisos y editor en idioma resuelto, sin claves internas ni inglés accidental.

**Why this priority**: Información de carga y control debe ser inequívoca para diez audiencias soportadas.

**Independent Test**: Renderizar todos idiomas soportados con estados V2C, fallos y opciones de carga; contrastar texto visible y valores enviados.

**Acceptance Scenarios**:

1. **Given** `language: auto`, **When** existe locale Home Assistant, **Then** card selecciona variante de idioma correspondiente antes de navegador e inglés.
2. **Given** modo de carga traducido, **When** usuario lo selecciona, **Then** ve etiqueta local pero servicio recibe valor original V2C.

---

### User Story 4 - Resolver entidades sin configuración frágil (Priority: P2)

Usuario obtiene entidades V2C detectadas automáticamente y puede corregir cada rol mediante override manual explícito.

**Why this priority**: Nombres personalizados y entidades incompletas no deben producir controles inseguros o silenciosamente equivocados.

**Independent Test**: Simular entidades detectadas, ambiguas, deshabilitadas e inválidas de mismo dispositivo; comprobar precedencia y limpieza de override.

**Acceptance Scenarios**:

1. **Given** entidad compatible del mismo dispositivo, **When** no hay override, **Then** selector indica Automática y card la utiliza sin persistirla en YAML.
2. **Given** override inválido o ambiguo, **When** usuario intenta controlar cargador, **Then** selector lo explica y no se llama servicio.
3. **Given** usuario limpia override, **When** existe candidato válido, **Then** autodiscovery vuelve a activarse.

### Edge Cases

- Layout forzado sin ancho suficiente vuelve a composición segura centrada.
- Claves desconocidas o repetidas de `section_order` se eliminan; se añaden secciones omitidas al final.
- Entidades opcionales ausentes, deshabilitadas o no disponibles no reservan espacio ni habilitan control.
- Color custom que no cumple `#RRGGBB` vuelve a monocromo con aviso localizado.
- Lista de métricas o energía vacía no deja wrapper, borde ni live-region vacío.
- `min_intensity` y `max_intensity` se usan sólo si intensidad no aporta límites.

## Requirements

### Functional Requirements

- **FR-001**: Card MUST ofrecer `xxl`, `standard`, `compact` y `ultra_compact`, además de `auto`, `centered`, `split` e `inline`, con fallback por ancho seguro.
- **FR-002**: Card MUST conservar Hero previo en `xxl`; modo estándar será nuevo valor por defecto documentado.
- **FR-003**: Card MUST aplicar alturas objetivo y tamaños de tarjeta definidos: XXL 8, estándar 6, compacto 4 y ultra 3.
- **FR-004**: Card MUST aceptar y normalizar opciones públicas de apariencia, contenido, orden, intensidad y visibilidad descritas en resumen entregado.
- **FR-005**: Card MUST preservar orden indicado de listas y hacer idéntico orden DOM/visual de secciones.
- **FR-006**: Card MUST evitar wrappers, bordes y regiones vivas vacías; controles táctiles y teclado deben seguir accesibles.
- **FR-007**: Card MUST soportar seis paletas, color custom exclusivamente hexadecimal de seis dígitos y foreground negro/blanco según luminancia.
- **FR-008**: Card MUST resolver idioma en orden: explícito, locale HA, idioma HA, navegador e inglés; soportará diez idiomas y formatos regionales especificados.
- **FR-009**: Card MUST traducir textos visibles, diagnósticos, editor, selector, configuración pendiente y modos de carga, manteniendo valores de servicio originales.
- **FR-010**: Editor MUST exponer todas opciones YAML agrupadas en General, Apariencia, Contenido y orden, Entidades y Avanzado.
- **FR-011**: Editor MUST exponer veintiséis roles de entidad y estado Automática, Manual, Ambigua, Inválida o No encontrada por selector.
- **FR-012**: Card MUST aplicar precedencia override manual válido, clave traducida del mismo dispositivo, sufijo del mismo dispositivo y sin resolver.
- **FR-013**: Card MUST impedir llamadas de servicio para override inválido y no guardar autodiscovery en YAML.
- **FR-014**: Distribución MUST seguir siendo módulo local compatible HACS, sin CSS/HTML/SVG remoto ni servicios arbitrarios.
- **FR-015**: Release MUST documentar configuración, migración 0.3.1→0.4.0, fallos y relevo de contexto.

### Key Entities

- **Configuración de presentación**: Preferencias de densidad, layout, apariencia, contenido, orden y visibilidad definidas por usuario.
- **Catálogo de idioma**: Conjunto completo de textos visibles y reglas regionales por idioma soportado.
- **Rol de entidad**: Necesidad funcional de estado, sesión, energía, diagnóstico, control o luz asociable a una entidad Home Assistant.
- **Resolución de entidad**: Resultado temporal de discovery u override, con estado, candidato y razón de invalidez/ambigüedad.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Cuatro densidades permanecen sin overflow en anchos 280, 320, 359, 360, 519, 520 y 768 px; ultra mide 260–340 px.
- **SC-002**: 100% de textos visibles de diez idiomas se localizan, sin fallback accidental, claves internas ni ON/OFF en inglés no solicitado.
- **SC-003**: 26 roles detectan o explican determinísticamente ausencia, ambigüedad o invalidez sin llamada de control insegura.
- **SC-004**: YAML y editor producen misma configuración efectiva para todas opciones públicas.
- **SC-005**: Estados V2C, falta de entidades, listas vacías, temas, zoom 200 %, movimiento reducido, teclado y foco siguen utilizables.
- **SC-006**: Validaciones de tipos, pruebas, compilación y smoke de distribución pasan con pnpm 11.5.1.

## Assumptions

- No hay migración automática segura: configuración antigua sin versión pasa a estándar; usuario elige XXL para conservar Hero previo.
- Acento no altera LED SVG, errores rojos ni foco accesible.
- Configuración heredada válida conserva comportamiento salvo densidad visual predeterminada indicada.
- Integración oficial V2C mantiene diagnóstico, número de tensión y selector de modo compatibles con roles planificados.
